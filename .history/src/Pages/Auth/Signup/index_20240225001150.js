import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import styles from "./styles.module.css";
import validations from "./validations";

const Signup = () => {
  const { setCurrentUser, setIsSubmitting, errors, setErrors } = useAuth();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [showToast, setShowToast] = useState(false); // State for toast visibility
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => setShowToast(false), 500); // Hide toast after 0.5 seconds
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const handleSignUpFormChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevNewUser) => ({
      ...prevNewUser,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validations(newUser);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          "https://epicbazaar.onrender.com/users",
          {
            name: {
              firstname: newUser.firstName,
              lastname: newUser.lastName,
            },
            email: newUser.email,
            password: newUser.password,
          }
        );

        if (response.data) {
          setCurrentUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          setShowToast(true); // Show toast notification upon successful registration
          navigate("/");
        }
      } catch (error) {
        console.error("Signup error:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          apiError: "Failed to sign up. Please try again.",
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={styles.formGroupContainer}>
      {showToast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "green",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 1000,
          }}
        >
          Registration Successful!
        </div>
      )}
      {/* Rest of your form */}
    </div>
  );
};

export default Signup;
