import { getComments } from "../../services/HarmonyAPI/"

const commentsLoaded = (payload) => {
  return {
    type: "comments/commentsLoaded",
    payload,
  };
};

const fetchComments = (id)=> async (dispatch, getState)=>{
  const comments = await getComments(id);
  
  dispatch(commentsLoaded(comments))

}
  


function commentsReducer(state = {}, action) {
  switch (action.type) {
    case "comments/commentsLoaded":
      return {...state, action.payload }
    default:
      return state;
  }
}
export { commentsReducer };
