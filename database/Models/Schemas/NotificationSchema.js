const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  ownerId: String,
  message: String,
  type: String,
  seen: { type: Boolean, default: false },
});

module.exports = NotificationSchema;
