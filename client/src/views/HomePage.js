import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLoggedInUser } from "../features/users/userReducer";

const Homepage = () => {
  const dispatch = useDispatch();
  // let history = useHistory();
  // useEffect(() => {
  //   const instance = axios.create({
  //     withCredentials: true,
  //   });
  //   instance
  //     .get(`/auth/isloggedin`)
  //     .then(({ data }) => {
  //       if (data !== null) {
  //         history.push(`profile/${data.id}`);
  //       }
  //     })
  //     .catch((error) => console.error(error));
  //   // console.log(process.env.NODE_ENV)
  // }, [history]);

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
      <a
        className="register"
        href={
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000/auth/spotify"
            : "/auth/spotify"
        }
      >
        Sign up
      </a>
      <button onClick={() => dispatch(fetchLoggedInUser())}>
        Get current User
      </button>

      {/* <a className="login" href="http://localhost:5000/auth/spotify">
        Log in with Spotify
      </a> */}
    </div>
  );
};

export default Homepage;
