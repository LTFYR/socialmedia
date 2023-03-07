import {
  faBookmark,
  faComment,
  faHeart,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ImageCarousel from "../../ImageCarousel";
import user from "../../../images/profile.jpg";
import { Link } from "react-router-dom";
import LikeButton from "../../LikeButton";
import { useDispatch, useSelector } from "react-redux";
import {
  dislikePosts,
  likePosts,
  removeSavePost,
  savePost,
} from "../../../redux/actions/postAction";

const PostBody = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(false);
  const [flag, setFlag] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.likes.find((p) => p._id === auth.user._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post.likes, auth.user._id]);
  const handleDISSLIKE = async () => {
    console.log("cliked");
    if (likes) return;
    setLikes(true);
    await dispatch(dislikePosts({ post, auth }));
    setLikes(false);
  };

  const handleLike = async () => {
    if (likes) return;
    setLiked(true);
    await dispatch(likePosts({ post, auth }));
    setLikes(false);
  };

  useEffect(() => {
    if (auth.user.saved.find((s) => s === post._id)) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [auth.user.saved, post._id]);

  return (
    <div className="post-body">
      <div className="post-image">
        {post.postImages.length > 0 && (
          <ImageCarousel images={post.postImages} id={post._id} />
        )}
      </div>
      <div className="actions">
        <div className="post-action">
          <div className="like">
            <LikeButton
              liked={liked}
              handleLike={handleLike}
              handleDISSLIKE={handleDISSLIKE}
            />
            <p>{post.likes.length} likes</p>
            <Link to={`/post/${post._id}`}>
              <FontAwesomeIcon icon={faComment} />
            </Link>
            <FontAwesomeIcon icon={faShareFromSquare} />
          </div>
          <div className="save">
            {flag ? (
              <FontAwesomeIcon
                icon={faFlag}
                onClick={() => dispatch(removeSavePost({ post, auth }))}
              />
            ) : (
              <FontAwesomeIcon
                icon={faBookmark}
                onClick={() => dispatch(savePost({ post, auth }))}
              />
            )}
          </div>
        </div>
        <div className="liked-by">
          {post.likes.length === 0 ? (
            <p>No one liked this post</p>
          ) : (
            <>
              {post.likes.slice(0.2).map((like) => (
                <img src={like.avatar} alt="" />
              ))}
              <span>
                Liked by{" "}
                <Link to={`/profile/${post.user._id}`}>
                  {post.likes.map((like) => like.username)}
                </Link>{" "}
                and <p>{post.likes.length - 1} others</p>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostBody;
