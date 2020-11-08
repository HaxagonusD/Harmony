require("dotenv").config();
const router = require("express").Router();

module.exports = function (passport) {
  // console.log(passport)
  router.get(
    "/",
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

  router.get(
    "/callback",
    passport.authenticate("spotify", {
      failureRedirect: `${process.env.CLIENT_URL}`,
    }),
    (req, res) => {
      //sucessfull
      console.log("callback/ req.user has been set?", req.user);
      console.log("In /auth/spotify/callback it was sucessfull");
      res.redirect(`${process.env.CLIENT_URL}/config`);
    }
  );

  //TODO
  //This is for passport doesn't log user out of spotify tho
  //perhaps if user is not defined redirect to login? Doesn't pass port do this already?
  router.get("/logout", (req, res) => {
    req.logOut();

    res.redirect(`${process.env.CLIENT_URL}`);
  });
  return router;
};
