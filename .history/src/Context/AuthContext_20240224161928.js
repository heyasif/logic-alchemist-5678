import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios"; // Ensure axios is imported for making HTTP requests
import { useNavigate } from "react-router-dom";

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
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("user"));
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsSubmitting(true);
    try {
      // Adjust the URL if your API has a specific endpoint for authentication
      const response = await axios.post(
        `https://epicbazaar.onrender.com/users/login`,
        {
          email,
          password,
        }
      );
      // Assuming the API returns the user object on successful authentication
      if (response.data) {
        setCurrentUser(response.data);
        setLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/"); // Navigate to the homepage upon successful login
      } else {
        setErrors({ auth: "Invalid email or password" });
        setLoggedIn(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ auth: "Login failed due to an error" });
      setLoggedIn(false);
    }
    setIsSubmitting(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      address: "",
    });
    setLoggedIn(false);
    navigate("/login"); // Optionally navigate to the login page upon logout
  };

  useEffect(() => {
    // This effect could be adjusted as per new logic or requirements
  }, [errors, currentUser]);

  const value = {
    currentUser,
    setCurrentUser,
    loggedIn,
    errors,
    setErrors,
    setIsSubmitting,
    logout,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
