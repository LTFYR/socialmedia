import { POST_TYPES } from "../actions/postAction";
import { editData } from "../actions/controller";

const inititalState = {
  loading: false,
  posts: [],
  result: 0,
  page: 2,
};

const postReducer = (state = inititalState, action) => {
  switch (action.type) {
    case POST_TYPES.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case POST_TYPES.POSTLOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case POST_TYPES.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.res,
      };
    case POST_TYPES.UPDATEPOST:
      return {
        ...state,
        posts: editData(state.posts, action.payload._id, action.payload),
      };
    default:
      return state;
  }
};

export default postReducer;
