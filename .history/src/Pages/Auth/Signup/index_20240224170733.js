import { useState, useEffect } from "react";
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
    address: "", // Ensure you include all the necessary fields
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/"); // If the user is already logged in, redirect to the home page.
    }
  }, [navigate]);

  const handleSignUpFormChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validations(newUser); // Ensure you define validations properly
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
            // Add other fields as necessary
          }
        );

        if (response.data) {
          setCurrentUser(response.data); // Update the current user in context
          localStorage.setItem("user", JSON.stringify(response.data)); // Optionally save to localStorage
          navigate("/"); // Redirect to the home page or to the login page
        }
      } catch (error) {
        console.error("Signup error:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          signup: "Signup failed, please try again.",
        }));
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formGroupContainer}>
      {/* Form fields and submit button */}
      {/* Make sure to update `value` and `name` according to newUser properties */}
    </div>
  );
};

export default Signup;
