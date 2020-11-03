import axios from "axios";
import React, { useEffect, useState } from "react";
const CurrentTrack = () => {
  const [currentTrack, setCurrentTrack] = useState(undefined);
  const urlParams = new URLSearchParams(window.location.search);
  const [isUserAuthorized, setIsUserAuthorized] = useState(
    urlParams.has("authorized") ? true : false
  );
  useEffect(() => {
    if (isUserAuthorized) {
      axios
        .get("http://localhost:5000/history")
        .then((data) => {
          setCurrentTrack(data.data);
        })
        .catch((error) => console.error(error));
    }
  }, [isUserAuthorized]);
  return (
    <div className="CurrentTrack">
      {isUserAuthorized ? (
        ""
      ) : (
        <a href="http://localhost:5000/login">Connect your Spotify account</a>
      )}
      You are listening to <h1>{currentTrack}</h1>
    </div>
  );
};

export default CurrentTrack;
