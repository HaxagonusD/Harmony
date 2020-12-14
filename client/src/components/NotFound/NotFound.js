import React from "react";
import "./styles/NotFound.css";
import girlImage from "./styles/girlmusic.webp";
import {NavLink } from "react-router-dom"
const NotFound = () => {
  return (
    <div className="NotFound">
      <NavLink exact to="/" activeClassName="active">
  
          Home
        </NavLink>
      <div className="message">404! Get out of here!</div>
      <img alt="notfound" src={girlImage} />
    </div>
  );
};

export default NotFound;
