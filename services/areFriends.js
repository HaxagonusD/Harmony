const FindUserSubscribers = require("../database/Queries/FindUserSubscribers");
const FindUserSubscriptions = require("../database/Queries/FindUserSubscriptions");

const areFriends = async (loggedInUserId, friendId) => {
  const loggedInUserSubscriptions = await FindUserSubscriptions(loggedInUserId);
  const friendIdSubscribers = await FindUserSubscribers(friendId);

  const loggedInUserIdCheck = loggedInUserSubscriptions.subscriptions.includes(
    friendId
  );
  const friendIdCheck = friendIdSubscribers.subscribers.includes(
    loggedInUserId
  );

  return loggedInUserId && friendIdCheck;
};

module.exports = areFriends;

// Are they friends?
//
// ---------

// Friend Requests to add friends
// Need to send requests to friends
// Need to accept request to become a friend

// See Friends

// Remove Friends
//
//
//Add followers from spotify using their spotify id's and followers

// ...
