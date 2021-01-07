const FindOneUserByID = require("../../database/Queries/FindOneUserByID");

// this file is handling getting any user from the database
//looks a lot like "./getMeInfo.js"
module.exports = (req, res) => {
  FindOneUserByID(req.params.id)
    .then((document) => {
      if (document) {
        res.json({ error: false, data: document });
      } else {
        res.json({
          error: true,
          errorMessage: "",
          description: "No user was found the in the database",
          redirect: true,
          redirectLocation: "/",
        });
      }
    })
    .catch((error) => {
      res.json({
        error: true,
        errorMessage: error,
        description: "There was an error looking for a user in the database",
        redirect: true,
        redirectLocation: "/",
      });
    });
};
