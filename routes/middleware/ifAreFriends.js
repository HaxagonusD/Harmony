const areFriends = require("../../services/areFriends");
const ifAreFriends = (req, res, next) => {
  if (areFriends(req.user.id, req.params.id)) {
    next(req, res);
  } else {
    res.json({
      error: true,
      description:
        "These 2 people are not friends. The loggedInUser should not be able to view this content",
    });
  }
};
module.exports = ifAreFriends;
