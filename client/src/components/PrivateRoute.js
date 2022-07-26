import React from "react";
import { Navigate } from "react-router-dom";
import Local from "../helpers/Local";

// redirects anonymous users to log in if trying to access page for login user
function PrivateRoute(props) {
  let userid = Local.getUserId();
  if (!userid) {
    return <Navigate to="/login" />;
  }
  //   if user id exists, then show the component
  return <>{props.children}</>;
}

export default PrivateRoute;
