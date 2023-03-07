import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostPage from "../home/post/PostPage";

const Posts = ({ userProfileReducer, id, auth, dispatch }) => {
  const [userPosts, setuserPosts] = useState([]);
  const [result, setResult] = useState(9);

  useEffect(() => {
    userProfileReducer.posts.forEach((post) => {
      if (post._id === id) {
        setuserPosts(post.posts);
        setResult(post.result);
      }
    });
  }, [userProfileReducer.posts, id]);

  return <PostPage result={result} userPosts={userPosts} />;
};

export default Posts;
