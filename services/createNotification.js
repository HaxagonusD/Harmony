const Notification = require("../database/Models/NotificationModel");
const FindOneUserByID = require("../database/Queries/FindOneUserByID");
const createNotifcation = async (ownerId, message, type) => {
  const notificationDocument = new Notification({
    ownerId,
    message,
    type,
  });
  const savedNotification = await notificationDocument.save();
  if (savedNotification) {
    const ownerDocument = await FindOneUserByID(ownerId);
    ownerDocument.notifications.push(savedNotification);
    const savedOwnerDocument = await ownerDocument.save();
    return savedOwnerDocument;
  } else {
    return false;
  }
};

module.exports = createNotifcation;
