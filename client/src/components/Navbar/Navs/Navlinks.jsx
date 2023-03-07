import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faCompass,
  faHamburger,
  faUser,
  faHeart,
  faHome,
  faMessage,
  faSearch,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UserImage from "../../UserImage";
import SearchUsers from "./SearchUsers";

const Navlinks = ({ setOpenSearch, openSearch }) => {
  const { path } = useLocation();
  const login = localStorage.getItem("login");
  const { auth } = useSelector((state) => state);

  const isActive = (pathname) => {
    if (pathname === path) return "active";
  };
  return (
    <>
      <Link to="/" className="content">
        <FontAwesomeIcon className="icon" icon={faHome} />
        <h4 className={`${isActive}`}>Home</h4>
      </Link>
      <Link
        onClick={() => setOpenSearch(!openSearch)}
        to={login ? "search" : "login"}
        className="content"
      >
        <FontAwesomeIcon className="icon" icon={faSearch} />
        <h4>Search</h4>
      </Link>
      <Link to={login ? "explore" : "login"} className="content">
        <FontAwesomeIcon className="icon" icon={faCompass} />
        <h4>Explore</h4>
      </Link>
      <Link to={login ? "reel" : "login"} className="content video">
        <FontAwesomeIcon className="icon" icon={faVideo} />
        <h4>Reels</h4>
      </Link>
      <Link to={login ? "message" : "login"} className="content">
        <FontAwesomeIcon className="icon" icon={faMessage} />
        <h4>Messages</h4>
      </Link>
      <Link to={login ? "notification" : "login"} className="content">
        <FontAwesomeIcon className="icon" icon={faHeart} />
        <h4>Notifications</h4>
      </Link>
      <Link to={login ? "add" : "login"} className="content add">
        <FontAwesomeIcon className="icon" icon={faAdd} />
        <h4>Create</h4>
      </Link>

      <div className="content">
        {auth.token ? (
          <Link className="profile" to={`/profile/${auth.user._id}`}>
            <UserImage image={auth.user.avatar} />
          </Link>
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
        {auth.token ? (
          <Link to={`/profile/${auth.user._id}`}>{auth.user.fullname}</Link>
        ) : (
          <Link to={`/profile}`}>Profile</Link>
        )}
      </div>
      {openSearch && (
        <SearchUsers openSearch={openSearch} setOpenSearch={setOpenSearch} />
      )}
    </>
  );
};

export default Navlinks;
