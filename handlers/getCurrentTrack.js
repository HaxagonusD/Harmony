require("dotenv").config();
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

module.exports = function (req, res, next) {
  spotifyApi.getMyCurrentPlayingTrack().then(
    function (data) {
      res.json(data.body.item.name);
    },
    function (err) {
      console.log("getcurrentTRack!", err);
    }
  );
};
