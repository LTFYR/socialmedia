import React from "react";
import { useSelector } from "react-redux";
import PostBody from "./post/PostBody";
import PostFooter from "./post/PostFooter";
import PostHead from "./post/PostHead";
import PostCard from "../PostCard";

const Posts = () => {
  const { mainPosts } = useSelector((state) => state);
  console.log(mainPosts);
  return (
    <div className="posts">
      {mainPosts.posts.map((post) => (
        <div className="post">
          <PostCard key={post._id} post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
