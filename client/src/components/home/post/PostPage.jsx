import { faComment, faHeart, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../../style/post.css";
import { PostDetail } from "./PostDetail";

const PostPage = ({ userPosts, result }) => {
  const [openPostDetail, setOpenPostDetail] = useState(false);

  const { theme, modal } = useSelector((state) => state);
  console.log(modal);

  const dispatch = useDispatch();
  if (result === 0) return <h2 className="text-center">No posts shared</h2>;

  return (
    <div className="user-posts">
      {userPosts.map((post) => (
        <div className="post-detail">
          <Link key={post._id} to={`/post/${post._id}`}>
            <img
              src={post.postImages[0].url}
              alt=""
              style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            />
          </Link>
          <div className="user-post-options">
            <p>
              <FontAwesomeIcon icon={faHeart} /> {post.likes.length}
            </p>
            <p>
              <FontAwesomeIcon icon={faComment} /> {post.comments.length}
            </p>
          </div>
        </div>
      ))}
      {/* {openPostDetail && (
          <PostDetail
            setOpenPostDetail={setOpenPostDetail}
            openPostDetail={openPostDetail}
          />
        )} */}
    </div>
  );
};

export default PostPage;
