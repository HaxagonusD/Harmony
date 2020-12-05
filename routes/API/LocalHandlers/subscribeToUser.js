const User = require("../../../database/Models/UserModel");

module.exports = (req, res, next) => {
  // if the user is logged in
  if (req.user) {
    //save the subscriber and the subscriptioner to variables
    const subscriberID = req.user.id;
    const subcriptionerID = req.params.id;

    if (subcriptionerID !== subscriberID) {
      //find the user being subscribed to
      User.findOne({ id: subcriptionerID }, (error, subscriptioner) => {
        if (error) {
          // if there was an error finding the suer in the database
          console.log(
            "There was an error finding that subscriptioner in the database in SubscriberToUser.js"
          );
          console.error(error);
          throw new Error(error);
        }
        //if there is no subscriotioner
        if (!subscriptioner) {
          console.log("There was no user in the database");
          res.status(500);
          res.json("There was no subscriptioner in the database");
        }
        //if there is a subscriptioner add the subscriber to the subscribers list
        if (subscriptioner) {
          if (subscriptioner.subscribers) {
            const whereIsSubscriber = subscriptioner.subscribers.indexOf(
              subscriberID
            );

            whereIsSubscriber === -1
              ? subscriptioner.subscribers.push(subscriberID) //can't be found
              : subscriptioner.subscribers.splice(whereIsSubscriber, 1);
          }
          //save this new info to the databse
          subscriptioner.save((error) => {
            console.log(error);
          });
        }
      });
      //find the user that is subscribing
      User.findOne({ id: subscriberID }, (error, subscriber) => {
        // if there was an error finding the subscriber in the database
        if (error) {
          console.log(
            "There was an error finding that subscriber in the database in SubscriberToUser.js"
          );
          console.error(error);
          throw new Error(error);
        }
        //if there was no subscirber in the databse
        if (!subscriber) {
          console.log("There was no user in the database");
          res.status(500);
          res.json("There was no user in the database");
        }
        //if there is a subscriber save the subscriptioner id to the subscriptions list
        if (subscriber) {
          if (subscriber.subscriptions) {
            const whereIsSubscriptioner = subscriber.subscriptions.indexOf(
              subcriptionerID
            );
            console.log(whereIsSubscriptioner);
            whereIsSubscriptioner === -1
              ? subscriber.subscriptions.push(subcriptionerID)
              : subscriber.subscriptions.splice(whereIsSubscriptioner, 1);
          }
          subscriber.save((error) => {
            console.log(error);
          });
          res.json("Subscribed Successfully");
        }
      });
    } else {
      res.json(`can't subscribe to self`)
    }
  } else {
    res.redirect(`${process.env.CLIENT_URL}`);
  }
};
