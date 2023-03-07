import { getData, patchData } from "../../utils/fetch";
import { GLOBALACTIONS } from "./global";
import { uploadPhoto } from "../../utils/uploadImage";
import { deleteData } from "./controller";

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  USER: "USER_PROFILE",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
  GET_USER_ID: "GET_USER_ID",
  GET_POSTS: "GET_USER_POSTS",
};

export const getOtherUsers =
  ({ id, auth }) =>
  async (dispatch) => {
    dispatch({ type: PROFILE_TYPES.GET_USER_ID, payload: id });
    try {
      dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
      const res = getData(`/user/${id}`, auth.token);

      const userpostsRes = getData(`/user-posts/${id}`, auth.token);

      const users1 = await res;
      const posts = await userpostsRes;

      dispatch({ type: PROFILE_TYPES.USER, payload: users1.data });
      dispatch({
        type: PROFILE_TYPES.GET_POSTS,
        payload: { ...posts.data, _id: id, page: 2 },
      });

      dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
    } catch (error) {
      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const updateUserInfo =
  ({ userData, avatar, auth }) =>
  async (dispatch) => {
    if (!userData.fullname)
      return dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: "Add your fullname" },
      });
    if (!userData.fullname.length > 25)
      return dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: "Max 25 characters allowed for fullname" },
      });
    if (!userData.about.length > 160)
      return dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: "Max 160 characters allowed for about" },
      });

    try {
      let photo;
      dispatch({ type: GLOBALACTIONS.NOTIFY, payload: { loading: true } });

      if (avatar) photo = await uploadPhoto([avatar]);

      const res = await patchData(
        "user",
        {
          ...userData,
          avatar: avatar ? photo[0].url : auth.user.avatar,
        },
        auth.token
      );
      console.log(res);

      dispatch({
        type: GLOBALACTIONS.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? photo[0].url : auth.user.avatar,
          },
        },
      });

      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { success: res.data.msg },
      });
    } catch (error) {
      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const follow =
  ({ users, user, auth }) =>
  async (dispatch) => {
    let followdUser;
    if (users.every((i) => i._id !== user._id)) {
      followdUser = { ...user, followers: [...user.followers, auth.user] };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          followdUser = { ...item, followers: [...item.followers, auth.user] };
        }
      });
    }

    dispatch({
      type: PROFILE_TYPES.FOLLOW,
      payload: followdUser,
    });

    dispatch({
      type: GLOBALACTIONS.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: [...auth.user.following, followdUser],
        },
      },
    });

    try {
      await patchData(`user/${user._id}/follow`, null, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const unfollow =
  ({ users, user, auth }) =>
  async (dispatch) => {
    let followdUser;
    if (users.every((i) => i._id !== user._id)) {
      followdUser = {
        ...user,
        followers: deleteData(user.followers, auth.user._id),
      };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          followdUser = {
            ...item,
            followers: deleteData(item.followers, auth.user._id),
          };
        }
      });
    }

    dispatch({
      type: PROFILE_TYPES.UNFOLLOW,
      payload: followdUser,
    });

    dispatch({
      type: GLOBALACTIONS.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: deleteData(auth.user.following, followdUser._id),
        },
      },
    });

    try {
      await patchData(`user/${user._id}/unfollow`, null, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: error.response.data.msg },
      });
    }
  };
