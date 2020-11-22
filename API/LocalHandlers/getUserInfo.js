const User = require("../../database/Models/UserModel");
module.exports = (req, res) => {
  User.findOne({ id: req.params.id }, (error, user) => {
    if (error) {
      console.log("There was an error looking for the user in the database");
      console.error(error);
      res.json({ loggedIn: false });
    }
    if (!user) {
      console.log("no user was found the in the database");
      res.json({ loggedIn: false });
    }
    if (user) {
      res.json(user);
    }
  });
};
