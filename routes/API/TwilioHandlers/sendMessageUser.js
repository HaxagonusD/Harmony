// This file is hwere notifications will be handled

const Twilio = require('twilio');
require("dotenv").config();

const accountSid = process.env.ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const twilioNumber = process.env.TWILIO_NUMBER; // Twilio number 
const client = new Twilio(accountSid, authToken);

const UserModel = require('../../../database/Models/UserModel');

module.exports = (user)=>{
    for (const subscriber of user.subscribers){
        UserModel.findOne({id: subscriber}, (err, subscriber=null)=> {
            if(err) {
                console.log('Error finding user')
                console.error(err);
            }
            if (subscriber) {
                // get variables, passed in query str
                client.messages.create({
                   body: `${user.displayName} is currently listening to ${user.currentTrack.songName} by ${user.currentTrack.artistName}.`,
                   to: subscriber.phoneNumber,
                   from: twilioNumber
                }).then((message) =>{
                   console.log("message: ", message)
                }).catch((e)=> {
                   console.log(e)
                }) 
            }
        })
    }

}
