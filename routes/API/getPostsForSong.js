const UserModel = require("../../database/Models/UserModel");
const songPostModel = require("../../database/Models/SongPostModel");
module.exports = (req, res) => {
  const postOwner = req.params.id;
  //   console.log('getting post for song :P')
  UserModel.findOne({ id: postOwner })
    .exec()
    .then((userDocument) => {
      songPostModel
        .findOne({
          owner: userDocument.id,
          songId: userDocument.currentTrack.songId,
        })
        .then((document) => res.json(document));
    })
    .catch((err) => {
      console.log(err);
      res.json(null);
    });
};
