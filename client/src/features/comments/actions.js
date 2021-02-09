import getComments from "../../services/HarmonyAPI/getComments";

export const commentsLoaded = (payload) => {
  return {
    type: "comments/commentsLoaded",
    payload,
  };
};

export const fetchComments = (id) => {
  return async (dispatch, getState) => {
    const comments = await getComments(id);
    dispatch(commentsLoaded(comments));
  };
};
