import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useAuth();

  return loggedIn ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
