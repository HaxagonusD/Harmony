const mongoose = require("mongoose");
const songPostSchema = require('./Schemas/songPostSchema.js')

module.exports = songPostModel = mongoose.model( "songpostmodel", songPostSchema)