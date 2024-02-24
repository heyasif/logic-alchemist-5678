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
    // Include additional user fields as required by your API
  });
  const [users, setUsers] = useState([]); // State to store the fetched users
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/"); // Redirect if already logged in
    }

    // Uncomment below line to fetch users from your API
    // axios.get('https://epicbazaar.onrender.com/users').then(response => setUsers(response.data));
  }, [navigate]);

  const handleSignUpFormChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevNewUser) => ({
      ...prevNewUser,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validations(newUser, users);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          "https://epicbazaar.onrender.com/users",
          {
            // Match this structure with your API's expected format
            name: {
              firstname: newUser.firstName,
              lastname: newUser.lastName,
            },
            email: newUser.email,
            password: newUser.password,
            // Include other fields your API requires
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
          apiError: "Failed to sign up. Please try again.",
        }));
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
          {/* Repeat this block for each input field */}
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={newUser.firstName}
              onChange={handleSignUpFormChange}
              className={styles.input}
            />
            {/* Include validation error display */}
            {errors.firstName && (
              <p className={styles.error}>{errors.firstName}</p>
            )}
          </div>
          {/* ... include other fields like lastName, email, password, and passwordConfirm */}
          <div className="text-center">
            <button type="submit" className={styles.button}>
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
