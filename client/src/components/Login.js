import React, { useEffect } from "react";
import axios from "axios";
import "../styles/Login/Login.css";
// import { Redirect } from "react-router-dom";
// import Cookies from "js-cookie";
const Login = () => {
  // useEffect(() => {
  //   const instance = axios.create({
  //     withCredentials: true,
  //   });
  //   instance
  //     .get(`http://localhost:5000/auth/isloggedin`)
  //     .catch((error) => console.error(error));
  // }, []);
  return (
    <div className="login">
      <div className="greeting">
        Listening to <div className="green">Spotify?</div> Spam your friends.
      </div>
      <div className="description">
        Send the song you are currently playing on spotify to any phone number
      </div>
      <a className="loginLink" href="http://localhost:5000/auth/spotify">
        Log in with spotify
      </a>
    </div>
  );
};

export default Login;
