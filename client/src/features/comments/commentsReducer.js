import getComments from "../../services/HarmonyAPI/getComments";

const commentsLoaded = (payload) => {
  return {
    type: "comments/commentsLoaded",
    payload,
  };
};

const fetchComments = (id) => {
  return async (dispatch, getState) => {
    const comments = await getComments(id);
    dispatch(commentsLoaded(comments));
  };
};
function commentsReducer(state = {}, action) {
  switch (action.type) {
    case "comments/commentsLoaded":
      return { ...state, view: action.payload.data };
    default:
      return state;
  }
}
export { commentsReducer, fetchComments };
