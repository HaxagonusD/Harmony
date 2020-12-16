import React from "react";
import "./styles/NotFound.css";
import girlImage from "./styles/girlmusic.webp";
import {NavLink } from "react-router-dom"
const NotFound = () => {
  return (
    <div className="NotFound">
      <nav className="nav">
        <NavLink exact to="/" id="home">
            Home
        </NavLink>
      </nav>
      <div className="message">
        <h1 style={{color:"#55BA55"}}>404!</h1> 
        <h1>Get out of here!</h1>
      </div>
      <img alt="notfound" src={girlImage} />
    </div>
  );
};

export default NotFound;
