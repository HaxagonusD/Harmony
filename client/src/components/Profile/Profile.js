import React from "react";
import axios from "axios";
import { Link, useParams, useHistory } from "react-router-dom";

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
      <button onClick={() => subcribeToThisUser()}>Subscribe</button>
      <div className="logoutButton">
        <button onClick={() => logOut()}>Logout</button>
      </div>
      <Link to="/explore">Find more users. Explore Page</Link>
      {user !== undefined ? (
        <div>
          <h1>{user.displayName}</h1>

          {/* <p>Number of subscribers: {user.subscribers.length}</p> */}
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
