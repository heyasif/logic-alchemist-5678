import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import axios from "axios"; // Make sure to import axios
import styles from "./styles.module.css";
import { LoginIcon } from "@heroicons/react/outline";

const Signin = () => {
  const { setCurrentUser, setIsSubmitting, loggedIn, setLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Send a POST request to the API endpoint
      const response = await axios.post(
        "https://epicbazaar.onrender.com/users/login",
        {
          // Assuming there's a /login endpoint
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      );
      // Here you should check the response to see if login was successful
      // This example assumes the API returns the user object on successful login
      if (response.data) {
        setCurrentUser(response.data); // Set the current user with the response data
        setLoggedIn(true); // Set login status to true
        localStorage.setItem("user", JSON.stringify(response.data)); // Optionally save the user to localStorage
        navigate("/"); // Navigate to the homepage
      } else {
        alert("Login failed! Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error during login. Please try again.");
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <div className={styles.formGroupContainer}>
      {/* Form content unchanged */}
    </div>
  );
};

export default Signin;
