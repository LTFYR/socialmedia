import { faGrinBeam } from "@fortawesome/free-regular-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../User";
import Loading from "../../images/loading-gif.gif";
import Follow from "../User/Follow";
import "../../style/user.css";

const Right = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(auth.user?.email);
  console.log(suggestions);

  return (
    <div className="right-navbar">
      <User user={auth.user} />
      <div className="d-flex justify-content-start my-2">
        <h5 className="text-danger">Suggestions</h5>
      </div>
      {suggestions.loading ? (
        <img src={Loading} alt="loading" className="d-block mx-auto my-4" />
      ) : (
        <div className="sugg-users">
          {suggestions.users.slice(0, 6).map((user) => (
            <User key={user._id} user={user}>
              <Follow user={user} />
            </User>
          ))}
        </div>
      )}
    </div>
  );
};

export default Right;
