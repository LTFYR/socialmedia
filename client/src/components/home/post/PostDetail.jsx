import {
  faBookmark,
  faComment,
  faShareFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LikeButton from "../../LikeButton";
import CommentInput from "../post_comment/CommentInput";
import Comments from "../post_comment/Comments";

export const PostDetail = ({ post }) => {
  const [openModal, setOpenModal] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSinglePost = () => {
    setOpenModal(false);
    navigate(`/profile/${post.user._id}`);
  };
  return (
    openModal && (
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
                  // liked={liked}
                  // handleLike={handleLike}
                  // handleDISSLIKE={handleDISSLIKE}
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
              <CommentInput />
            </div>
          </div>
        </div>
        <span className="close-comment-modal" onClick={handleSinglePost}>
          x
        </span>
      </div>
    )
  );
};
