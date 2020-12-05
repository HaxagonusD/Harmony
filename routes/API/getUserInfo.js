
const FindOneUserByID = require("../../database/Queries/FindOneUserByID");

// this file is handling getting any user from the database
//looks a lot like "./getMeInfo.js"
module.exports = (req, res) => {
  FindOneUserByID(req.params.id)
    .then((document) => {
      if (document) {
        res.json(document);
      } else {
        console.log("no user was found the in the database");
        res.json(null);
      }
    })
    .catch((error) => {
      console.error("This is in GetUserInfo line 11", error);
      res.json(null);
    });
};
