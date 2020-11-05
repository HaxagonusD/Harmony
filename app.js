require("dotenv").config();

const express = require("express");
const cors = require("cors"); // why does this even exist


//mongoose
const mongoose = require("mongoose");
//im not sure im going to use these 
const cron = require("node-cron");
const Pusher = require("pusher");


//spotify handlers
const authSpotify = require("./API/SpotifyHandlers/authSpotifyApi");
const getAccessToken = require("./API/SpotifyHandlers/getAccessToken");
const getCurrentTrack = require("./API/SpotifyHandlers/getCurrentTrack");

const app = express();
const SpotifyWebApi = require("spotify-web-api-node");
//TODO put this in a database
//How will this work for multiple users?

app.locals.spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//TODO ADD withentication
//API routes
app.get("/login", authSpotify);
app.get("/callback", getAccessToken);
app.get("/history", getCurrentTrack);
//connecting to database
mongoose
  .connect(process.env.MONGODB_ATLAS_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => console.log("Connected to data base"))
  .catch((error) => console.log(error));

app.set("port", process.env.PORT || 5000);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
