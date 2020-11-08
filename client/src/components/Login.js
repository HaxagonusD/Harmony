// import Axios from "axios"
import React from "react";
import "../styles/Login/Login.css";
// import axios from "axios";
const Login = () => {
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
