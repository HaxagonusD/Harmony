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
  contactList: [String],
});

module.exports = User;

