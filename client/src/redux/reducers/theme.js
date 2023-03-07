import { GLOBALACTIONS } from "../actions/global";

const inititalState = false;

const themeReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GLOBALACTIONS.THEME:
      return action.payload;
    default:
      return state;
  }
};

export default themeReducer;
