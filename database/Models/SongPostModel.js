const mongoose = require("mongoose");
const songPostSchema = require("./Schemas/SongPostSchema.js");

module.exports = songPostModel = mongoose.model("SongPost", songPostSchema);
