import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileBeam } from "@fortawesome/free-regular-svg-icons";
import CommentInput from "../post_comment/CommentInput";
import Comments from "../post_comment/Comments";
import "../../../style/home.css";
import CommentModal from "../comment/CommentModal";

const PostFooter = ({ post }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [openText, setOpenText] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  return (
    <>
      <div
        style={{ height: `${!showEmoji} ? '460px' : 'auto'` }}
        className="post-footer"
      >
        <div className="post-details">
          <span>
            {post.text.length < 60
              ? post.text
              : openText
              ? post.text + " "
              : post.text.slice(0, 60) + "..."}
          </span>
          {post.text.length > 60 && (
            <span onClick={() => setOpenText(!openText)}>
              {openText ? "Hide content" : " Read more"}
            </span>
          )}
        </div>
        <div className="comments">
          <CommentInput post={post} />
          {post.comments.length > 2 && (
            <small
              className="text-muted"
              onClick={() => setOpenCommentModal(true)}
            >
              View all {post.comments.length} comments
            </small>
          )}
          <Comments openCommentModal={openCommentModal} post={post} />
          {/* <FontAwesomeIcon
            icon={faSmileBeam}
            onClick={() => setShowEmoji(!showEmoji)}
          /> */}
        </div>
      </div>

      {showEmoji && <EmojiPicker />}
      {openCommentModal &&
        post.comments.map((comment) => (
          <CommentModal
            openCommentModal={openCommentModal}
            setOpenCommentModal={setOpenCommentModal}
            post={post}
            comment={comment}
          />
        ))}
    </>
  );
};

export default PostFooter;
