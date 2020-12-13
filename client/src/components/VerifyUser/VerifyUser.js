import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import {useForm} from "react-hook-form";
import "./VerifyUser.css";

const VerifyUser = () => {

    const [verify, setVerify] = useState(true)

    const {register, handleSubmit, errors} = useForm();
    let history = useHistory();

    useEffect(() => {
      const instance = axios.create({
        withCredentials: true,
      });
      instance
        .get(`http://localhost:5000/auth/isverified`)
        .then(({ data }) => {
          if (data.phoneNumber == null) {
            history.push(`profile/${data.id}`);
          }
        })
        .catch((error) => console.error(error));
    }, [history]);
    
    if(!verify) {
        return <Redirect to="/" />
    }



    const onSubmit = (data) => {
        console.log("VERIFY DATA:", data)
        const instance = axios.create({
            withCredentials: true,
          });
          instance
            .post(`/auth/verify?phonenumber=${data.phonenumber}&code=${data.code}`)
            .then((res) => { 
              console.log("VERIFY RES:", res)
              setVerify(false)
            })
            .catch((error) => {
              console.error(error);
              setTimeout(function(){ 
                history.push("/signup");
              }, 1000);           
            });
    }

  return (
    <div className="verify-container">
      <div className="verify-form">
          <form onSubmit={handleSubmit(onSubmit)}>
              <label className="verify-label">Phone number <small> Please include country code </small></label><br/>
              <input id="input" type="text" name="phonenumber" placeholder="country code + phone #" ref={register({required: true, minLength: {value: 11, message: "Phone number is too short"}})}/> <br/>
              {errors.phonenumber && <span className="verify-error">{errors.phonenumber.message}</span>} <br/><br/>
              <label className="verify-label">Code</label><br/>
              <input id="input" type="text" name="code" placeholder="Type four-digit code" ref={register({required: true, minLength: {value: 4, message: "Code length is invalid"}, maxLength: 4})}/> <br/>
              {errors.code && <span className="verify-error">{errors.code.message}</span>} <br/><br/>
              <input className="signup-button" type="submit" value="Submit Code" /><br/>
          </form>
      </div>
    </div>
  );
};

export default VerifyUser;