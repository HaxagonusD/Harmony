const UserModel = require("../../database/Models/UserModel");
const songPostModel = require("../../database/Models/SongPostModel");
module.exports = (req, res) => {
  const postOwner = req.params.id;
  //   console.log('getting post for song :P')
  UserModel.findOne({ id: postOwner })
    // .populate("something", 'songId', "songpostmodel")
    .exec()
    .then((userDocument) => {
      console.log("--------------------------------------");

      console.log("This is the owner", userDocument);
      console.log("--------------------------------------");
      console.log("this is the ownder songPosts", userDocument.songPosts);
      console.log("--------------------------------------");
      songPostModel.find(
        { _id: { $in: userDocument.songPosts } },
        (err, docs) => {
          if (err) {
            console.log(err);
          }
          res.json({ comments: docs });
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.json(null);
    });
};
