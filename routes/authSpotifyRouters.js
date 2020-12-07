require("dotenv").config();
const router = require("express").Router();
const cors = require("cors");

module.exports = function (passport) {
  // console.log(passport)
  //when we log in passport handles this for us with spotify

  function loggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.json(null);
    }
  }

  // // router.use(cors(corsOptions));
  router.get("/isloggedin", loggedIn, (req, res) => {
    //the person is logged in so redirect them to their profile page
    res.json({ id: req.user.id });
  });

  router.get(
    "/spotify",
    passport.authenticate("spotify", {
      scope: [
        "user-read-email",
        "user-read-private",
        "user-read-currently-playing",
        "user-read-playback-state",
      ],
      showDialog: true,
    })
  );

  // spotify is going make a get request to this route
  router.get(
    "/spotify/callback",
    passport.authenticate("spotify", {
      failureRedirect: `${process.env.HEROKU_URL}404`,
      // successRedirect: `${process.env.CLIENT_URL}/profile/${req.user.id}`
    }),
    (req, res) => {
      //sucessfull
      //redirect the to the client url
      res.redirect(`${process.env.HEROKU_URL}profile/${req.user.id}`);
    }
  );

  //TODO
  //This is for passport. it doesn't log user out of spotify tho
  //perhaps if user is not defined redirect to login? Doesn't pass port do this already?
  //This is for login the user out
  router.get("/logout", (req, res) => {
    req.logOut();

    res.status(200).end();
  });
  return router;
};

//TODO
//*callback from spotify -> are they or are they not registered
//* redirect to frontend form
//TODO make fronend form
//*Submit their phone number -> verify twilio
//TODO make routes
//verify again or taken to profile -> databse phone number is registered
