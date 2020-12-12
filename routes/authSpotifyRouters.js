require("dotenv").config();
const router = require("express").Router();
const cors = require("cors");

const client = require('twilio')(process.env.VERIFY_SID, process.env.VERIFY_AUTH);
const User = require('../database/Queries/FindOneUserByID')


module.exports = function (passport) {
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
      failureRedirect: `${process.env.CLIENT_URL}/404`,
      // successRedirect: `${process.env.CLIENT_URL}/profile/${req.user.id}`
    }),
    (req, res) => {
      if(req.user){
        console.log("==== USER: ", req.user);
        if(!req.user.phoneNumber){ 
          res.redirect(`${process.env.CLIENT_URL}/signup`);
        } else {
          //sucessfull
          //redirect the to the client url
          res.redirect(`${process.env.CLIENT_URL}/profile/${req.user.id}`);
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

    res.status(200).end()
  });
  return router;
};

router.post("/signup", (req, res) => {
  if(req.query.phonenumber && req.query.channel){
    client
    .verify
    .services(process.env.SERVICE_ID)
    .verifications
    .create({
      to: `+${req.query.phonenumber}`,
      channel: req.query.channel === 'call' ? 'call' : 'sms'
    })
    .then(data => {
      res.status(200).send({
        message: "Verification sent!",
        phonenumber: req.query.phonenumber,
        data
      })
      User(req.user.id).then(res => {
        console.log("RES", res)
        res.phoneNumber = req.query.phonenumber;
        res.save().catch(err=>{
          console.log(err)
        })
      })
    })
  } else {
    res.status(400).send({
      message: "Wrong phone number",
      phonenumber: req.query.phonenumber,
    })
  }
})

router.post("/verify", (req, res) => {
  User(req.user.id).then(user => {
    console.log("MY USER: ", user)
    if(req.query.phonenumber === user.phoneNumber && (req.query.code).length === 4) {
      client
      .verify
      .services(process.env.SERVICE_ID)
      .verificationChecks
      .create({
        to: `+${req.query.phonenumber}`,
        code: req.query.code
      })
      .then(data => {
        if(data.status === "approved") {
          res.status(200).send({
            message: "User is verified!",
            data 
          })
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
          User(req.user.id).then(res => {
            res.phoneNumber = null;
            res.save().catch(err=>{
              console.log(err)
            })
          })
          res.redirect(`${process.env.CLIENT_URL}/signup`);
        }
      })
      .catch(err =>{
        console.log(err)
        res.redirect(`${process.env.CLIENT_URL}/signup`);
      })
    } else {
      // res.status(400).send({
      //   message: "Invalid phone number or code.",
      //   phonenumber: req.query.phonenumber
      // })
      User(req.user.id).then(res => {
        res.phoneNumber = null;
        res.save().catch(err=>{
          console.log(err)
        })
      })
      res.redirect(`${process.env.CLIENT_URL}/signup`);
    }
  })
})

//TODO
//*callback from spotify -> are they or are they not registered 
//* redirect to frontend form 
//TODO make fronend form
//*Submit their phone number -> verify twilio
//TODO make routes 
//verify again or taken to profile -> databse phone number is registered
