const User = require("../Models/UserModel");
const FindUserSubscriptions = (id) => {
  return User.findOne({ id: id }).select("subscriptions").exec();
};

module.exports = FindUserSubscriptions;
