import axios from "axios";
import React, { useEffect, useState } from "react";
const CurrentTrack = () => {
  const [currentTrack, setCurrentTrack] = useState(undefined);
  const urlParams = new URLSearchParams(window.location.search);
  //TODO can you do this without state? Why is it refreshing when useState only happens once?
  const [isUserAuthorized, setIsUserAuthorized] = useState(
    urlParams.has("authorized") ? true : false
  );
  // useEffect(() => {
  //   if (isUserAuthorized) {
  //     axios
  //       .get("http://localhost:5000//api/spotify/currenttrack")
  //       .then((data) => {
  //         setCurrentTrack(data.data);
  //       })
  //       .catch((error) => console.error(error));
  //   }
  // }, [isUserAuthorized]);
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
      <a href="http://localhost:5000/auth/spotify/logout">Logout of Spotify</a>
      <div>
       
        You are listening
        <h1>{currentTrack}</h1>
      </div>
    </div>
  );
};

export default CurrentTrack;
