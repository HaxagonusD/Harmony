const FindOneUserByID = require("../../database/Queries/FindOneUserByID");

//this file is handling getting the logged in user from the database and sending it to the client when they ask
module.exports = (req, res) => {
  if (req.user) {
    //find the user in the databse
    //
    FindOneUserByID(req.user.id)
      .then((document) => {
        document
          ? res.json({ error: false, data: document })
          : res.json({
              error: true,
              errorMessage: "",
              description: "Document does not exist in database",
              redirect: true,
              redirectLocation: "/",
            });
      })
      .catch((error) => {
        console.error(error);
        res.json({
          error: true,
          errorMessage: error,
          description: "Error looking for document in the database",
          redirect: true,
          redirectLocation: "/",
        });
      });
  } else {
    res.json({
      error: true,
      errorMessage: "",
      description: "The user is not logged in",
      redirect: true,
      redirectLocation: "/",
    });
  }
};
