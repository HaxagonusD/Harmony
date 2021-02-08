const User = require("../Models/UserModel");

module.exports = (id) => {
  return User.findOne({ id: id }).exec();
};

