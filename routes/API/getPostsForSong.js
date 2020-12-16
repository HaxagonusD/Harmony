const FindOneUserByID = require("../../database/Queries/FindOneUserByID");
const FindSongPostByUserIDAndSongID = require("../../database/Queries/FindSongPostByUserIDAndSongID");
module.exports = (req, res) => {
  const postOwner = req.params.id;

    FindOneUserByID(postOwner)
    .then((userDocument) => {
      FindSongPostByUserIDAndSongID(postOwner, userDocument.currentTrack.songId)
        .then((document) => res.json(document));
    })
    .catch((err) => {
      console.log(err);
      res.json(null);
    });
};
