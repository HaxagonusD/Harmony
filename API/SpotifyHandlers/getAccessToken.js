require("dotenv").config();
const axios = require("axios");
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});
const clientUrl = process.env.CLIENT_URL;



module.exports = function (req, res, next) {
  const { code } = req.query;
  spotifyApi.authorizationCodeGrant(code).then(
    function (data) {
      //     console.log(data.body);
      //   console.log("The token expires in " + data.body["expires_in"]);
      //   console.log("The access token is " + data.body["access_token"]);
      //   console.log("The refresh token is " + data.body["refresh_token"]);
      //   req.app.locals.tokens = data.body;
      req.app.locals.spotifyApi.setAccessToken(data.body["access_token"]);
      req.app.locals.spotifyApi.setRefreshToken(data.body["refresh_token"]);
      res.redirect(`${clientUrl}/?authorized=true`);

      // Set the access token on the API object to use it in later calls
    },
    function (err) {
      console.log("getAcessToken!", err);
    }
  );
};
