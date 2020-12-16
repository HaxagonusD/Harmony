const Song = require('../Models/SongPostModel');

module.exports = (owner, songId)=>{
    return Song.findOne({owner: owner, songId: songId}).exec()
}