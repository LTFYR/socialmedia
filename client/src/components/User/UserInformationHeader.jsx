import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Follow from "./Follow";
import Followers from "./Followers";
import Following from "./Following";
import UpdateProfile from "./UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import "../../style/Navbar.css";
import { Link } from "react-router-dom";

const UserInformationHeader = ({ id, auth, dispatch, userProfileReducer }) => {
  const [authUser, setAuthUser] = useState([]);
  const [followers, setFollowers] = useState(false);
  const [following, setFollowing] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openSuggestions, setopenSuggestions] = useState(false);

  const { suggestions } = useSelector((state) => state);
  useEffect(() => {
    if (id === auth.user._id) {
      setAuthUser([auth.user]);
    } else {
      const allUsers = userProfileReducer.users.filter((s) => s._id === id);
      setAuthUser(allUsers);
    }
  }, [id, auth, dispatch, userProfileReducer.users]);

  return (
    <>
      <div className="user-info-header">
        {authUser.map((user) => (
          <>
            <div className="image">
              <img src={user.avatar} alt="" />
              <p>{user.email}</p>
            </div>
            <div className="user-info-content">
              <div className="user-action">
                <div className="name-follow">
                  <h2>{user.fullname}</h2>
                </div>
                {user._id === auth.user._id ? (
                  <button
                    className="btn btn-outline-info"
                    onClick={() => setEdit(true)}
                  >
                    Edit
                  </button>
                ) : (
                  <Follow user={user} />
                )}
                <FontAwesomeIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setopenSuggestions(true)}
                  icon={faUserEdit}
                />
              </div>
              <div className="follow-status">
                <h2>0 posts</h2>
                <h2 onClick={() => setFollowers(true)}>
                  <span>{user.followers.length}</span> followers
                </h2>
                <h2 onClick={() => setFollowing(true)}>
                  <span>{user.following.length}</span> following
                </h2>
              </div>
              <div className="about">
                <p>{user.about}</p>
              </div>
            </div>
            {edit && (
              <UpdateProfile edit={edit} user={user} setEdit={setEdit} />
            )}
            {followers && (
              <Followers z={user.followers} setFollowers={setFollowers} />
            )}

            {following && (
              <Following z={user.following} setFollowing={setFollowing} />
            )}
          </>
        ))}
      </div>
      {openSuggestions && (
        <div className="sugg-mob-users">
          {suggestions.users.slice(0, 10).map((user) => (
            <div className="sugg-user">
              <Link to={`/profile/${user._id}`}>
                <img width={20} height="20" src={user.avatar} alt="" />
              </Link>
            </div>
          ))}
          <p
            onClick={() => setopenSuggestions(false)}
            style={{ cursor: "pointer" }}
          >
            x
          </p>
        </div>
      )}
    </>
  );
};

export default UserInformationHeader;
