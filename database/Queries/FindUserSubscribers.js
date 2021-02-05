const User = require("../Models/UserModel");
const FindUserSubscribers = (id) => {
  return User.findOne({ id: id }).select("subscribers").exec();
};

module.exports = FindUserSubscribers;
