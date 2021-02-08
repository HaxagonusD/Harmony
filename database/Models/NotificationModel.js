const mongoose = require("mongoose");
const NotificationSchema = require("./Schemas/NotificationSchema");

modules.export = NotificationModel = mongoose.model(
  "Notification",
  NotificationSchema
);
