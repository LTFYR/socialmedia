import React, { useEffect, useState } from "react";
import CommentShow from "../comment/CommentShow";

const Comments = ({ post, openCommentModal }) => {
  const [replycomment, setReplycomment] = useState([]);

  useEffect(() => {
    const rep = post.comments.filter((r) => r.reply);
    setReplycomment(rep);
  }, [post.comments]);
  return (
    <div
      style={{ padding: openCommentModal ? "0" : "6px" }}
      className="comments-wrapper"
    >
      {openCommentModal === false
        ? post.comments
            .slice(0, 2)
            .map((comment) => (
              <CommentShow
                key={comment._id}
                comment={comment}
                post={post}
                replycomment={replycomment.filter(
                  (item) => item.reply === comment._id
                )}
              />
            ))
        : post.comments.map((comment) => (
            <CommentShow
              key={comment._id}
              comment={comment}
              post={post}
              replycomment={replycomment.filter(
                (item) => item.reply === comment._id
              )}
            />
          ))}
    </div>
  );
};

export default Comments;
