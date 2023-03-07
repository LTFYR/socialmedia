import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALACTIONS } from "../../redux/actions/global";

const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="status">
      <img src={auth.user.avatar} alt="" />
      <button
        onClick={() => dispatch({ type: GLOBALACTIONS.STATUS, payload: true })}
        className="status-btn"
      >
        {auth.user.username}, how do you feel today?
      </button>
    </div>
  );
};

export default Status;
