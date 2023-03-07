import { PROFILE_TYPES } from "../actions/userProfile";
import { editData } from "../actions/controller";

const initalState = {
  id: [],
  loading: false,
  users: [],
  posts: [],
};

const userProfileReducer = (state = initalState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PROFILE_TYPES.USER:
      return {
        ...state,
        users: [...state.users, action.payload.user],
      };
    case PROFILE_TYPES.FOLLOW:
      return {
        ...state,
        users: editData(state.users, action.payload._id, action.payload),
      };
    case PROFILE_TYPES.UNFOLLOW:
      return {
        ...state,
        users: editData(state.users, action.payload._id, action.payload),
      };
    case PROFILE_TYPES.GET_USER_ID:
      return {
        ...state,
        id: [...state.id, action.payload],
      };
    case PROFILE_TYPES.GET_POSTS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    default:
      return state;
  }
};

export default userProfileReducer;
