import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUser } from "../features/users/userReducer";
import { useEffect } from "react";
function Profile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLoggedInUser());
  }, []);
  const { displayName } = useSelector((state) => state.users.loggedInUser);
  return <div>This is a profile component {displayName}</div>;
}
export default Profile;
