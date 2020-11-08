import React from "react";
import { Redirect } from "react-router-dom";
import "../styles/Config/Config.css";
const Config = ({ loggedIn }) => {
  return (
    <div className="Config">
      <div className="logoutButton">
        <a href="http://localhost:5000/auth/spotify/logout">Logout</a>
      </div>

      <div className="logout">
        {loggedIn ? (
          <div>Hello "name goes here"</div>
        ) : (
          <Redirect to="/"></Redirect>
        )}
      </div>

      <div className="CurrentNumbers">All the numbers</div>
      <form className="AddNumber">
        <input placeholder="Number"></input>
        <button>Add Number</button>
      </form>
    </div>
  );
};

export default Config;
