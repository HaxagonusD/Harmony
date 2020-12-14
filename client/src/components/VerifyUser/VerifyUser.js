import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./VerifyUser.css";

const VerifyUser = () => {
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();

  // useEffect(() => {
  //   const instance = axios.create({
  //     withCredentials: true,
  //   });
  //   instance
  //     .get(`http://localhost:5000/auth/isloggedin`)
  //     .then(({ data }) => {
  //       if (data !== null) {
  //         history.push(`profile/${data.id}`);
  //       }
  //     })
  //     .catch((error) => console.error(error));
  // }, [history]);

  const onSubmit = (data) => {
    console.log("VERIFY DATA:", data);
    const instance = axios.create({
      withCredentials: true,
    });
    instance
      .post(`/auth/verify?phonenumber=${data.phonenumber}&code=${data.code}`)
      .then(({ data }) => {
        console.log(data);
        if (data !== null) {
          history.push(`profile/${data.id}`);
        } else {
          history.push("/signup");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formError = (data) => {
    console.log(data);
  };
  return (
    <div className="verify-container">
      <div className="verify-form">
        <form onSubmit={handleSubmit(onSubmit, formError)}>
          <label className="verify-label">
            Phone number <small> Please include country code </small>
          </label>
          <br />
          <input
            id="input"
            type="text"
            name="phonenumber"
            placeholder="country code + phone #"
            ref={register({
              required: true,
              minLength: { value: 11, message: "Phone number is too short" },
            })}
          />{" "}
          <br />
          {errors.phonenumber && (
            <span className="verify-error">{errors.phonenumber.message}</span>
          )}{" "}
          <br />
          <br />
          <label className="verify-label">Code</label>
          <br />
          <input
            id="input"
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
          {errors.code && (
            <span className="verify-error">{errors.code.message}</span>
          )}{" "}
          <br />
          <br />
          <input className="signup-button" type="submit" value="Submit Code" />
          <br />
        </form>
      </div>
    </div>
  );
};

export default VerifyUser;
