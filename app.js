require("dotenv").config();

//some logger
const morgan = require("morgan");
const express = require("express");
const cors = require("cors"); // why does this even exist
const path = require("path");
const { Worker } = require("worker_threads");
//mongoose
const mongoose = require("mongoose");
//im not sure im going to use these

const SpotifyWebApi = require("spotify-web-api-node");
//TODO put this in a database
//?How will this work for multiple users?

//bringing in passport and session
const session = require("express-session");
//this is for storing session information in mongodb
const MongoStore = require("connect-mongo")(session);
mongoose
  .connect(process.env.MONGODB_ATLAS_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => console.log("Connected to data base"))
  .catch((error) => console.log(error));

//passprot config
//we make pasport in another file and pass it to an router that needs something from this config

//app initialization
const app = express();

// app.use(express.static(path.join(__dirname, "client", "build")));

app.locals.passport = require("./config/authentication/passportConfig");

//logging our requests
//TODO learn more about this
app.use(morgan("dev"));
//This is bascially our connection to spotify
//I don't really want to make new conections to to spotify every time
// I just want to have one connection and change the access token
app.locals.spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

//This is cors because it is dumb but apparently good
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
//cors is dumb
app.use(cors(corsOptions));

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//TODO Learn more about express session

//sesstion
//?are these options necessary?
app.use(
  session({
    secret: "keyboard cat",
    store: new MongoStore({ url: process.env.MONGODB_ATLAS_CONNECTION_STRING }),
    resave: true,
    saveUninitialized: true,
  })
);

//passport things
app.use(app.locals.passport.initialize());
app.use(app.locals.passport.session());

//API routes
const authRouter = require("./routes/authSpotifyRouters")(app.locals.passport);
const apiSubcribe = require("./routes/apiSubcribe");
const apiUsersRouter = require("./routes/apiUsersRouter");
//TODO add user registration

//using the routes
app.use("/auth", authRouter);

app.use("/api/users", apiUsersRouter);
app.use("/api/subscribe", apiSubcribe);
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });
app.get("/ping", (req, res) => {
  res.send("pong");
});
const updaterWorker = new Worker("./asyncTasks/updaterRunner.js");
updaterWorker.on("error", (error) => {
  console.error(error);
});
//This is is telling the server to constanly talk to spotify and get the the current track even when there are not client connected
//This is not good because it slows down the server and it runs on O(n) time
//That's a problem with millions of users
//It doesn't matter to us right not but the slowing down the server part does
//*Solution: Run it as another server or make a childprocess or a cluster or a worker or some other solution that doesn't ax the server

//listening at port 5000
app.set("port", process.env.PORT || 5000);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

//TODO look into sql postgres?
