const mongoose = require("mongoose");
//!.count is deprecated. Make your own mongoose-simple-random library
const mongooseRandom = require("mongoose-simple-random");
const { Schema } = mongoose;
const User = new Schema({
  displayName: String,
  id: String,
  profileUrl: String,
  provider: String,
  spotifyAccessToken: String,
  spotifyRefreshToken: String,
  expiresIn: String,
  phoneNumber: { type: String, default: "" },
  subscribers: { type: [String], default: [] },
  subscriptions: { type: [String], default: [] },
  currentTrack: {
    songId: { type: String, default: "No song ID yet " },
    songName: { type: String, default: "No song Name yet" },
    artistName: { type: String, default: "No artist Name yet" },
    imgLink: { type: String, default: "No imgLink yet" },
  },
});
User.plugin(mongooseRandom);

module.exports = User;