const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const User = require("../database/Models/UserModel");
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
                subscribers: null,
                subscriptions: null,
                currentTrack: {
                  songId: "No song id right now",
                  songName: "No song name right now",
                  artistName: "No artist right now",
                  imgLink: "No image link right now"
                },
              },
              (err, something) => {
                if (err) console.log(err); //if there was an error saving, console.log the error
                // console.log(`User was created: `, something);
                return done(err, user); // return done with the error and new user
              }
            );
          } else {
            //the user was found
            // console.log(`User was found:`, user);
            user.spotifyAccessToken = accessToken;
            user.spotifyRefreshToken = refreshToken;
            user.expiresIn = expires_in;
            user.save((err) => {
              if (err) console.log(err);
              return done(err, user); // return the user
            });
          }
        }
      );
    }
  )
);

module.exports = passport;
