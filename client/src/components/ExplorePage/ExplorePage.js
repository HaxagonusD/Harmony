import React, { useEffect, useState } from "react";
import axios from "axios";
import PersonLink from "../PersonLink/PersonLink";
import './styles/ExplorePage.css'
// import "../styles/ExplorePage/ExplorePage.css";
// import Profile from "./Profile";

const ExplorePage = () => {
  const [usersToDisplay, setUsersToDisplay] = useState(undefined); // initially undefined
  //gets from server 
  useEffect(() => {
    axios
      .get("/api/users/explore")
      .then(({ data }) => {
        console.log(data);
        setUsersToDisplay(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return usersToDisplay !== undefined ? (
    <div className="explorePage">
      <div className="title">
        {" "}
        <h1>This is the explore page</h1>
      </div>
      <div className="peopleLinks">
        {usersToDisplay.map((user, index) => {
          return <PersonLink key={index} user={user} />;
        })}
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default ExplorePage;
