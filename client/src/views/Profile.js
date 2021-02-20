import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUser } from "../features/users/actions";
import { fetchComments } from "../features/comments/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";

function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchLoggedInUser());
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  const loggedInUser = useSelector((state) => state.users.loggedInUser);
  const comments = useSelector((state) => state?.comments?.view?.comments);

  console.log("These are comments", comments);
  console.log("This is the LoggedInUser", loggedInUser);

  const embedSpotifyPlayer =
    loggedInUser !== {} ? (
      <iframe
        title="player"
        src={`https://open.spotify.com/embed/track/${loggedInUser?.currentTrack?.songId}`}
        width="300"
        height="80"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    ) : (
      ""
    );

  const commentsToDisplay =
    comments !== undefined
      ? comments.map((current, index) => {
          return <Comment {...current} key={index} />;
        })
      : "";

  return (
    <div>
      This is a profile component <h1>{loggedInUser.displayName}</h1>
      {embedSpotifyPlayer}
      {commentsToDisplay}
    </div>
  );
}
export default Profile;
