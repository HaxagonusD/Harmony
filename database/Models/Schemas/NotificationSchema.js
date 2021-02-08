const mongoose = require("mongoose");
const { Schema } = mongoose;
const notification = new Schema({
  ownerId: String,
  message: String,
  type: String,
  seen: { type: Boolean, default: false },
});
