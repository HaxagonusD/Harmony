const FindOneUserByID = require("../database/Queries/FindOneUserByID");
const FindSongPostByUserIDAndSongID = require("../database/Queries/FindSongPostByUserIDAndSongID");
const SongPostModel = require("../database/Models/SongPostModel");
const moment = require("moment");
// This file has an issue
// We have to seperate our data layer and our business layer
// In this file .save() is being used but that is a mongoose function that needs to be abstracted away
module.exports = (commenterId, postOwnerId, content) => {
  FindOneUserByID(postOwnerId).then((postOwnerDocument) => {
    FindSongPostByUserIDAndSongID(
      postOwnerId,
      postOwnerDocument.currentTrack.songId
    )
      .then(async (songPostDocument) => {
        // MAybe there is room for async optimzation
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
