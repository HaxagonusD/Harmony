const subscribeUsers = require("../../services/SubscribeUsers");
module.exports = (req, res, next) => {
  // if the user is logged in
  if (req.user) {
    //save the subscriber and the subscriptioner to variables
    const subscriberID = req.user.id;
    const subcriptionerID = req.params.id;

    if (subcriptionerID !== subscriberID) {
      //find the user being subscribed to
      subscribeUsers(subscriberID, subcriptionerID)
        .then((status) => {
          res.json("Subscribed Successfully");
        })
        .catch((error) => {
          console.error(error);
          res.json(null);
        });
    } else {
      res.json(`can't subscribe to self`);
    }
  } else {
    res.json(null);
  }
};
