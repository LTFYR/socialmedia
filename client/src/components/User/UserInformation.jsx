import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserInformationHeader from "./UserInformationHeader";

const UserInformation = ({ id, auth, dispatch, userProfileReducer }) => {
  return (
    <div className="user-information">
      <UserInformationHeader
        auth={auth}
        userProfileReducer={userProfileReducer}
        id={id}
        dispatch={dispatch}
      />
    </div>
  );
};

export default UserInformation;
