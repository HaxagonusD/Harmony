import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory, Link } from "react-router-dom";
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
        <div className="userProfile">
          <div className="explorePage">
            Looking for new music?
            <Link className="exploreLink" to="/explore">
              Explore other users
            </Link>
          </div>
          <h1 className="userName">{user.displayName}</h1>

          <div id="buttons">
          <button 
            className="subscribeButton"  
            onClick={() => subcribeToThisUser()}>Subscribe</button>
            <button className="logoutButton" onClick={() => logOut()}>Logout</button>
          </div>
          <input
            className="commentBox"
            onChange={getCommentValue}
            placeholder="Comment before the user changes songs..."
          ></input>
          <button className="commentButton" onClick={() => addComment()}>Comment</button>
          {commentsDisplay === undefined ? (
            <div>Loading... </div>
          ) : commentsDisplay !== null ? (
            commentsDisplay.comments.map((current, i) => {
              return (
                <div key={i}>
                  <div className="animated-border-quote">
                    <blockquote>
                      <p>{current.content}</p>
                      <cite><small>~ {current.displayName}</small></cite>
                    </blockquote>
                  </div>
                  {/* <div className="dateCreated">{current.dateCreated}</div>{" "} */}
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
