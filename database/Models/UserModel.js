const mongoose = require("mongoose");
const UserSchema = require('../Schemas/UserSchema')

module.exports = UserModel = mongoose.model( "User", UserSchema)
