require("dotenv").config();
const router = require("express").Router();
const cors = require("cors");
const isLoggedIn = require("./middleware/isLoggedIn");

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);
const FindOneUserByID = require("../database/Queries/FindOneUserByID");

module.exports = function (passport) {
  //when we log in passport handles this for us with spotify

  // // router.use(cors(corsOptions));
  router.get("/isloggedin", isLoggedIn, (req, res) => {
    //the person is logged in so redirect them to their profile page
    res.json({ id: req.user.id });
  });

  router.get("/isverified", isLoggedIn, (req, res) => {
    //the person is logged in so redirect them to their profile page
    res.json({
      id: req.user.id,
      phoneNumber: req.user.phoneNumber,
    });
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
      failureRedirect: `${
        process.env.NODE_ENV === "development"
          ? process.env.CLIENT_URL
          : process.env.HEROKU_URL
      }404`,
      // successRedirect: `${process.env.CLIENT_URL}/profile/${req.user.id}`
    }),
    (req, res) => {
      if (req.user) {
        console.log("==== USER: ", req.user);
        if (!req.user.phoneNumber) {
          res.redirect(
            `${
              process.env.NODE_ENV === "development"
                ? process.env.CLIENT_URL
                : process.env.HEROKU_URL
            }signup`
          );
        } else {
          //sucessfull
          //redirect the to the client url
          res.redirect(
            `${
              process.env.NODE_ENV === "development"
                ? process.env.CLIENT_URL
                : process.env.HEROKU_URL
            }profile/${req.user.id}`
          );
        }
      }
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

router.post("/signup", (req, res) => {
  if (req.query.phonenumber && req.query.channel) {
    client.verify
      .services(process.env.SERVICE_ID)
      .verifications.create({
        to: `+${req.query.phonenumber}`,
        channel: req.query.channel === "call" ? "call" : "sms",
      })
      .then((data) => {
        res.status(200).send({
          message: "Verification sent!",
          phonenumber: req.query.phonenumber,
          data,
        });
        FindOneUserByID(req.user.id).then((res) => {
          res.phoneNumber = req.query.phonenumber;
          res.save().catch((err) => {
            console.log(err);
          });
        });
      });
  } else {
    res.status(400).send({
      message: "Wrong phone number",
      phonenumber: req.query.phonenumber,
    });
  }
});

router.post("/verify", (req, res) => {
  FindOneUserByID(req.user.id).then((user) => {
    // console.log("MY USER: ", user);
    if (req.query.code.length === 6) {
      client.verify
        .services(process.env.SERVICE_ID)
        .verificationChecks.create({
          to: `+${req.query.phonenumber}`,
          code: req.query.code,
        })
        .then((data) => {
          if (data.status === "approved") {
            res.json({ id: req.user.id });
            /**
             * {
             *  error:  false,
             *  whatTodo: "redirect",
             *  redirectLocation: "***url path***"
             *
             * }
             */
            // User(req.user.id).then(res => {
            //   res.phoneNumber = req.query.phonenumber;
            //   res.save().catch(err=>{
            //     console.log(err)
            //   })
            // })
          } else {
            // res.status(400).send({
            //   message: "Wrong phone number or code",
            //   phonenumber: req.query.phonenumber
            // })

            user.phoneNumber = null;
            user.save().catch((err) => {
              console.log(err);
            });

            res.json(null);
            /**
             * {
             * Error: true,
             * ErrorMessage: "Error finding the user"
             * action: "redirect"
             * redirectLocation: "login page"
             * }
             */
          }
        })
        .catch((err) => {
          console.log(err);
          res.json(null);
          /**
           * {
           * Error: true,
           * ErrorMessage: "The code is not approved"
           * action: "redirect"
           * redirectLocation: "url path"
           * }
           */
        });
    } else {
      // res.status(400).send({
      //   message: "Invalid phone number or code.",
      //   phonenumber: req.query.phonenumber
      // })
      FindOneUserByID(req.user.id).then((res) => {
        res.phoneNumber = null;
        res.save().catch((err) => {
          console.log(err);
        });
      });
      res.json(null);
      /**
       * {
       * Error: true,
       * ErrorMessage: "The code is not approved"
       * action: "redirect"
       * redirectLocation: "url path"
       * }
       */
    }
  });
});

//TODO
//*callback from spotify -> are they or are they not registered
//* redirect to frontend form
//TODO make fronend form
//*Submit their phone number -> verify twilio
//TODO make routes
//verify again or taken to profile -> databse phone number is registered
