import { faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";

const LikeButton = ({ liked, handleLike, handleDISSLIKE }) => {
  const { theme } = useSelector((state) => state);
  return (
    <>
      {liked ? (
        <FontAwesomeIcon
          className="text-danger"
          icon={faHeart}
          onClick={handleDISSLIKE}
        />
      ) : (
        <FontAwesomeIcon
          className="text-ligth"
          icon={faHeart}
          onClick={handleLike}
        />
      )}
    </>
  );
};

export default LikeButton;
