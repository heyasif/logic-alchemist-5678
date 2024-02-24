import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

// You could still keep the default user structure if needed elsewhere in your app
const defaultUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  address: "",
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Set to null initially
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Set to false initially
  const [errors, setErrors] = useState({});

  const login = (user) => {
    // Call this function with user object after successfully verifying credentials with the API
    setCurrentUser(user);
    setLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(user)); // Optionally store the user in localStorage if needed
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    setLoggedIn(false);
  };

  // Persist logged in status in local storage if needed
  // This useEffect could be removed if you do not wish to store the user in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    isSubmitting,
    setIsSubmitting,
    loggedIn,
    setLoggedIn,
    errors,
    setErrors,
    login, // Expose login function
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
