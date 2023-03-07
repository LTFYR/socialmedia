import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPost } from "../../redux/actions/postAction";
import Loading from "../../images/loading-gif.gif";
import PostPage from "../../components/home/post/PostPage";
import { PostDetail } from "../../components/home/post/PostDetail";
import PostCard from "../../components/PostCard";

const Post = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const { auth, detail } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPost({ detail, id, auth }));
    console.log(detail);

    if (detail.length > 0) {
      const arr = detail.filter((newpost) => newpost._id === id);
      //   console.log([...arr]);
      setPosts(arr);
    }
  }, [detail, id, dispatch, auth]);
  return (
    <div className="single-post">
      {posts.length === 0 && (
        <img src={Loading} alt="" className="d-block mx-auto my-4" />
      )}
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Post;
