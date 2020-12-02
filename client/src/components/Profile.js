import React from "react";
import axios from "axios";
import { Redirect, useParams } from "react-router-dom";
import "../styles/Config/Config.css";
const Profile = ({ user, loggedIn }) => {
  const { id } = useParams();
  
  const subcribeToThisUser = () => {
    //send a request with the id of the user in the url
    
    const instance = axios.create({
      withCredentials: true,
    });
    instance
      .post(`http://localhost:5000/api/subscribe/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <button onClick={() => subcribeToThisUser()}>Subscribe</button>
      <div className="logoutButton">
        <a href="http://localhost:5000/auth/logout">Logout</a>
      </div>
      <div className="logout">
        {loggedIn ? "" : <Redirect to="/"></Redirect>}
      </div>

      {user !== undefined ? (
        <div>
          <h1>Name : {user.displayName}</h1>
          <h1>id: {user.id}</h1>
          {/* <p>Number of subscribers: {user.subscribers.length}</p> */}
          <a
            href={"https://open.spotify.com/track/" + user.currentTrack.songId}
          >
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
