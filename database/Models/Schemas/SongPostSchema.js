const mongoose = require("mongoose");
const { Schema } = mongoose;
const SongPost = new Schema({
  owner: String, // who owns this post
  songId: String, // for waht song is this post
  comments: {
    type: [
      {
        dateCreated: String, // when was this post made
        content: String, // what did the commenter say
        commenter: String,
        commentId: String, // comment id
      },
    ],
    default: [],
  },
});

module.exports = SongPost;
