require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Datastore = require("nedb");
const cron = require("node-cron");
const Pusher = require("pusher");
//spotify handlers

const authSpotify = require("./handlers/authSpotifyApi");
const getAccessToken = require("./handlers/getAccessToken");
const getCurrentTrack = require("./handlers/getCurrentTrack");

const app = express();
const SpotifyWebApi = require("spotify-web-api-node");
app.locals.spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});
const db = new Datastore();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/login", authSpotify);
app.get("/callback", getAccessToken);
app.get("/history", function (req, res, next) {
  app.locals.spotifyApi.getMyCurrentPlayingTrack().then(
    function (data) {
     res.json(data.body.item.name)
    },
    function (err) {
      console.log("history!", err);
    }
  );
});
app.set("port", process.env.PORT || 5000);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
