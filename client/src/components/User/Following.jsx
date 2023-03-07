import React from "react";
import User from "../User";
import Follow from "./Follow";
import { useSelector } from "react-redux";

const Following = ({ z, setFollowing }) => {
  const { auth } = useSelector((state) => state);
  const test = z.map((user) => user);
  console.log(test);
  return (
    <div className="follow-wrapper">
      <div className="followers">
        <h6>Following</h6>
        <div className="follower">
          {z.map((user) => (
            <User
              className="change-user"
              key={user._id}
              user={user}
              setFollowing={setFollowing}
            >
              {auth.user._id !== user._id && <Follow user={user} />}
            </User>
          ))}
          <div className="close-following">
            <p onClick={() => setFollowing(false)}>x</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Following;
