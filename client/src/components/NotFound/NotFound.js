import React from "react";
import "./styles/NotFound.css";
import girlImage from "./styles/girlmusic.webp";
const NotFound = () => {
  return (
    <div className="NotFound">
      <div className="message">404! Get out of here!</div>
      <img alt="notfound" src={girlImage} />
    </div>
  );
};

export default NotFound;
