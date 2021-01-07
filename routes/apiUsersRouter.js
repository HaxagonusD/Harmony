require("dotenv").config();
const getMeInfo = require("./API/getMeInfo");
const getUserInfo = require("./API/getUserInfo");
const cors = require("cors");
const corsOptions = {
  origin: [process.env.CLIENT_URL, "http://localhost:5000"],
  // credentials: true,
};

const router = require("express").Router();
router.use(cors(corsOptions));

router.get("/me", getMeInfo);
router.get("/:id", getUserInfo);

module.exports = router;
