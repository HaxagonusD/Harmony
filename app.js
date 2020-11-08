require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const cors = require("cors"); // why does this even exist

//mongoose
const mongoose = require("mongoose");
//im not sure im going to use these
const cron = require("node-cron");
const Pusher = require("pusher");

const SpotifyWebApi = require("spotify-web-api-node");
//TODO put this in a database
//How will this work for multiple users?

//bringing in passport and session
const session = require("express-session");

//passprot config
//we make pasport in another file and pass it to an router that needs something from this config

//app initialization
const app = express();
app.locals.passport = require("./authentication/passportConfig");

app.use(morgan("dev"));
//This is bascially our connection to spotify
//I don't really want to make new conections to to spotify every time
// I just want to have one connection and change the access token
app.locals.spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

//middleware
//This is cors because it is dumb but apparently good
const corsOptions = {
  origin: [process.env.CLIENT_URL, "http://localhost:5000"],
  credentials: true,
};
//cors is dumb
app.use(cors(corsOptions));
//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//TODO Learn more about express session
//sesstion
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { path: "/", httpOnly: true, secure: false, maxAge: null },
  })
);
//passport things
app.use(app.locals.passport.initialize());
app.use(app.locals.passport.session());

//API routes
const authRouter = require("./routes/authSpotifyRouters")(app.locals.passport);
const apiRouter = require("./routes/apiSpotifyRouter");
//get permission from spotify and save info to req.user
app.use("/auth/spotify", authRouter);

//get the current track
app.use("/api/spotify", apiRouter);

const pusher = new Pusher({
  appId: "1103871",
  key: "5971b97df17e11f9f985",
  secret: "10824288e74f75589697",
  cluster: "mt1",
  useTLS: true,
});
console.log("cannot be stopped");

setInterval(async () => {
  await pusher
    .trigger("my-channel", "my-event", { message: "Stop" })
    .catch((error) => console.log(error));
  
}, 2000);

//connecting to database
mongoose
  .connect(process.env.MONGODB_ATLAS_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => console.log("Connected to data base"))
  .catch((error) => console.log(error));

//listening at  port
app.set("port", process.env.PORT || 5000);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
