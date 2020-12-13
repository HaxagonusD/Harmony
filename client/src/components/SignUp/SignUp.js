import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import {useForm} from "react-hook-form";
import "./SignUp.css";

function SignUp () {

    const [sendCode, setSendCode] = useState(true)

    const {register, handleSubmit, errors} = useForm();

    let history = useHistory();
    useEffect(() => {
      const instance = axios.create({
        withCredentials: true,
      });
      instance
        .get(`http://localhost:5000/auth/isverified`)
        .then(({ data }) => {
          console.log("data: ", data)
          if (data.phoneNumber == null) {
            history.push(`profile/${data.id}`);
          }
        })
        .catch((error) => console.error(error));
    }, [history]);

    if(!sendCode) {
        return <Redirect to="/verify" />
    }

    const onSubmit = (data) => {
        console.log("DATA: ", data)
        const instance = axios.create({
            withCredentials: true,
          });
          instance
            .post(`/auth/signup?phonenumber=${data.phonenumber}&channel=${data.channel}`)
            .then((res) => {
              setSendCode(false)
            })
            .catch((error) => {
              console.error("ERROR: ", error)
            });
    }


  return (
    <div className="signup-container">
      <div className="signup-form">
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className="signup-label">Phone Number <small>Please include country code</small></label><br/>
            <input id="input-phone" type="text" placeholder="i.e. 18001234567" name="phonenumber" ref={register({required: true, minLength: {value: 11, message: "Phone number is too short"}})}/><br/>
            {errors.phonenumber && <span className="signup-error">{errors.phonenumber.message}</span>}
            <br/>
            <label className="signup-label">How would you like to receive your verification code?</label><br/>
            <div className="input-radio">
            <input type="radio" name="channel" id="sms" value="sms" ref={register({required:true, message: "Pick a verification code option."})}/> sms<br/>
            <input type="radio" name="channel" id="call" value="call" ref={register({required:true, message: "Pick a verification code option."})}/> call<br/>
            {errors.channel && <span>{errors.channel.message}</span>}
            </div>
            <input className="signup-button" type="submit" value="Get Code"/><br/>
            
        </form>
      </div>
    </div>

  );
};

export default SignUp;
