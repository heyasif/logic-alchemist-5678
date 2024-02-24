import { IdentificationIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import styles from "./styles.module.css";
import validations from "./validations";

const Signup = () => {
  const { setCurrentUser, setIsSubmitting, setErrors } = useAuth();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    // You might need additional fields based on your user structure
  });
  const navigate = useNavigate();

  useEffect(() => {
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
        // Assuming your server expects the user data in this format
        const postData = {
          email: newUser.email,
          username: newUser.username, // You might generate this or take it as input
          password: newUser.password,
          name: {
            firstname: newUser.firstName,
            lastname: newUser.lastName,
          },
          // Include other fields like address, geolocation, etc., if needed
        };

        const response = await axios.post(
          "https://epicbazaar.onrender.com/users",
          postData
        );

        if (response.data) {
          setCurrentUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/signin"); // or '/' to navigate to the home page
        }
      } catch (error) {
        console.error("Signup error:", error);
        setErrors({ signup: "Signup failed, please try again." });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formGroupContainer}>
      <div className={styles.formGroup}>
        <div>
          <h2 className={styles.title}>Sign Up</h2>
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSignUpSubmit}
          className={styles.signUpForm}
        >
          <div className={styles.inputGroup}>
            <div>
              {errors.firstName && (
                <span className={styles.error}>{errors.firstName}</span>
              )}
              <label className="sr-only">First Name</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.firstName}
                name="firstName"
                placeholder="First Name"
              />
            </div>

            <div>
              {errors.lastName && (
                <span className={styles.error}>{errors.lastName}</span>
              )}
              <label className="sr-only">Last Name</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.lastName}
                name="lastName"
                placeholder="Last Name"
              />
            </div>
            <div>
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
              <label className="sr-only">Email</label>
              <input
                type="email"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.email}
                name="email"
                placeholder="Email Address"
              />
            </div>
            <div>
              {errors.password && (
                <span className={styles.error}>{errors.password}</span>
              )}
              <label className="sr-only">Password</label>
              <input
                type="Password"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.password}
                name="password"
                placeholder="Password"
              />
            </div>
            <div>
              {errors.passwordConfirm && (
                <span className={styles.error}>{errors.passwordConfirm}</span>
              )}
              <label className="sr-only">Password Confirm</label>
              <input
                type="Password"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.passwordConfirm}
                name="passwordConfirm"
                placeholder="Password Confirm"
              />
            </div>
            <div className={styles.linkBox}>
              <div className={styles.linkDiv}>
                <span>
                  Already have an account? Login{" "}
                  <Link to="/signin" className="text-blue-600 hover:underline">
                    {" "}
                    here.
                  </Link>
                </span>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className={styles.button}>
                <IdentificationIcon
                  className="my-auto h-5 w-6"
                  aria1-hidden="true"
                />
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
