//This file is what updates the current track for every user

const User = require("../../database/Models/UserModel");
const sendMessageUser = require("../TwilioHandlers/sendMessageUser");

//!You repeat yourself a lot in this in this code
//!Turn it into a function

module.exports = async (app) => {
  for await (const user of User.find()) {
    app.locals.spotifyApi.setAccessToken(`${user.spotifyAccessToken}`);
    app.locals.spotifyApi
      .getMyCurrentPlayingTrack()
      .then((data) => {
        if (data.body.item !== null && data.body.item !== undefined) {
          if (data.body.item.id !== user.currentTrack.songId) {
            console.log(data.body.item);
            user.currentTrack.songId = data.body.item.id;
            user.currentTrack.artistName = data.body.item.artists[0].name;
            user.currentTrack.songName = data.body.item.name;
            user.currentTrack.imgLink = data.body.item.album.images[1].url;
            sendMessageUser(user, user.currentTrack);
            user.save((error) => {
              if (error) {
                console.error(error);
              }
            });
          }
        }
      })
      .catch((error) => {
        app.locals.spotifyApi.setRefreshToken(user.spotifyRefreshToken);
        app.locals.spotifyApi
          .refreshAccessToken()
          .then((data) => {
            app.locals.spotifyApi.setAccessToken(data.body["access_token"]);
            user.spotifyAccessToken = data.body["access_token"];
            app.locals.spotifyApi.getMyCurrentPlayingTrack().then((data) => {
              if (data.body.item !== null && data.body.item !== undefined) {
                //*You might need to change schema to provide the client with all this information
                if (data.body.item.id !== user.currentTrack.songId) {
                  console.log(data.body.item);
                  user.currentTrack.songId = data.body.item.id;
                  user.currentTrack.artistName = data.body.item.artists[0].name;
                  user.currentTrack.songName = data.body.item.name;
                  user.currentTrack.imgLink =
                    data.body.item.album.images[1].url;
                  //This is there the twilio magic happens
                  sendMessageUser(user, user.currentTrack);
                  user.save((error) => {
                    if (error) {
                      console.error(error);
                    }
                  });
                }
              }
            });
          })
          .catch((error) => console.error(error));
      });
  }
};
