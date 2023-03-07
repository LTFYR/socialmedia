import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../style/user.css";

const User = ({ children, user, search }) => {
  console.log(user);
  return (
    <div className="user_container">
      <div className="user">
        <Link to={`/profile/${user?._id}`}>
          <div className="user-detail">
            <img width={50} height="50" src={user?.avatar} alt="" />
            <div className="about">
              <p>{user?.username}</p>
              <small>{user?.fullname}</small>
            </div>
          </div>
        </Link>
        {search && <button>X</button>}
      </div>
      {children}
    </div>
  );
};

export default User;
