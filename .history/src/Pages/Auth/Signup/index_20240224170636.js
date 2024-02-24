import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import styles from "./styles.module.css";
import validations from "./validations";
import { IdentificationIcon } from "@heroicons/react/outline";

const Signup = () => {
  const { setIsSubmitting, setErrors, errors } = useAuth();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    // Add additional fields as required by your application
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate the user if they are already logged in
    // This part depends on how you handle the logged-in state in your application
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSignUpFormChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validations(newUser);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const postData = {
          // Adjust this structure as needed for your backend
          name: {
            firstname: newUser.firstName,
            lastname: newUser.lastName,
          },
          email: newUser.email,
          password: newUser.password,
          // Include any other fields you need to send to your API
        };

        const response = await axios.post(
          "https://epicbazaar.onrender.com/users",
          postData
        );

        if (response.data) {
          // Assuming the API returns the created user or a success message
          // Adjust according to your API response
          // e.g., setCurrentUser(response.data); if you wish to log the user in immediately
          localStorage.setItem("user", JSON.stringify(response.data)); // Optional: adjust based on your auth flow
          navigate("/signin"); // or '/' to navigate to the home page or dashboard as per your app's flow
        }
      } catch (error) {
        console.error("Signup error:", error);
        // Handle API errors (e.g., email already in use) here
        setErrors({
          ...errors,
          apiError: "Failed to sign up. Please try again.",
        });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formGroupContainer}>
      <div className={styles.formGroup}>
        <h2 className={styles.title}>Sign Up</h2>
        <form
          autoComplete="off"
          onSubmit={handleSignUpSubmit}
          className={styles.signUpForm}
        >
          {/* Iterate over each field like this */}
          <div className={styles.inputGroup}>
            <input
              type="text"
              className={styles.input}
              name="firstName"
              placeholder="First Name"
              value={newUser.firstName}
              onChange={handleSignUpFormChange}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName}</span>
            )}
            {/* Repeat for other fields */}
          </div>
          {/* Continue with lastName, email, password, passwordConfirm inputs similarly */}
          <div className="text-center">
            <button type="submit" className={styles.button}>
              <IdentificationIcon className="h-5 w-5" aria-hidden="true" />
              Sign Up
            </button>
          </div>
          <div className={styles.linkBox}>
            <span>
              Already have an account? Login
              <Link to="/signin" className="text-blue-600 hover:underline">
                {" "}
                here.
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
