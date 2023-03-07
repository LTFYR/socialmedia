import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRouter = ({ ...props }) => {
  const login = localStorage.getItem("login");
  return login ? (
    <Route {...props} />
  ) : (
    <Route render={() => <Navigate to="/" />} />
  );
};

export default ProtectedRouter;
