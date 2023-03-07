import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Posts from "../../components/User/Posts";
import SavedPost from "../../components/User/SavedPost";
import UserInformation from "../../components/User/UserInformation";
import { getOtherUsers } from "../../redux/actions/userProfile";
import "../../style/user.css";

const Profile = () => {
  const { auth, userProfileReducer } = useSelector((state) => state);
  const [tab, setTab] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    if (userProfileReducer.id.every((item) => item !== id)) {
      dispatch(getOtherUsers({ id, auth }));
    }
  }, [id, auth, dispatch, userProfileReducer.id]);

  return (
    <div className="user-profile">
      <UserInformation
        auth={auth}
        userProfileReducer={userProfileReducer}
        id={id}
        dispatch={dispatch}
      />
      {auth.user._id === id && (
        <div className="user-tab">
          <button
            className={tab ? "" : "activetab"}
            onClick={() => setTab(false)}
          >
            POSTS
          </button>
          <button
            className={tab ? "activetab" : ""}
            onClick={() => setTab(true)}
          >
            SAVED
          </button>
        </div>
      )}
      {tab ? (
        <SavedPost auth={auth} dispatch={dispatch} />
      ) : (
        <Posts
          auth={auth}
          userProfileReducer={userProfileReducer}
          id={id}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default Profile;
