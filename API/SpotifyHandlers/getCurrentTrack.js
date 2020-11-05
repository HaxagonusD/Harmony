require("dotenv").config();
module.exports = function (req, res, next) {
  req.app.locals.spotifyApi.getMyCurrentPlayingTrack().then(
    function (data) {
      //TODO add error handling
      data.body !== undefined
        ? res.json(data.body.item.name)
        : res.json("Nothing");
    },
    function (err) {
      //TODO add response error handling
      console.log("history!", err);
    }
  );
};
