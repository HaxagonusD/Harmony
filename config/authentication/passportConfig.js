require("dotenv").config();
console.log(
  "process.env.SPOTIFY_REDIRECT_URI_DEV-----",
  process.env.SPOTIFY_REDIRECT_URI_DEV
);
console.log(
  "process.env.SPOTIFY_REDIRECT_URI_PROD----",
  process.env.SPOTIFY_REDIRECT_URI_PROD
);
console.log(
  "process.env.SPOTIFY_REDIRECT_URI_PROD----",
  process.env.SPOTIFY_CLIENT_ID
);
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const User = require("../../database/Models/UserModel");
//why am i using the passport library instead of the passport instace i declared in app.js?
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findOne({ id: id }, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "development"
          ? process.env.SPOTIFY_REDIRECT_URI_DEV
          : process.env.SPOTIFY_REDIRECT_URI_PROD,
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      // User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
      //   return done(err, user);
      // });
      console.log("gettting usuer from databse ");
      User.findOne(
        {
          id: profile.id,
        },
        (err, user) => {
          if (err) {
            //if there was an error
            console.error("Error  in finding auser form the dat base", err);
            return done(err); //pass the error to done
          }
          if (!user) {
            //if we didn't find a user make a new one with the info frrom spotify
            // yes we are using the argument that is empty
            // console.log("we are creating a new user")
            User.create(
              {
                displayName: profile.displayName,
                id: profile.id,
                profileUrl: profile.profileUrl,
                provider: profile.provider,
                spotifyAccessToken: accessToken,
                spotifyRefreshToken: refreshToken,
                expiresIn: expires_in,
                // songPosts: [],
              },
              (err, theMadeUser) => {
                if (err)
                  console.log(
                    "There was an error creating the user in the database",
                    err
                  ); //if there was an error saving, console.log the error
                // console.log(`User was created: `, something);
                return done(err, theMadeUser); // return done with the error and new user
              }
            );
          } else {
            //the user was found
            // console.log(`User was found:`, user);
            user.spotifyAccessToken = accessToken;
            user.spotifyRefreshToken = refreshToken;
            user.expiresIn = expires_in;
            user.songPosts = [];
            user.save((err) => {
              if (err)
                console.log(
                  "There was an error saving the usuer in the database",
                  err
                );
              return done(err, user); // return the user
            });
          }
        }
      );
    }
  )
);

module.exports = passport;
