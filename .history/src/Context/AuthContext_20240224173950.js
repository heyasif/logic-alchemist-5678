import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});

  const login = (user) => {
    setCurrentUser(user);
    setLoggedIn(true);
  };

  const logout = () => {
    setCurrentUser(null);
    setLoggedIn(false);
  };

  const value = {
    currentUser,
    setCurrentUser,
    isSubmitting,
    setIsSubmitting,
    loggedIn,
    setLoggedIn,
    errors,
    setErrors,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
