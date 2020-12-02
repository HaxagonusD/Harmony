const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = new Schema({
  displayName: String,
  id: String,
  profileUrl: String,
  provider: String,
  spotifyAccessToken: String,
  spotifyRefreshToken: String,
  expiresIn: String,
  phoneNumber: String,
  subscribers: [String],
  subscriptions: [String],
  currentTrack: {
    songId: String,
    songName: String,
    artistName: String,
    imgLink: String,
  },
});

module.exports = User;
