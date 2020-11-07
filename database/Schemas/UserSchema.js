const mongoose = require("mongoose")
const { Schema } = mongoose;

module.export = User = new Schema({
    displayName: String,
    id: String,
    profileUrl: String,
    provider: String ,
    spotifyAccessToken: String,
    spotifyRefreshToken: String,
    expiresIn: String,
})