require('dotenv').config()
const cors = require("cors");
const getCurrentTrack = require("../API/SpotifyHandlers/getCurrentTrack");
const corsOptions = {
  origin: [process.env.CLIENT_URL, "http://localhost:5000"],
  credentials: true,
};
const router = require("express").Router();
router.use(cors(corsOptions));

router.get("/currenttrack", getCurrentTrack);

module.exports = router;
