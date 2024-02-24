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
  });
  const [showToast, setShowToast] = useState(false); // State for toast visibility
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => setShowToast(false), 5000); // Hide toast after 0.5 seconds
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
    <div className="relative">
      {showToast && (
        <div className="absolute top-0 right-0 mt-4 mr-4 bg-green-500 text-white py-2 px-4 rounded-md">
          Registration Successful!
        </div>
      )}
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
                    <Link
                      to="/signin"
                      className="text-blue-600 hover:underline"
                    >
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
    </div>
  );
};

export default Signup;
