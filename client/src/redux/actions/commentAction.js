import { patchData, postData, deleteDataAPI } from "../../utils/fetch";
import { GLOBALACTIONS } from "./global";
import { POST_TYPES } from "./postAction";
import { editData, deleteData } from "../actions/controller";

export const createComment = (post, newcomment, auth) => async (dispatch) => {
  const updatedPost = { ...post, comments: [...post.comments, newcomment] };

  dispatch({ type: POST_TYPES.UPDATEPOST, payload: updatedPost });
  try {
    const commentData = {
      ...newcomment,
      postId: post._id,
      postUser: post.user._id,
    };

    const res = await postData("comment", commentData, auth.token);
    console.log(res);
  } catch (error) {
    dispatch({
      type: GLOBALACTIONS.NOTIFY,
      payload: { error: error.response.data.msg },
    });
  }
};

export const editComment =
  ({ post, comment, content, auth }) =>
  async (dispatch) => {
    const updatedComments = editData(post.comments, comment._id, {
      ...comment,
      content,
    });
    const newPost = { ...post, comments: updatedComments };

    dispatch({ type: POST_TYPES.UPDATEPOST, payload: newPost });

    try {
      patchData(`comment/${comment._id}`, { content }, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const dislikeComment =
  ({ post, comment, auth }) =>
  async (dispatch) => {
    const updatedComm = {
      ...comment,
      likes: deleteData(comment.likes, auth.user._id),
    };

    const upcomment = editData(post.comments, comment._id, updatedComm);

    const updatedPostComment = { ...post, comments: upcomment };

    dispatch({ type: POST_TYPES.UPDATEPOST, payload: updatedPostComment });

    try {
      await patchData(`comment/${comment._id}/dislike`, null, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const likeComment =
  ({ post, comment, auth }) =>
  async (dispatch) => {
    const updatedComm = { ...comment, likes: [...comment.likes, auth.user] };

    const upcomment = editData(post.comments, comment._id, updatedComm);

    const updatedPostComment = { ...post, comments: upcomment };

    dispatch({ type: POST_TYPES.UPDATEPOST, payload: updatedPostComment });

    try {
      await patchData(`comment/${comment._id}/like`, null, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const deleteComment =
  ({ post, auth, comment }) =>
  async (dispatch) => {
    const deletedComments = [
      ...post.comments.filter((c) => c.replay === comment._id),
      comment,
    ];

    const updatedPost = {
      ...post,
      comments: post.comments.filter(
        (c) => !deletedComments.find((fcomments) => c._id === fcomments._id)
      ),
    };

    dispatch({ type: POST_TYPES.UPDATEPOST, payload: updatedPost });

    try {
      deletedComments.forEach((dc) => {
        deleteDataAPI(`comment/${dc._id}`, auth.token);
      });
    } catch (error) {
      dispatch({
        type: GLOBALACTIONS.NOTIFY,
        payload: { error: error.response.data.msg },
      });
    }
  };
