import React, { useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

const VerifyUser = () => {


  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();


  const onSubmit = (data) => {
    console.log("VERIFY DATA:", data);
    const instance = axios.create({
      withCredentials: true,
    });
    instance
      .post(`/auth/verify?phonenumber=${data.phonenumber}&code=${data.code}`)
      .then((res) => {
        if(res === null){
          history.push('/signup')
        } else {
          history.push(`/profile/${res.data.id}`)
        }
      })
      .catch((error) => {
        console.error(error);
        history.push("/signup");
      });
  };
  const someErrorFunction = (data) => {
    console.log("there was an error with submit perhaps----", data);
  };
  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit, someErrorFunction)}>
        <label>Phone number</label>
        <br />
        <input
          type="text"
          name="phonenumber"
          placeholder="country code + phone #"
          ref={register({
            required: true,
            minLength: { value: 11, message: "Phone number is too short" },
          })}
        />{" "}
        <br />
        {errors.phonenumber && <span>{errors.phonenumber.message}</span>} <br />
        <br />
        <label>Code</label>
        <br />
        <input
          type="text"
          name="code"
          placeholder="Type four-digit code"
          ref={register({
            required: true,
            minLength: { value: 6, message: "Code length is invalid" },
            maxLength: 6,
          })}
        />{" "}
        <br />
        {errors.code && <span>{errors.code.message}</span>} <br />
        <br />
        <button type="submit">Submit Code</button>
        <br />
      </form>
    </div>
  );
};

export default VerifyUser;
