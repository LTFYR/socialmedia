import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALACTIONS } from "../../../redux/actions/global";
import Loading from "../../Loading/Loading";
import Toast from "./Toastify";

const Notification = () => {
  const { notfication } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="position-relative">
      {notfication.loading && <Loading />}

      {notfication.error && (
        <Toast
          msg={{ title: "Error", body: notfication.error }}
          handleShow={() =>
            dispatch({ type: GLOBALACTIONS.NOTIFY, payload: {} })
          }
          bgColor="bg-danger"
        />
      )}

      {notfication.success && (
        <Toast
          msg={{ title: "Success", body: notfication.success }}
          handleShow={() =>
            dispatch({ type: GLOBALACTIONS.NOTIFY, payload: {} })
          }
          bgColor="bg-success"
        />
      )}
    </div>
  );
};

export default Notification;
