//This file is what updates the current track for every user
require("dotenv").config();
const User = require("../database/Models/UserModel");
const sendTwilioSMSToSubscribers = require("../services/sendTwilioSMSToSubscribers");
const SpotifyWebApi = require("spotify-web-api-node");
spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});
//!You repeat yourself a lot in this in this code
//!Turn it into a function

const checkForDiffences = (data, user) => {
  if (data.body.item !== null && data.body.item !== undefined) {
    //if the track is not the same
    if (data.body.item.id !== user.currentTrack.songId) {
      //update the information for the user
      // console.log(data.body.item);
      user.currentTrack.songId = data.body.item.id;
      user.currentTrack.artistName = data.body.item.artists[0].name;
      user.currentTrack.songName = data.body.item.name;
      user.currentTrack.imgLink = data.body.item.album.images.map(
        (imageItem) => {
          return imageItem.url;
        }
      );
      // console.log(user.currentTrack.imgLink)
      // console.log("-----------------",data.body.item.album.images)
      //Notify who ever is subscried that the track changed

      sendTwilioSMSToSubscribers(user);
      //save the user to the data base
      user
        .save()
        .catch((error) =>
          console.error("Error saving user in checkdifferences", error)
        );
    }
  }
};

module.exports = async () => {
  //for every user in the database
  for await (const user of User.find()) {
    //set the access token from the user
    spotifyApi.setAccessToken(`${user.spotifyAccessToken}`);
    // get the curren track of th user
    spotifyApi
      .getMyCurrentPlayingTrack()
      .then((data) => {
        checkForDiffences(data, user);
      })
      .catch((error) => {
        //if there was an error
        // the only error that's being caught right now is the access token needs to be refreshed
        spotifyApi.setRefreshToken(user.spotifyRefreshToken);
        //refresh the access token
        spotifyApi
          .refreshAccessToken()
          .then((data) => {
            //set the new acess token for the api

            //set the new access token for the user
            user.spotifyAccessToken = data.body["access_token"];
            return user.save();
          })
          .then((savedUserWithNewAccessToken) => {
            spotifyApi.setAccessToken(
              `${savedUserWithNewAccessToken.spotifyAccessToken}`
            );
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
              checkForDiffences(data, savedUserWithNewAccessToken);
            });
          })
          .catch((error) => console.error(error)); //catch other errors
      });
  }
};
