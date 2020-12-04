/**
 * TODO: Make it so that /profile is the default route
 *  *
 */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Profile from "./Profile";
// import { Redirect } from "react-router-dom";
import "../styles/CurrentTrack/CurrentTrack.css";
// import Pusher from "pusher-js";

//components

const CurrentTrack = () => {
  const [user, setUser] = useState(undefined);
  let { id } = useParams();

  // const urlParams = new URLSearchParams(window.location.search);
  // //TODO can you do this without state? Why is it refreshing when useState only happens once?
  // const [isUserAuthorized, setIsUserAuthorized] = useState(
  //   urlParams.has("authorized") ? true : false
  // );
  const getUser = () => {
    const instance = axios.create({
      withCredentials: true,
    });
    // instance.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    instance
      .get(`/api/users/${id}`)
      .then((data) => {
        console.log(data.data);

        setUser(data.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    //learn more about subscriotopns and memory leaks
    const updateUserInterval = setInterval(() => {
      getUser();
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
      <Link to="/explore">Find more users. Explore Page</Link>
        {user ? <div className="listeningTo">You are listening to</div> : ""}
        <h1>
          {user ? (
            <div className="info">
              {user ? <img src={user.currentTrack.imgLink} alt=""></img> : ""}
              <div className="name">{user.currentTrack.songName}</div>
              <div className="artist">{user.currentTrack.artistName}</div>
            </div>
          ) : (
            "Not listening to anything on spotify"
          )}
        </h1>
      </div>
      <Profile user={user} loggedIn={user ? true : true} />
    </div>
  );
};

export default CurrentTrack;
