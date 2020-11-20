require("dotenv").config();
const User = require("../../database/Models/UserModel");
const sendMessageUser = require("../TwilioHandlers/sendMessageUser");

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
  // console.log(req.user)

  if (req.user) {
    User.findOne({ id: req.user.id }, (err, user) => {
      if (err) {
        console.log("there was an error getting the user from the database");
        console.error(err);
        res.json({ loggedIn: false });
      }
      if (user) {
        req.app.locals.spotifyApi.setAccessToken(`${user.spotifyAccessToken}`);
        req.app.locals.spotifyApi.getMyCurrentPlayingTrack().then(
          function (data) {
            //TODO add error handling
            // console.log(
            //   "This si the data being sent to the client in getcurrentTRac.js",
            //   req.user
            // );
            //
            // data.body.item !== undefined
            //   ?
            //   : ;
            if (data.body.item !== null && data.body.item !== undefined) {
              data.body.item.loggedIn = true;

              if (data.body.item.id !== user.currentTrack) {
                user.currentTrack = data.body.item.id;
                sendMessageUser(user, user.currentTrack);
                user.save((err) => {
                  if (err) {
                    console.log(err);
                  }
                });
              }
              //304 is happening here
              //some cahing i don't understand yet is happening 
              console.log("The data is the same?");
              res.json(data.body.item);
            } else {
              console.log("Data.body.item is null or undefined");
              res.json({ name: "Not Listening To Anything", loggedIn: true });
            }
          },
          function (err) {
            //TODO add response error handling
            console.log("Error talking to spotify!", err);
          }
        );
      }
      if (!user) {
        console.log("no user was found the in the database");
        res.json({ loggedIn: false });
      }
    });
  } else {
    //connect-mongo to store session data
    res.json({ loggedIn: false });
  }
};
