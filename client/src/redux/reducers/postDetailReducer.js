import { POST_TYPES } from "../actions/postAction";
import { editData } from "../actions/controller";

const postDetailReducer = (state = [], action) => {
  switch (action.type) {
    case POST_TYPES.GET_POST:
      return [...state, action.payload];
    case POST_TYPES.UPDATEPOST:
      return editData(state, action.payload._id, action.payload);
    default:
      return state;
  }
};

export default postDetailReducer;
