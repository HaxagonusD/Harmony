import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUser } from "../features/users/userReducer";
import { useEffect } from "react";
function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoggedInUser());
  }, []);

  const loggedInUser = useSelector((state) => state.users.loggedInUser);

  console.log("In profile", loggedInUser);

  const embedSpotifyPlayer =
    loggedInUser !== {} ? (
      <iframe
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

  return (
    <div>
      This is a profile component <h1>{loggedInUser.displayName}</h1>
      {embedSpotifyPlayer}
    </div>
  );
}
export default Profile;
