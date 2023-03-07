import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../style/explore.css";

const Explore = () => {
  const { mainPosts } = useSelector((state) => state);
  return (
    <div className="explore mx-auto">
      {mainPosts.posts.map((post) => (
        <div className="explore-images ">
          {post.postImages.slice(0, 1).map((image) => (
            <Link key={post._id} to={`/post/${post._id}`}>
              <img src={image.url} alt="" />
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Explore;
