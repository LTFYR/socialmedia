import {
  faBookmark,
  faComment,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../../style/comment.css";
import LikeButton from "../../LikeButton";
import CommentInput from "../post_comment/CommentInput";
import Comments from "../post_comment/Comments";
import "../../../style/home.css";
import { dislikePosts, likePosts } from "../../../redux/actions/postAction";

const CommentModal = ({ post, setOpenCommentModal }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.likes.find((p) => p._id === auth.user._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post.likes, auth.user._id]);
  const handleDISSLIKE = async () => {
    console.log("cliked");
    if (likes) return;
    setLikes(true);
    await dispatch(dislikePosts({ post, auth }));
    setLikes(false);
  };

  const handleLike = async () => {
    if (likes) return;
    setLiked(true);
    await dispatch(likePosts({ post, auth }));
    setLikes(false);
  };
  return (
    <>
      <div className="comment-modal-wrapper">
        <div className="comment-modal">
          <div className="post-image">
            {post.postImages.slice(0, 1).map((image) => (
              <img src={image.url} alt="" />
            ))}
          </div>
          <div className="post-content">
            <div className="post-header">
              <div className="left">
                <img src={post.user.avatar} alt="" />
                <Link to={`/profile/${post.user._id}`}>
                  <h6>{post.user.username}</h6>
                </Link>
              </div>
            </div>
            <div className="post-scrollable">
              <div className="post-detail">{post.text}</div>
              <div className="post-comments">
                <Comments post={post} />
              </div>
            </div>
            <div className="post-footer">
              <div className="post-actions">
                <div className="like-comment">
                  <LikeButton
                    liked={liked}
                    handleLike={handleLike}
                    handleDISSLIKE={handleDISSLIKE}
                  />
                  <p>{post.likes.length} likes</p>
                  <Link to={`/post/${post._id}`}>
                    <FontAwesomeIcon icon={faComment} />
                  </Link>
                  <FontAwesomeIcon icon={faShareFromSquare} />
                </div>
                <div className="comment-save">
                  <FontAwesomeIcon icon={faBookmark} />
                </div>
              </div>
            </div>
            <div className="comments">
              <CommentInput post={post} />
            </div>
          </div>
        </div>
        <span
          className="close-comment-modal"
          onClick={() => setOpenCommentModal(false)}
        >
          x
        </span>
      </div>
    </>
  );
};

export default CommentModal;
