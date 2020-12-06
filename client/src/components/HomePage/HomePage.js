import React, { useEffect } from "react";
import axios from "axios";
import splashPage from "./styles/splashPage.jpg";
import { useHistory } from "react-router-dom";
import "./styles/Homepage.css";
// import { Redirect } from "react-router-dom";
// import Cookies from "js-cookie";
const Login = () => {
  let history = useHistory();
  useEffect(() => {
    const instance = axios.create({
      withCredentials: true,
    });
    instance
      .get(`http://localhost:5000/auth/isloggedin`)
      .then(({ data }) => {
        if (data !== null) {
          history.push(`profile/${data.id}`);
        }
      })
      .catch((error) => console.error(error));
  }, [history]);

  return (
    <div className="HomePage">
      <div className="greeting">
        Listening to <div className="green">Spotify?</div>{" "}
        <div>
          Spam your <div className="blue">friends!</div>
        </div>
      </div>
      <div className="description">
        Sign up to this app and let your friends know about the awesome music
        you are listening to
      </div>
      <a className="register" href="http://localhost:5000/auth/spotify">
        Sign up
      </a>
      {/* <a className="login" href="http://localhost:5000/auth/spotify">
        Log in with Spotify
      </a> */}
      <img alt="homepagepic" id="splashPage" src={splashPage} />
    </div>
  );
};

export default Login;