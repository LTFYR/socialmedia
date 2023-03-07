import { GLOBALACTIONS } from "../actions/global";

const inititalState = {};

const notificationReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GLOBALACTIONS.NOTIFY:
      return action.payload;
    default:
      return state;
  }
};

export default notificationReducer;
