const mongoose = require("mongoose");
//!.count is deprecated. Make your own mongoose-simple-random library
const mongooseRandom = require('mongoose-simple-random')
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
User.plugin(mongooseRandom);

module.exports = User;
