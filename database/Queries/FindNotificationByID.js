const NotificationModel = requre("../Models/NotificationModel");

const FindNotificationByID = (id) => NotificationModel.find({ _id: id }).exec();

module.exports = FindNotificationByID;
