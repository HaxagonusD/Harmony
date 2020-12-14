const router = require("express").Router();
const postCommentToUser = require("./API/postCommentToUser");
const getPostsForSong = require("./API/getPostsForSong");

router.get("/:id", getPostsForSong);
router.post("/:id", postCommentToUser);

module.exports = router;
