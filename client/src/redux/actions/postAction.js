import { GLOBALACTIONS } from "./global";
import { uploadPhoto } from "../../utils/uploadImage";
import { getData, postData, patchData } from "../../utils/fetch";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  POSTLOADING: "POSTLOADING",
  GET_POSTS: "GET_POSTS",
  UPDATEPOST: "UPDATEPOST",
  GET_POST: "GET_POST",
};

export const createNewPost =
  ({ text, postImages, auth }) =>
  async (dispatch) => {
    let media = [];
    try {
      dispatch({ type: GLOBALACTIONS.NOTIFY, payload: { loading: true } });

      if (postImages.length > 0) media = await uploadPhoto(postImages);

      const result = await postData(
        "post",
        { text, postImages: media },
        auth.token
      );

      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...result.data.post, user: auth.user },
      });

      dispatch({ type: GLOBALACTIONS.NOTIFY, payload: { loading: false } });
    } catch (error) {
      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: POST_TYPES.POSTLOADING, payload: true });
    const res = await getData("post", token);

    console.log(res);
    dispatch({ type: POST_TYPES.GET_POSTS, payload: res.data });

    dispatch({ type: POST_TYPES.POSTLOADING, payload: false });
  } catch (error) {
    dispatch({
      type: POST_TYPES.POSTLOADING,
      payload: { error: error.response.data.msg },
    });
  }
};

export const updatePost =
  ({ text, postImages, auth, status }) =>
  async (dispatch) => {
    let media = [];
    const newImg = postImages.filter((image) => !image.url);
    const oldImg = postImages.filter((image) => image.url);

    if (
      status.text === text &&
      newImg.length === 0 &&
      oldImg.length === status.postImages.length
    )
      return;

    try {
      dispatch({ type: GLOBALACTIONS.NOTIFY, payload: { loading: true } });

      if (newImg.length > 0) media = await uploadPhoto(newImg);

      const res = await patchData(
        `post/${status._id}`,
        {
          text,
          postImages: [...oldImg, ...media],
        },
        auth.token
      );

      dispatch({ type: POST_TYPES.UPDATEPOST, payload: res.data.updatedPost });

      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { success: res.data.msg },
      });

      console.log(res.data);
    } catch (error) {
      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const likePosts =
  ({ post, auth }) =>
  async (dispatch) => {
    const likedPost = { ...post, likes: [...post.likes, auth.user] };

    dispatch({ type: POST_TYPES.UPDATEPOST, payload: likedPost });

    try {
      await patchData(`post/${post._id}/like`, null, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const dislikePosts =
  ({ post, auth }) =>
  async (dispatch) => {
    const likedPost = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    };

    dispatch({ type: POST_TYPES.UPDATEPOST, payload: likedPost });

    try {
      await patchData(`post/${post._id}/dislike`, null, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const getUserPost =
  ({ detail, id, auth }) =>
  async (dispatch) => {
    if (detail.every((post) => post._id !== id)) {
      try {
        const res = await getData(`post/${id}`, auth.token);
        dispatch({ type: POST_TYPES.GET_POST, payload: { ...res.data.post } });
      } catch (error) {
        dispatch({
          type: GLOBALACTIONS.NOTIFY,
          payload: { error: error.response.data.msg },
        });
      }
    }
  };

export const savePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const savingUser = { ...auth.user, saved: [...auth.user.saved, post._id] };

    dispatch({
      type: GLOBALACTIONS.AUTH,
      payload: { ...auth, user: savingUser },
    });

    try {
      await patchData(`save/${post._id}`, null, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const removeSavePost =
  ({ post, auth }) =>
  async (dispatch) => {
    const savingUser = {
      ...auth.user,
      saved: auth.user.saved.filter((id) => id !== post._id),
    };

    dispatch({
      type: GLOBALACTIONS.AUTH,
      payload: { ...auth, user: savingUser },
    });
    try {
      await patchData(`unsave/${post._id}`, null, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: error.response.data.msg },
      });
    }
  };
