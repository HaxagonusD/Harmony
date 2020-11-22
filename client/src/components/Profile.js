import React from "react";

import { Redirect } from "react-router-dom";
import "../styles/Config/Config.css";
const Profile = ({ user, loggedIn }) => {
  return (
    <div>
      <button>Subscribe</button>
      <div className="logoutButton">
        <a href="http://localhost:5000/auth/spotify/logout">Logout</a>
      </div>
      <div className="logout">
        {loggedIn ? "" : <Redirect to="/"></Redirect>}
      </div>

      {user !== undefined ? (
        <div>
          <h1>Name : {user.displayName}</h1>
          <h1>id: {user.id}</h1>
          {/* <p>Number of subscribers: {user.subscribers.length}</p> */}
          <a href={"https://open.spotify.com/track/" + user.currentTrack.songId}>
            CurrentTrack
          </a>
        </div>
      ) : (
        "Loading..."
      )}
      {/* <h1>Name : {user.displayName}</h1> */}
      {/* <h1>id: {user.id}</h1> */}
      {/* <p>{user.subcribers.length === 0 ? "No subscriber": user.subcribers.length}</p> */}
    </div>
  );
};

export default Profile;
