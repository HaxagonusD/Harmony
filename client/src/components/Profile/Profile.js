import React from "react";
import axios from "axios";
import {  useParams, useHistory } from "react-router-dom";
import "./styles/Profile.css"

// import "../styles/Config/Config.css";
const Profile = ({ user }) => {
  const { id } = useParams();
  let history = useHistory();

  const subcribeToThisUser = () => {
    //send a request with the id of the user in the url

    const instance = axios.create({
      withCredentials: true,
    });
    instance
      .post(`/api/subscribe/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };
  const logOut = () => {
    const instance = axios.create({
      withCredentials: true,
    });
    instance
      .get(`/auth/logout`)
      .then(() => {
        history.push("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="Profile">
      
      {user !== undefined ? (
        <div>
          <h1>{user.displayName}</h1>
        </div>
      ) : (
        "Loading..."
      )}
      <button onClick={() => subcribeToThisUser()}>Subscribe</button>
      <div className="logoutButton">
        <button onClick={() => logOut()}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
