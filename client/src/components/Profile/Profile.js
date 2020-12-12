import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import "./styles/Profile.css";

// import "../styles/Config/Config.css";
const Profile = ({ user }) => {
  const { id } = useParams();
  let history = useHistory();
  const [commentValue, setCommentValue] = useState("Nothing?");

  useEffect(()=>{
    const instance = axios.create({
      withCredentials: true,
    });
    instance.get(`/api/comment/${id}`).then(({data}) =>{
      console.log(data)
    })
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
          <input
            onChange={getCommentValue}
            placeholder="Comment before the user stops listening!"
          ></input>
          <button onClick={() => subcribeToThisUser()}>Subscribe</button>
          <div className="logoutButton">
            <button onClick={() => logOut()}>Logout</button>
          </div>
          <button onClick={() => addComment()}>Test comment button</button>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Profile;
