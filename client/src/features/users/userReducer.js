import getLoggedInUser from "../../services/HarmonyAPI/getLoggedInUser";

const loggedInUserLoaded = (payload) => {
  return {
    type: "users/loggedInUserLoaded",
    payload,
  };
};

const fetchLoggedInUser = () => {
  return async (dispatch, getState) => {
    const data = await getLoggedInUser();
    console.log(data);
    dispatch(loggedInUserLoaded(data.data));
  };
};

const userReducer = (state = { loggedInUser: {} }, action) => {
  switch (action.type) {
    case "users/loggedInUserLoaded":
      return { ...state, loggedInUser: action.payload };
    default:
      return state;
  }
};

export { userReducer, fetchLoggedInUser };
