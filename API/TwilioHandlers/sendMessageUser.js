// This file is hwere notifications will be handled
const express = require('express');
const cors = require('cors');
const Twilio = require('twilio');
require("dotenv").config();

const accountSid = process.env.ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const twilioNumber = process.env.TWILIO_NUMBER; // Twilio number 

const client = new Twilio(accountSid, authToken);

module.exports = (user, track)=>{
    // get variables, passed in query str
    client.messages.create({
       body: `${user.displayName} is currently listening to ${track.songName} by ${track.artistName}.`,
       to: '3474713410',
       from: twilioNumber
    }).then((message) =>{
       console.log("message: ", message)
    }).catch((e)=> {
       console.log(e)
    }) 
}
