require("dotenv").config();
const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});
const randomString = require("randomstring");

const authSpotify = (req, res, next) => {
  const scopes = ["user-read-currently-playing", "user-read-playback-state"];
  const state = randomString.generate(16);
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  //   console.log(authorizeURL);
  res.redirect(authorizeURL);
};
module.exports = authSpotify;
