const FindOneUserByID = require("../../database/Queries/FindOneUserByID");
const FindSongPostByUserIDAndSongID = require("../../database/Queries/FindSongPostByUserIDAndSongID");
module.exports = (req, res) => {
  const postOwner = req.params.id;

  FindOneUserByID(postOwner)
    .then((userDocument) => {
      FindSongPostByUserIDAndSongID(
        postOwner,
        userDocument.currentTrack.songId
      ).then((document) => {
        if (document) {
          console.log(document);
          res.json({
            error: false,
            data: document,
          });
        } else {
          res.json({
            error: false,
            errorMessage: "",
            description: "There was no user in the database",
            redirect: true,
            redirectLocation: "/",
          });
        }
      });
    })
    .catch((error) => {
      res.json({
        error: true,
        errorMessage: error,
        redirect: true,
        redirectLocation: "/",
      });
    });
};
