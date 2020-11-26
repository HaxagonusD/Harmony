const User = require("../../database/Models/UserModel");

//this file is handling getting the logged in user from the database and sending it to the client when they ask 
module.exports = (req, res) => {
  //if the user is logged in
  if (req.user) { 
    //find the user in the databse 
    User.findOne({ id: req.user.id }, (error, user) => {
      
      if (error) {
        // console.log("There was an error looking for the user in the database");
        console.error(error);
        res.json({ loggedIn: false });
      }
      if (!user) {
        // console.log("no user was found the in the database");
        res.json({ loggedIn: false });
      }
      if (user) {
        res.json(user);
      }
    });
  } else {
    // console.log("The user is not logged in");
    res.json({ loggedIn: false });
  }
};
