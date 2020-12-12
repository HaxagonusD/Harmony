const FindOneUserByID = require("../database/Queries/FindOneUserByID");
const SongPostModel = require("../database/Models/SongPostModel");
const moment = require("moment");
module.exports = (commenterId, postOwnerId, content) => {
  FindOneUserByID(postOwnerId).then((postOwnerDocument) => {
    SongPostModel.findOne({
      owner: postOwnerId,
      songId: postOwnerDocument.currentTrack.songId,
    })
      .exec()
      .then(async (songPostDocument) => {
        const commenterDocument = await FindOneUserByID(commenterId);

        if (songPostDocument) {
          songPostDocument.comments.push({
            displayName: commenterDocument.displayName,
            dateCreated: moment().format("MMM Do YY"), // when was this post made
            content: content, // what did the commenter say
            commenter: commenterId, //this is supposed to be commenter name
          });
          songPostDocument.save().catch((err) => console.log(err));
        } else {
          const newSongPost = new SongPostModel({
            owner: postOwnerId,
            songId: postOwnerDocument.currentTrack.songId,
            comments: [
              {
                displayName: commenterDocument.displayName,
                content: content, // what did the commenter say
                commenter: commenterId, //this is supposed to be commenter name
                dateCreated: moment().format("MMM Do YY"), // when was this post made
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
