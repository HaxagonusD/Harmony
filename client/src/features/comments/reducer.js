function commentsReducer(state = {}, action) {
  switch (action.type) {
    case "comments/commentsLoaded":
      return { ...state, view: action.payload.data };
    default:
      return state;
  }
}
export default commentsReducer;
