const subscribeUsers = require("../../services/SubscribeUsers");
module.exports = (req, res) => {
  // if the user is logged in
  if (req.user) {
    //save the subscriber and the subscriptioner to variables
    const subscriberID = req.user.id;
    const subcriptionerID = req.params.id;

    if (subcriptionerID !== subscriberID) {
      //find the user being subscribed to
      subscribeUsers(subscriberID, subcriptionerID)
        .then((status) => {
          res.json({
            error: false,
            description: "Subscribed successfully",
          });
        })
        .catch((error) => {
          console.error(error);
          res.json({
            error: true,
            errorMessage: error,
            description: "There was an error subscribing the two users",
          });
        });
    } else {
      res.json({
        error: true,
        errorMessage: "",
        description: "Attempt to subscribe to self",
      });
    }
  } else {
    res.json({
      error: true,
      errorMessage: "",
      description: "User on request object is unauthenticated",
      redirect: true,
      redirectLocation: "/",
    });
  }
};
