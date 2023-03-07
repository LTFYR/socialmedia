import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../../redux/actions/commentAction";
import "../../../style/home.css";

const CommentInput = ({ children, post, replyCom, setReplyCom }) => {
  console.log(post);
  const [content, setContent] = useState("");

  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setReplyCom) return setReplyCom(false);
      return;
    }

    setContent("");

    const newcomment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: replyCom && replyCom.commentId,
      tag: replyCom && replyCom.user,
    };

    dispatch(createComment(post, newcomment, auth));
    if (setReplyCom) return setReplyCom(false);
  };
  return (
    <>
      <form className="d-flex comment-post" onSubmit={handleComment}>
        {children}
        <input
          className="comment-input"
          type="text"
          placeholder="Add your comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </>
  );
};

export default CommentInput;
