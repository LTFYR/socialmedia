import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faCircle,
  faCircleExclamation,
  faCircleInfo,
  faClock,
  faCompass,
  faEdit,
  faFlag,
  faHamburger,
  faHeart,
  faHome,
  faKey,
  faMessage,
  faMoon,
  faSearch,
  faServer,
  faTimesCircle,
  faUser,
  faUserEdit,
  faUserTag,
  faVideo,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import "../../style/Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { Link, useLocation } from "react-router-dom";
import { GLOBALACTIONS } from "../../redux/actions/global";
import UserImage from "../UserImage";
import Navlinks from "./Navs/Navlinks";

const Left = () => {
  const [open, setopen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { auth, theme } = useSelector((state) => state);

  const dispatch = useDispatch();
  const { path } = useLocation();

  const links = [
    {
      label: "Home",
      icon: "faHome",
      path: "/",
    },
    {
      label: "Search",
      icon: "faSearch",
      path: "",
    },
    {
      label: "Explore",
      icon: "faCompass",
      path: "/explore",
    },
    {
      label: "Reels",
      icon: "faVideo",
      path: "/reels",
    },
    {
      label: "Messages",
      icon: "faMessage",
      path: "/message",
    },
    {
      label: "Notifications",
      icon: "faHeart",
      path: "/notification",
    },
    {
      label: "Create",
      icon: "faAdd",
      path: "",
    },
    {
      label: "Logout",
      path: "",
    },
  ];
  return (
    <div className="left-navbar">
      <div className="title">
        <Link to="/">
          <FontAwesomeIcon icon={faUserEdit} className="mobile-edit" />
        </Link>
        {openSearch ? (
          <img
            width={20}
            height="20"
            style={{ marginTop: "30px", cursor: "pointer" }}
            onClick={() => window.scrollTo({ top: 0 })}
            src="/Instagram_icon.png"
            alt=""
          />
        ) : (
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => window.scrollTo({ top: 0 })}
          >
            Instabook
          </h2>
        )}
        <Link to="/">
          <FontAwesomeIcon icon={faMessage} className="mobile-edit" />
        </Link>
      </div>
      <div className="navlinks">
        <Navlinks openSearch={openSearch} setOpenSearch={setOpenSearch} />
      </div>
      {open && (
        <div className="more-overlay">
          <div className="content">
            <Link className="overlay" to="">
              <h4>Settings</h4>
            </Link>
            <FontAwesomeIcon icon={faCircleExclamation} />
          </div>
          <div className="content">
            <Link className="overlay" to="">
              <h4>Saved</h4>
            </Link>
            <FontAwesomeIcon icon={faFlag} />
          </div>
          <div className="content">
            <h4>
              <label
                htmlFor="theme"
                onClick={() =>
                  dispatch({ type: GLOBALACTIONS.THEME, payload: !theme })
                }
              >
                Switch apperance({theme ? "Light" : "Dark"})
              </label>
            </h4>
            <FontAwesomeIcon icon={faMoon} />
          </div>
          <div className="content">
            <Link className="overlay" to="">
              <h4>Your activity</h4>
            </Link>
            <FontAwesomeIcon icon={faClock} />
          </div>
          <div className="content">
            <Link className="overlay" to="">
              <h4>Report a problem</h4>
            </Link>
            <FontAwesomeIcon icon={faWarning} />
          </div>
          <div className="content">
            <Link className="overlay" to="/login">
              <h4>Switch Accounts</h4>
            </Link>
            <FontAwesomeIcon icon={faEdit} />
          </div>
          <div className="content">
            <Link className="overlay" to="" onClick={() => dispatch(logout())}>
              <h4>Logout</h4>
            </Link>
          </div>
        </div>
      )}
      <div className="more" onClick={() => setopen(!open)}>
        <FontAwesomeIcon icon={faServer} />
        <h4>More</h4>
      </div>
    </div>
  );
};

export default Left;
