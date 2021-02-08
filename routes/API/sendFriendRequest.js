const createNotification = require("../../services/createNotification");

const sendFriendRequest = async (req, res) => {
  const loggedInUserId = req.user.id;
  const friendId = req.params.id;
  const newFriendRequest = await createNotification(
    loggedInUserId,
    friendId,
    "friendRequest"
  );
  if (newFriendRequest) {
    res.json({ error: false });
  } else {
    res.json({ error: true, description: "Error creating new friend request" });
  }
};

module.exports = sendFriendRequest;
