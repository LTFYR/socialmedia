import { GLOBALACTIONS } from "./global";
import { getData } from "../../utils/fetch";

export const SUGGESTION = {
  LOADING: "LOADING_SUGGESTIONS",
  GET_SUGGESTION_USERS: "SUGGESTION_USERS",
};

export const suggestionUsers = (token) => async (dispatch) => {
  try {
    dispatch({ type: SUGGESTION.LOADING, payload: true });

    const res = await getData("suggestions", token);

    dispatch({ type: SUGGESTION.GET_SUGGESTION_USERS, payload: res.data });

    dispatch({ type: SUGGESTION.LOADING, payload: false });
  } catch (error) {
    dispatch({
      type: GLOBALACTIONS.NOTIFY,
      payload: { error: error.response.data.msg },
    });
  }
};
