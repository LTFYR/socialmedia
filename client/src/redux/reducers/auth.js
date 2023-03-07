import { GLOBALACTIONS } from "../actions/global";

const inititalState = {};

const authReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GLOBALACTIONS.AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
