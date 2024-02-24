import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

const defaultUser = JSON.parse(localStorage.getItem("user")) || {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  address: "",
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Using double negation to convert to boolean
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("user"));
  const [errors, setErrors] = useState({});

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(defaultUser);
    setLoggedIn(false);
  };

  // Persist logged in status
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    setLoggedIn(!!currentUser);
  }, [currentUser]);

  // Persist errors if needed
  useEffect(() => {
    // Handle storing or clearing errors here if applicable
  }, [errors]);

  const value = {
    currentUser,
    setCurrentUser,
    isSubmitting,
    setIsSubmitting,
    loggedIn,
    setLoggedIn,
    errors,
    setErrors,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
