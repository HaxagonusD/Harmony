/**
 * TODO: Make it so that /profile is the default route
 *  *
 */

import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import Profile from "../Profile/Profile";
// import { Redirect } from "react-router-dom";
import "./styles/Dashboard.css";

//components

const CurrentTrack = () => {
  const [user, setUser] = useState(undefined);
  let { id } = useParams();
  let history = useHistory();
  // const urlParams = new URLSearchParams(window.location.search);
  // //TODO can you do this without state? Why is it refreshing when useState only happens once?
  // const [isUserAuthorized, setIsUserAuthorized] = useState(
  //   urlParams.has("authorized") ? true : false
  // );
  const getUser = useRef();
  getUser.current = () => {
    const instance = axios.create({
      withCredentials: true,
    });
    // instance.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    instance
      .get(`/api/users/${id}`)
      .then(({ data }) => {
        if (data === null) {
          console.log("data is null");
          history.push("/404");
        } else {
          // console.log(data);
          setUser(data);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    //learn more about subscriotopns and memory leaks
    const updateUserInterval = setInterval(() => {
      getUser.current();
    }, 2000);
    return () => {
      clearInterval(updateUserInterval);
    };
  }, []);

  return (
    <div className="CurrentTrack">
      {/* {isUserAuthorized ? (
        <div>
          {" "}
          You are listening
          <h1>{currentTrack}</h1>
        </div>
      ) : (
        <a href="http://localhost:5000/login">Connect your Spotify account</a>
      )} */}

      <div className="currentlyPlaying">
        {/* {user ? <div className="listeningTo">You are listening to</div> : ""} */}

        {user ? (
          <a
            href={"https://open.spotify.com/track/" + user.currentTrack.songId}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div
              className="info"
              style={{
                background: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(${user.currentTrack.imgLink[0]})`,
              }}
            >
              {/* backgroundImage:`url(${user.currentTrack.imgLink[0]})` */}
              {/* <img
                className="albumImage"
                src={}
                alt="Some alternate text"
              ></img> */}
              <div className="artist">{user.currentTrack.artistName}</div>
              <div className="name">{user.currentTrack.songName}</div>
            </div>
          </a>
        ) : (
          "Not listening to anything on spotify"
        )}
      </div>
      <Profile user={user} loggedIn={user ? true : true} />
    </div>
  );
};

export default CurrentTrack;
