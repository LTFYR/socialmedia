import { combineReducers } from "redux";
import auth from "../reducers/auth";
import notfication from "../reducers/notification";
import theme from "../reducers/theme";
import userProfileReducer from "./userProfileReducer";
import status from "./statusReducer";
import mainPosts from "./postReducer";
import modal from "./modalReducer";
import detail from "../reducers/postDetailReducer";
import suggestions from "./suggestionUsersReducer";

export default combineReducers({
  auth,
  notfication,
  theme,
  userProfileReducer,
  status,
  mainPosts,
  modal,
  detail,
  suggestions,
});
