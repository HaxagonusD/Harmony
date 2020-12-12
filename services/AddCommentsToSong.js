const FindOneUserByID = require("../database/Queries/FindOneUserByID");
const SongPostModel = require("../database/Models/SongPostModel");
const moment = require("moment");
module.exports = (commenterId, postOwnerId, content) => {
  FindOneUserByID(postOwnerId).then((postOwnerDocument) => {
    SongPostModel.findOne({
      ownner: postOwnerId,
      songId: postOwnerDocument.currentTrack.songId,
    })
      .exec()
      .then((songPostDocument) => {
        if (songPostDocument) {
          songPostDocument.comments.push({
            dateCreated: moment().format("MMM Do YY"), // when was this post made
            content: content, // what did the commenter say
            commenter: commenterId, //this is supposed to be commenter name
            commentId: commenterId, // comment id
          });
          songPostDocument.save().catch((err) => console.log(err));
        } else {
          const newSongPost = new SongPostModel({
            ownner: postOwnerId,
            songId: postOwnerDocument.currentTrack.songId,
            comments: [
              {
                dateCreated: moment().format("MMM Do YY"), // when was this post made
                content: content, // what did the commenter say
                commenter: commenterId, //this is supposed to be commenter name
                commentId: commenterId, // comment id
              },
            ],
          });
          // console.log(newSongPost);
          newSongPost
            .save()
            .then((thenewone) => {
              postOwnerDocument.songPosts.push(thenewone._id);
              postOwnerDocument.save().catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  });
};
