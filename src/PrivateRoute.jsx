import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
const PrivateRoute = ({ children }) => {
  const { loggedIn } = useAuth();

  return loggedIn ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
