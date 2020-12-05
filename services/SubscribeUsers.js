const FindOneUserByID = require("../database/Queries/FindOneUserByID");
//! this function is not catching is the users don't exist in the databse
//*This error should be handled by the client side and the handler: getUserinfo
module.exports = (subscribingID, subscribedToID) => {
  return new Promise((resolve, reject) => {
    FindOneUserByID(subscribingID)
      .then((subscriber) => {
        if (subscriber) {
          const whereIsSubscriptioner = subscriber.subscriptions.indexOf(
            subscribedToID
          );
          whereIsSubscriptioner === -1
            ? subscriber.subscriptions.push(subscribedToID)
            : subscriber.subscriptions.splice(whereIsSubscriptioner, 1);
          subscriber.save().catch((error) => console.error(error));

          FindOneUserByID(subscribedToID)
            .then((subscribedTo) => {
              if (subscribedTo) {
                const whereIsSubscriber = subscribedTo.subscribers.indexOf(
                  subscribingID
                );

                whereIsSubscriber === -1
                  ? subscribedTo.subscribers.push(subscribingID) //can't be found
                  : subscribedTo.subscribers.splice(whereIsSubscriber, 1);
                subscribedTo.save().catch((error) => console.error(error));
                resolve(true);
              } else {
                reject("subscriptioner not found in the database");
              }
            })
            .catch((error) => reject(error));
        } else {
          reject("subscriber Not found in databse");
        }
      })
      .catch((error) => reject(error));
  });
};
