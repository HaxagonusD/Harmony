require("dotenv").config();

const express = require("express");
const cors = require("cors"); // why does this even exist

//mongoose
const mongoose = require("mongoose");
//im not sure im going to use these
const cron = require("node-cron");
const Pusher = require("pusher");

//spotify handlers
const authSpotify = require("./API/SpotifyHandlers/authSpotifyApi");
const getAccessToken = require("./API/SpotifyHandlers/getAccessToken");
const getCurrentTrack = require("./API/SpotifyHandlers/getCurrentTrack");

const app = express();
const SpotifyWebApi = require("spotify-web-api-node");
//TODO put this in a database
//How will this work for multiple users?

//bringing in passport and session
const session = require("express-session");
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
//database things
//TODO import this from another file 
const { Schema } = mongoose;

const UserSchema = new Schema({
  displayName: String,
  id: String,
  profileUrl: String,
  provider: String,
  spotifyAccessToken: String,
  spotifyRefreshToken: String,
  expiresIn: String,
});
const User = mongoose.model("User", UserSchema);

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: process.env.SPOTIFY_REDIRECT_URI,
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      // User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
      //   return done(err, user);
      // });
      User.findOne(
        {
          id: profile.id,
        },
        (err, user) => {
          if (err) {
            //if there was an error
            console.error(err);
            return done(err); //pass the error to done
          }
          if (!user) {
            //if we didn't find a user make a new one with the info frrom spotify
            // yes we are using the argument that is empty
            User.create(
              {
                displayName: profile.displayName,
                id: profile.id,
                profileUrl: profile.profileUrl,
                provider: profile.provider,
                spotifyAccessToken: accessToken,
                spotifyRefreshToken: refreshToken,
                expiresIn: expires_in,
              },
              (err, something) => {
                if (err) console.log(err); //if there was an error saving, console.log the error
                console.log(`User was created: `, something);
                return done(err, user); // return done with the error and new user
              }
            );
          } else {
            //the user was found
            console.log(`User was found:`, user);
            return done(err, user); // return the user
          }
        }
      );
    }
  )
);

app.locals.spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

//middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findOne({ id: id }, function (err, user) {
    done(err, user);
  });
});
//TODO ADD withentication
//API routes
app.get(
  "/auth/spotify",
  passport.authenticate("spotify", {
    scope: [
      "user-read-email",
      "user-read-private",
      "user-read-currently-playing",
      "user-read-playback-state",
    ],
    showDialog: true,
  })
);
app.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", {
    failureRedirect: `${process.env.CLIENT_URL}`,
  }),
  (req, res) => {
    //sucessfull
    console.log("In /auth/spotify/callback it was sucessfull");
    res.redirect(`${process.env.CLIENT_URL}/config`);
  }
);
app.get("/auth/spotify/logout", (req, res) => {
  req.logOut();

  res.redirect(`${process.env.CLIENT_URL}`);
});

app.get("/api/spotify/currenttrack", getCurrentTrack);
//connecting to database
mongoose
  .connect(process.env.MONGODB_ATLAS_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => console.log("Connected to data base"))
  .catch((error) => console.log(error));

app.set("port", process.env.PORT || 5000);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
