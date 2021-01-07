const addCommentsToSong = require("../../services/AddCommentsToSong");
// What is happening in this file
module.exports = (req, res) => {
  const postOwner = req.params.id;
  const { commentContent } = req.body;
  const commenter = req.user.id;
  addCommentsToSong(commenter, postOwner, commentContent);
  res.json("This is from the server: -----" + commentContent);
};
