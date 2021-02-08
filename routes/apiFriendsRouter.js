require("dotenv").config();
const cors = require("cors");
const router = require("express").Router();
const sendFriendRequest = require("./API/sendFriendRequest");
const isLoggedIn = require("./middleware/isLoggedIn");

const corsOptions = {
  origin: [process.env.CLIENT_URL, "http://localhost:5000"],
  credentials: true,
};

router.use(cors(corsOptions));

router.post("/:id", isLoggedIn, sendFriendRequest);

module.exports = router;
