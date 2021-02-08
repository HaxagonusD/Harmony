const mongoose = require("mongoose");
const NotificationSchema = require("./Schemas/NotificationSchema");

module.exports = NotificationModel = mongoose.model(
  "Notification",
  NotificationSchema
);
