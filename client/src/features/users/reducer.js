const userReducer = (state = { loggedInUser: {}, viewingUser: {} }, action) => {
  switch (action.type) {
    case "users/loggedInUserLoaded":
      return { ...state, loggedInUser: action.payload };
    case "users/friendsProfileLoaded":
      return { ...state, viewingUser: action.payload };
    default:
      return state;
  }
};

export default userReducer;
