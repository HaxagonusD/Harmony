import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import Profile from "./Profile";

const ExplorePage = () => {
  const [usersToDisplay, setUsersToDisplay] = useState(undefined);
  useEffect(() => {
    axios
      .get("/api/users/explore")
      .then(({ data }) => {
        setUsersToDisplay(data)
      })
      .catch((error) => console.error(error));
  }, []);
  return usersToDisplay !== undefined ? (
    <div>
      <h1>Here is the Explore Page</h1>
      {usersToDisplay.map((user) => {
        return (
          <Link to={`profile/${user.id}`}>
            <div>{user.displayName}</div>
            <div>{user.id}</div>
          </Link>
        );
      })}
    </div>
  ) : (
    <h1>Here is the Explore Page</h1>
  );
};

export default ExplorePage;
