import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "../styles/CurrentTrack/CurrentTrack.css";
import Pusher from "pusher-js";
const CurrentTrack = () => {
  const [currentTrack, setCurrentTrack] = useState({ loggedIn: true });
  // const urlParams = new URLSearchParams(window.location.search);
  // //TODO can you do this without state? Why is it refreshing when useState only happens once?
  // const [isUserAuthorized, setIsUserAuthorized] = useState(
  //   urlParams.has("authorized") ? true : false
  // );
  const getCurrentTrack= async ()=>{
    const instance = axios.create({
      withCredentials: true,
    });
    // instance.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    await instance
      .get("http://localhost:5000/api/spotify/currenttrack")
      .then((data) => {
        console.log(data.data);

        setCurrentTrack(data.data);
      })
      .catch((error) => console.error(error));
  }
  Pusher.logToConsole = true;

  const pusher = new Pusher("5971b97df17e11f9f985", {
    cluster: "mt1",
  });

  const channel = pusher.subscribe("my-channel");
  channel.bind("my-event", function () {
    getCurrentTrack()
  });


  
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
        {currentTrack.album ? (
          <div className="listeningTo">You are listening to</div>
        ) : (
          ""
        )}
        <h1>
          {currentTrack ? (
            <div className="info">
              {currentTrack.album ? (
                <img
                  src={
                    currentTrack.album ? currentTrack.album.images[1].url : ""
                  }
                  alt=""
                ></img>
              ) : (
                ""
              )}
              <div className="name">{currentTrack.name}</div>
              <div className="artist">
                {currentTrack.artists ? currentTrack.artists[0].name : ""}
              </div>
            </div>
          ) : (
            "currenttrack is undefined"
          )}
        </h1>
      </div>
      <div className="logout">
        {currentTrack.loggedIn ? (
          <div className="name">Hello</div>
        ) : (
          <Redirect to="/"></Redirect>
        )}
        <a href="http://localhost:5000/auth/spotify/logout">
          Logout of Spotify
        </a>
      </div>

      {/* <a href="http://localhost:5000/api/spotify/currenttrack">Do it again</a> */}
    </div>
  );
};

export default CurrentTrack;
