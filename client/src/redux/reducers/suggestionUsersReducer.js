import { SUGGESTION } from "../actions/suggestionUsersAction";

const initalState = {
  loading: false,
  users: [],
};

const suggestionUsersReducer = (state = initalState, action) => {
  switch (action.type) {
    case SUGGESTION.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SUGGESTION.GET_SUGGESTION_USERS:
      return {
        ...state,
        users: action.payload.suggestedUsers,
      };
    default:
      return state;
  }
};

export default suggestionUsersReducer;
