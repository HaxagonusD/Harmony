import getLoggedInUser from "../../services/HarmonyAPI/getLoggedInUser";
import getFriendsProfileInfo from "../../services/HarmonyAPI/getFriendsProfileInfo";

export const loggedInUserLoaded = (payload) => {
  return {
    type: "users/loggedInUserLoaded",
    payload,
  };
};

export const friendsProfileLoaded = (payload) => {
  return {
    type: "user/friendsProfileLoaded",
    payload,
  };
};

export const fetchLoggedInUser = () => {
  return async (dispatch, getState) => {
    const data = await getLoggedInUser();
    console.log(data);
    dispatch(loggedInUserLoaded(data.data));
  };
};

export const enteredFriendsProfile = (id) => async (dispatch, getState) => {
  const friendProfile = await getFriendsProfileInfo(id);
  dispatch(friendsProfileLoaded(friendProfile));
};
