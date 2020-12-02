//This file is what updates the current track for every user

const User = require("../../database/Models/UserModel");
const sendMessageUser = require("../TwilioHandlers/sendMessageUser");

//!You repeat yourself a lot in this in this code
//!Turn it into a function

module.exports = async (app) => {
  //for every user in the database 
  for await (const user of User.find()) {
    //set the access token from the user 
    app.locals.spotifyApi.setAccessToken(`${user.spotifyAccessToken}`);
    // get the curren track of th user 
    app.locals.spotifyApi
      .getMyCurrentPlayingTrack()
      .then((data) => {
        //if everything is all well and good
        if (data.body.item !== null && data.body.item !== undefined) {
          //if the track is not the same 
          if (data.body.item.id !== user.currentTrack.songId) {
            //update the information for the user 
            console.log(data.body.item);
            user.currentTrack.songId = data.body.item.id;
            user.currentTrack.artistName = data.body.item.artists[0].name;
            user.currentTrack.songName = data.body.item.name;
            user.currentTrack.imgLink = data.body.item.album.images[1].url;
            //Notify who ever is subscribed that the track changed 
            sendMessageUser(user);
            //save the user to the data base
            user.save((error) => {
              if (error) {
                console.error(error);
              }
            });
          }
        }
      })
      .catch((error) => {
        //if there was an error
        // the only error that's being caught right now is the access token needs to be refreshed 
        app.locals.spotifyApi.setRefreshToken(user.spotifyRefreshToken);
        //refresh the access token
        app.locals.spotifyApi
          .refreshAccessToken()
          .then((data) => {
            //set the new acess token for the api
            app.locals.spotifyApi.setAccessToken(data.body["access_token"]);
            //set the new access token for the user 
            user.spotifyAccessToken = data.body["access_token"];
            //ditto 
            //becuase of the repetition there might be a way to turn this into a function 
            app.locals.spotifyApi.getMyCurrentPlayingTrack().then((data) => {
              if (data.body.item !== null && data.body.item !== undefined) {
                
                if (data.body.item.id !== user.currentTrack.songId) {
                  console.log(data.body.item);
                  user.currentTrack.songId = data.body.item.id;
                  user.currentTrack.artistName = data.body.item.artists[0].name;
                  user.currentTrack.songName = data.body.item.name;
                  user.currentTrack.imgLink =
                    data.body.item.album.images[1].url;
                  //This is there the twilio magic happens
                  sendMessageUser(user);
                  user.save((error) => {
                    if (error) {
                      console.error(error);
                    }
                  });
                }
              }
            });
          })
          .catch((error) => console.error(error)); //catch other errors
      });
  }
};
