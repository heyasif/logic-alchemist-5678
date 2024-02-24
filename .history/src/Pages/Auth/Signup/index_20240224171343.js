import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import styles from "./styles.module.css";
// Assuming validations is a function you've defined to validate user input
import validations from "./validations";

const Signup = () => {
  const { setIsSubmitting, setErrors } = useAuth();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
    // Assuming address structure based on your API structure
    address: {
      geolocation: {
        lat: "",
        long: "",
      },
      city: "",
      street: "",
      number: "",
      zipcode: "",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSignUpFormChange = (e) => {
    // Special handling for nested address object
    if (e.target.name.startsWith("address.")) {
      const addressKey = e.target.name.split(".")[1];
      setNewUser({
        ...newUser,
        address: {
          ...newUser.address,
          [addressKey]: e.target.value,
        },
      });
    } else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    // Validate input
    const validationErrors = validations(newUser);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // Adjust this payload structure as needed for your API
        const postData = {
          name: {
            firstname: newUser.firstName,
            lastname: newUser.lastName,
          },
          email: newUser.email,
          username: newUser.username,
          password: newUser.password,
          address: newUser.address,
        };

        await axios.post("https://epicbazaar.onrender.com/users", postData);
        // Handle success - for example, redirect to login page
        navigate("/signin");
      } catch (error) {
        console.error("Signup error:", error);
        // Handle error
        setErrors((prev) => ({
          ...prev,
          apiError: "Failed to sign up. Please try again.",
        }));
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
                value={newUser.firstName}
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
                value={newUser.lastName}
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
                value={newUser.email}
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
                value={newUser.password}
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
                value={newUser.passwordConfirm}
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
                {/* <IdentificationIcon
                  className="my-auto h-5 w-6"
                  aria1-hidden="true"
                /> */}
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
