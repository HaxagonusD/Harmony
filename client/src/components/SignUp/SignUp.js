import React, { useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import {useForm} from "react-hook-form";

function SignUp () {

    const [sendCode, setSendCode] = useState(true)

    const {register, handleSubmit, errors} = useForm();

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
    <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Phone Number <small>* Make sure to include country code *</small></label><br/>
            <input type="text" placeholder="i.e. 18001234567" name="phonenumber" ref={register({required: true, minLength: {value: 11, message: "Phone number is too short"}})}/><br/>
            {errors.phonenumber && <span>{errors.phonenumber.message}</span>}
            <br/>
            <label>How would you like to receive your verification code?</label><br/>
            <input type="radio" name="channel" id="sms" value="sms" ref={register({required:true, message: "Pick a verification code option."})}/> sms<br/>
            <input type="radio" name="channel" id="call" value="call" ref={register({required:true, message: "Pick a verification code option."})}/> call<br/>
            {errors.channel && <span>{errors.channel.message}</span>}
            <input type="submit" value="Get Code"/><br/>
            
        </form>
    </div>
  );
};

export default SignUp;
