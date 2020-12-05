require("dotenv").config();
const cors = require("cors");
const subscribeToUser = require("./API/LocalHandlers/subscribeToUser");

const corsOptions = {
  origin: [process.env.CLIENT_URL, "http://localhost:5000"],
  credentials: true,
};
const router = require("express").Router();

router.use(cors(corsOptions));

//when you subscribe you send a post request here with the user you are subscribing to in the parameters
//the user that you are logged in as should be in req.user.id
router.post("/:id", subscribeToUser);

module.exports = router;
