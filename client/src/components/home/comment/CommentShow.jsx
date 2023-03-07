import React from "react";
import { CommentCard } from "./CommentCard";

const CommentShow = ({ comment, post, replycomment }) => {
  return (
    <div className="comment-show-wrapper">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div style={{ display: "none" }} className="pl-4">
          {replycomment.map(
            (rep, i) =>
              rep.reply && (
                <CommentCard
                  key={i}
                  post={post}
                  comment={rep}
                  commentId={comment._id}
                />
              )
          )}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentShow;
