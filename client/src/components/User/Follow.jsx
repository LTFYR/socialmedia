import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../../redux/actions/userProfile";
import "../../style/user.css";

const Follow = ({ user }) => {
  const [followUser, setFollowUser] = useState(false);

  const { auth, userProfileReducer } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      auth.user.following.find(
        (followinguser) => followinguser._id === user._id
      )
    ) {
      setFollowUser(true);
    }
  }, [auth.user.following, user._id]);

  const handleFollowUser = () => {
    setFollowUser(true);
    dispatch(follow({ users: userProfileReducer.users, user, auth }));
  };
  const handleUnfollowUser = () => {
    setFollowUser(false);
    dispatch(unfollow({ users: userProfileReducer.users, user, auth }));
  };
  return (
    <>
      {followUser ? (
        <button
          onClick={handleUnfollowUser}
          className="btn btn-info follow-user"
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={handleFollowUser}
          className="btn btn-info unfollow-user"
        >
          Follow
        </button>
      )}
    </>
  );
};

export default Follow;
