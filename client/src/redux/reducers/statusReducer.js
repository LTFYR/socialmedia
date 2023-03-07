import { GLOBALACTIONS } from "../actions/global";

const statusReducer = (state = false, action) => {
  switch (action.type) {
    case GLOBALACTIONS.STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default statusReducer;
