const User = require("../../../database/Models/UserModel");
// this file is handling getting any user from the database
//looks a lot like "./getMeInfo.js"
module.exports = (req, res) => {
  res.set('Access-Control-Allow-Origin', "http://localhost:3000/")
  User.findOne({ id: req.params.id }, (error, user) => {
    //if there was an error
    if (error) {

      console.log("There was an error looking for the user in the database");
      console.error(error);
      res.redirect(`${process.env.CLIENT_URL}`);
    }
    //if we didn't user
    if (!user) {

      console.log("no user was found the in the database");
      res.redirect(`${process.env.CLIENT_URL}`);
    }
    //if we found user
    if (user) {
      res.json(user);
    }
  });
};
