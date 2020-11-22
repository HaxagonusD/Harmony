const User = require("../../database/Models/UserModel");

module.exports = (req, res) => {
  if (req.user) {
    User.findOne({ id: req.user.id }, (error, user) => {
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
  } else {
    console.log("The user is not logged in");
    res.json({ loggedIn: false });
  }
};
