const mongoose = require("mongoose");
const { Schema } = mongoose;
const SongPost = new Schema({
  owner: { type: String, default: "" }, // who owns this post
  songId: String, // for waht song is this post
  comments: {
    type: [
      {
        displayName: { type: String, default: "There was an Error" },
        dateCreated: String, // when was this post made
        content: String, // what did the commenter say
        commenter: { type: String, default: "There is an error" },
      },
    ],
    default: [],
  },
});

module.exports = SongPost;
