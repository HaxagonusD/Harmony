import getLoggedInUser from "../../services/HarmonyAPI/getLoggedInUser";

const loggedInUserLoaded = (payload) => {
  return {
    type: "users/loggedInUserLoaded",
    payload
  };
};

const friendsProfileLoaded = (payload)=>{
  return {
    type: "user/friendsProfileLoaded",
    payload
  }
}

const fetchLoggedInUser = () => {
  return async (dispatch, getState) => {
    const data = await getLoggedInUser();
    console.log(data);
    dispatch(loggedInUserLoaded(data.data));

  };
};

const enteredFriendsProfile = (id) => async (dispatch, getState) => {
  const friendProfile = await getFriendsProfileInfo(id)
  const dispatch(friendsProfileLoaded(friendProfile))
};

const userReducer = (state = { loggedInUser: {} : viewingUser:{}}, action) => {
  switch (action.type) {
    case "users/loggedInUserLoaded":
      return { ...state, loggedInUser: action.payload };
    case "users/friendsProfileLoaded":
      return { ...state, viewingUser: action.payload }
    default:
      return state;
  }
};

export { userReducer, fetchLoggedInUser };
