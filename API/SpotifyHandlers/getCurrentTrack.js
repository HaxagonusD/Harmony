require("dotenv").config();
const User = require("../../database/Models/UserModel");

module.exports = function (req, res, next) {
  // console.log(
  //   "This is the user in req.session in file get current track.js",
  //   req.session
  // );
  // console.log(
  //   "This is the respnse object to see if has the headers",
  //   res.getHeaders()
  // );
  // console.log("this is in getcurrenttrack.js line 13",req.user)
  req.user
    ? User.findOne({ id: req.user.id }, (err, user) => {
        if (err) {
          console.log("there was an error getting the user from the database");
          console.error(err);
          res.json({ loggedIn: false });
        }
        if (user) {
          req.app.locals.spotifyApi.setAccessToken(
            `${user.spotifyAccessToken}`
          );
          req.app.locals.spotifyApi.getMyCurrentPlayingTrack().then(
            function (data) {
              //TODO add error handling
              console.log(
                "This si the data being sent to the client in getcurrentTRac.js",
                req.user
              );
              //
              // data.body.item !== undefined
              //   ?
              //   : ;
              if (data.body.item !== undefined) {
                data.body.item.loggedIn = true;
                res.json(data.body.item);
              } else {
                res.json({ name: "Not Listening To Anything", loggedIn: true });
              }
            },
            function (err) {
              //TODO add response error handling
              console.log("history!", err);
            }
          );
        }
        if (!user) {
          console.log("no user was found the in the database");
          res.json({ loggedIn: false });
        }
      })
    : res.json({ loggedIn: false });
};
