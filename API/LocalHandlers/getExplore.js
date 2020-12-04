const User = require("../../database/Models/UserModel");
//!.count is deprecated. Make your own mongoose-simple-random library
module.exports = (req, res) => {
  console.log('something is off')
  User.findRandom({}, {}, { limit: 10 }, function (err, results) {
    if (!err) {
      // console.log(results); // 5 elements
      res.json(results);
    }
  });
  
};
