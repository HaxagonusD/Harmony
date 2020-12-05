import React from "react";
import { Link } from "react-router-dom";
import "../styles/PersonLink/PersonLink.css";
const PersonLink = ({ user }) => {
  return (
    <div className="personLink">
      <Link to={`profile/${user.id}`}>
        <div className="albumImage">
          <img alt=""></img>
        </div>
        
        <div className="songInfo"></div>
        <div className="userInfo">
          <div>{user.displayName}</div>
        </div>
      </Link>
    </div>
  );
};

export default PersonLink;
