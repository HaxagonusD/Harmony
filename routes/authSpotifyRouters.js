require("dotenv").config();
const router = require("express").Router();

module.exports = function (passport) {
  // console.log(passport)
  //when we log in passport handles this for us with spotify
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


  // spotify is going make a get request to this route
  router.get(
    "/callback",
    passport.authenticate("spotify", {
      failureRedirect: `${process.env.CLIENT_URL}`,
    }),
    (req, res) => {
      //sucessfull
      //redirect the to the client url
      res.redirect(`${process.env.CLIENT_URL}/profile/${req.user.id}`);
    }
  );

  //TODO
  //This is for passport. it doesn't log user out of spotify tho
  //perhaps if user is not defined redirect to login? Doesn't pass port do this already?
  //This is for login the user out 
  router.get("/logout", (req, res) => {
    req.logOut();

    res.redirect(`${process.env.CLIENT_URL}`);
  });
  return router;
};