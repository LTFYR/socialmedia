import { postData } from "../../utils/fetch";
import { GLOBALACTIONS } from "./global";
import validator from "../../utils/validation";

export const login = (action) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALACTIONS.NOTIFY, payload: { loading: true } });
    const result = await postData("login", action);
    console.log(result.data);

    dispatch({
      type: GLOBALACTIONS.AUTH,
      payload: {
        token: result.data.access_token,
        user: result.data.user,
      },
    });
    localStorage.setItem("login", JSON.stringify(result.data.user));

    dispatch({
      type: GLOBALACTIONS.NOTIFY,
      payload: {
        success: result.data.msg,
      },
    });
  } catch (error) {
    dispatch({
      type: GLOBALACTIONS.NOTIFY,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const uuu = JSON.parse(localStorage.getItem("login")) || null;
  console.log(login === true);
  if (uuu) {
    dispatch({ type: GLOBALACTIONS.NOTIFY, payload: { loading: true } });
    try {
      const result = await postData("refresh_token");
      console.log(result);
      dispatch({
        type: GLOBALACTIONS.AUTH,
        payload: {
          token: result.data.access_token,
          user: result.data.user,
        },
      });

      dispatch({ type: GLOBALACTIONS.NOTIFY, payload: {} });
    } catch (error) {
      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  }
};

export const register = (action) => async (dispatch) => {
  try {
    const validate = validator(action);
    if (validate.errorLength > 0) {
      return dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: validate.errorMessage,
      });
    }

    dispatch({ type: GLOBALACTIONS.NOTIFY, payload: { loading: true } });

    const result = await postData("register", action);

    dispatch({
      type: GLOBALACTIONS.AUTH,
      payload: {
        token: result.data.access_token,
        user: result.data.user,
      },
    });
    localStorage.setItem("login", JSON.stringify(result.data.user));

    dispatch({
      type: GLOBALACTIONS.NOTIFY,
      payload: {
        success: result.data.msg,
      },
    });
  } catch (error) {
    dispatch({
      type: GLOBALACTIONS.NOTIFY,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("login");
    await postData("logout");
    window.location.href = "/";
  } catch (error) {
    dispatch({
      type: GLOBALACTIONS.NOTIFY,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};
