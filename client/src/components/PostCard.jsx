import React from "react";
import PostBody from "./home/post/PostBody";
import PostFooter from "./home/post/PostFooter";
import PostHead from "./home/post/PostHead";

const PostCard = ({ post }) => {
  console.log(post);
  return (
    <div className="post-card">
      <PostHead post={post} />
      <PostBody post={post} />
      <PostFooter post={post} />
    </div>
  );
};

export default PostCard;
