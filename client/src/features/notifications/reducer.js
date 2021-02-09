const initialState = {
  loading: false,
  all: null,
};

const notificationsReducer = (state = initialState, action) => {
  const possibleActions = {};
  const currentAction = possibleActions[action.type];
  return currentAction ? currentAction() : state;
};

export default notificationsReducer;
