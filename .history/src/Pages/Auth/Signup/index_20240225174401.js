import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import styles from "./styles.module.css";
import validations from "./validations";
import { useSpring, animated } from "react-spring";

const Signup = () => {
  const { setCurrentUser, setIsSubmitting, errors, setErrors } = useAuth();
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

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
            username: newUser.username,
            phone: newUser.phone,
            password: newUser.password,
          }
        );

        if (response.data) {
          setCurrentUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          setShowModal(true); // Show modal notification upon successful registration
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
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        Registration Successful! Click anywhere to close.
      </Modal>

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
              {errors.username && (
                <span className={styles.error}>{errors.username}</span>
              )}
              <label className="sr-only">Username</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={newUser.username}
                name="username"
                placeholder="Username"
              />
            </div>
            <div>
              {errors.phone && (
                <span className={styles.error}>{errors.phone}</span>
              )}
              <label className="sr-only">Phone Number</label>
              <input
                type="text"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={newUser.phone}
                name="phone"
                placeholder="Phone Number"
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
