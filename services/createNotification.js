const Notification = require("../database/Models/NotificationModel");
const FindOneUserByID = require("../database/Queries/FindOneUserByID");
//function to create notifications and add it to user
const createNotifcation = async (ownerId, message, type) => {
  //creating notificaiton
  const notificationDocument = new Notification({
    ownerId,
    message,
    type,
  });

  //save the notification
  const savedNotification = await notificationDocument.save();
  if (savedNotification) {
    //if saving the notifcation was sucessfull add the notification to the user
    const ownerDocument = await FindOneUserByID(ownerId);
    ownerDocument.notifications.push(savedNotification._id);
    const savedOwnerDocument = await ownerDocument.save();
    //return the saved notification or false if there was an error
    return savedOwnerDocument ? savedNotification : false;
  } else {
    //otherwise return false
    return false;
  }
};

module.exports = createNotifcation;
