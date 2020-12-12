import React, { useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import {useForm} from "react-hook-form";

const VerifyUser = () => {

    const [verify, setVerify] = useState(true)

    const {register, handleSubmit, errors} = useForm();
    let history = useHistory();

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
    <div className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Phone number</label><br/>
            <input type="text" name="phonenumber" placeholder="country code + phone #" ref={register({required: true, minLength: {value: 11, message: "Phone number is too short"}})}/> <br/>
            {errors.phonenumber && <span>{errors.phonenumber.message}</span>} <br/><br/>
            <label>Code</label><br/>
            <input type="text" name="code" placeholder="Type four-digit code" ref={register({required: true, minLength: {value: 4, message: "Code length is invalid"}, maxLength: 4})}/> <br/>
            {errors.code && <span>{errors.code.message}</span>} <br/><br/>
            <input type="submit" value="Submit Code" /><br/>
        </form>
    </div>
  );
};

export default VerifyUser;
