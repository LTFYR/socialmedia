import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "../../../style/comment.css";
import { useDispatch, useSelector } from "react-redux";
import LikeButton from "../../LikeButton";
import CommentEdit from "./CommentEdit";
import "../../../style/comment.css";
import {
  dislikeComment,
  editComment,
  likeComment,
} from "../../../redux/actions/commentAction";
import CommentInput from "../post_comment/CommentInput";

export const CommentCard = ({ children, comment, post, commentId }) => {
  const [content, setContent] = useState("");
  const [readMore, setreadMore] = useState(false);
  const [edit, setEdit] = useState(false);
  const [liked, setLiked] = useState(false);
  const [loadlikes, setLoadLikes] = useState(false);
  const [replyCom, setReplyCom] = useState(false);

  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);

  useEffect(() => {
    setContent(comment.content);
    setLiked(false);
    setReplyCom(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setLiked(true);
    }
  }, [comment, auth.user._id]);

  const updateComment = () => {
    if (comment.content !== content) {
      dispatch(editComment({ comment, post, content, auth }));
      setEdit(false);
    } else {
      setEdit(false);
    }
  };

  const handleLike = async () => {
    if (loadlikes) return;
    setLiked(true);

    setLoadLikes(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLikes(false);
  };

  const handleDislike = async () => {
    if (loadlikes) return;
    setLiked(false);

    setLoadLikes(true);
    await dispatch(dislikeComment({ comment, post, auth }));
    setLoadLikes(false);
  };

  const handleReplyComment = () => {
    if (replyCom) return setReplyCom(false);
    setReplyCom({ ...comment, commentId });
  };
  console.log(comment);
  return (
    <div className="comment-wrapper d-flex justify-content-between">
      <div
        className={
          comment.reply ? "comment-reply comment-card" : "comment-card"
        }
      >
        <div className="user-detail">
          <Link to={`/profile/${comment.user._id}`} className="d-flex ">
            <img width={20} height="20" src={comment.user.avatar} alt="" />
            <h6>{comment.user.username}</h6>
          </Link>
        </div>
        <div className="comment-content">
          <div className="flex-fill">
            {edit ? (
              <textarea
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            ) : (
              <div>
                {comment.tag && comment.tag._id !== comment.user._id && (
                  <Link
                    style={{ marginRight: "10px", color: "blue" }}
                    to={`/profile/${comment.tag._id}`}
                  >
                    @{comment.tag.username}
                  </Link>
                )}
                <span>
                  {content.length < 50
                    ? content
                    : readMore
                    ? content + " "
                    : content.slice(0, 100) + "..."}
                </span>
              </div>
            )}
            {content.length > 300 && (
              <span className="openText" onClick={() => setreadMore(!readMore)}>
                {readMore ? "Hide comment" : "Read more"}
              </span>
            )}
          </div>
          <div className="comment-actions">
            <small className="text-muted mr-3">
              {moment(comment.createdAt).fromNow()}
            </small>
            <small className="font-weight-bold mr-3">
              {comment.likes.length} <Link to="/">likes</Link>
            </small>
            {edit ? (
              <>
                <small
                  className="font-weight-bold mr-3"
                  onClick={updateComment}
                >
                  update
                </small>
                <small
                  className="font-weight-bold mr-3"
                  onClick={() => setEdit(false)}
                >
                  cancel
                </small>
              </>
            ) : (
              <small
                className="font-weight-bold mr-3"
                onClick={handleReplyComment}
              >
                {replyCom ? "cancel" : "reply"}
              </small>
            )}
          </div>
        </div>
        {replyCom && (
          <CommentInput
            post={post}
            replyCom={replyCom}
            setReplyCom={setReplyCom}
          >
            <Link to={`/profile/${replyCom.user._id}`} className="mr-1">
              @{replyCom.user.username}
            </Link>
          </CommentInput>
        )}
      </div>
      <div className="comment-heart">
        <CommentEdit comment={comment} post={post} setEdit={setEdit} />
        <LikeButton
          liked={liked}
          handleLike={handleLike}
          handleDISSLIKE={handleDislike}
        />
      </div>
      {children}
    </div>
  );
};
