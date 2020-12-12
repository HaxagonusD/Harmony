import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import "./styles/Profile.css";

// import "../styles/Config/Config.css";
const Profile = ({ user, comments, getThemComments }) => {
  const { id } = useParams();
  let history = useHistory();
  const [commentsDisplay] = comments;
  const [commentValue, setCommentValue] = useState("Nothing?");

  useEffect(() => {
    getThemComments();
  }, [id]);
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

  const addComment = () => {
    const instance = axios.create({
      withCredentials: true,
    });
    instance
      .post(`/api/comment/${id}`, { commentContent: commentValue })
      .then(({ data }) => {
        console.log(data);
        getThemComments();
      });

    console.log(commentValue);
  };
  const getCommentValue = (event) => {
    setCommentValue(event.target.value);
  };
  return (
    <div className="Profile">
      {user !== undefined ? (
        <div>
          <h1>{user.displayName}</h1>

          <button onClick={() => subcribeToThisUser()}>Subscribe</button>
          <div className="logoutButton">
            <button onClick={() => logOut()}>Logout</button>
          </div>
          <input
            onChange={getCommentValue}
            placeholder="Comment before the user stops listening!"
          ></input>
          <button onClick={() => addComment()}>Comment button</button>
          {commentsDisplay === undefined ? (
            <div>Loading... </div>
          ) : commentsDisplay !== null ? (
            commentsDisplay.comments.map((current, i) => {
              return (
                <div key={i}>
                  {current.dateCreated}- {current.displayName} says:{" "}
                  <p style={{color: "blue"}}>{current.content}</p>
                </div>
              );
            })
          ) : (
            <div>No comments yet!</div>
          )}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Profile;
