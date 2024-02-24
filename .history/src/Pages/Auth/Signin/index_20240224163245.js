import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import axios from "axios";
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
    // e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send a GET request to the API endpoint
      const response = await axios.get("https://epicbazaar.onrender.com/users");
      console.log(response);

      // Find the user with the matching email and password
      const user = response.data.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        setCurrentUser(user); // Set the current user with the response data
        setLoggedIn(true); // Set login status to true
        localStorage.setItem("user", JSON.stringify(user)); // Optionally save the user to localStorage
        navigate("/"); // Navigate to the homepage
      } else {
        alert("Login failed! Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again later.");
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    handleSignIn();
  }, []);

  // useEffect(() => {
  //   if (loggedIn) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div className={styles.formGroupContainer}>
      <div className={styles.formGroup}>
        <div>
          <h2 className={styles.title}>Login</h2>
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSignIn}
          className={styles.signInForm}
        >
          <div className={styles.inputGroup}>
            <div>
              <label className="sr-only">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                ref={emailRef}
                className={styles.input}
                placeholder="Email Address"
                required
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                type="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className={styles.input}
                placeholder="Password"
                ref={passwordRef}
              />
            </div>
            <div className={styles.linkBox}>
              <div className={styles.linkDiv}>
                <span>
                  Don't have an account? Sign up{" "}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    {" "}
                    here.
                  </Link>
                </span>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className={styles.button}>
                <LoginIcon className="my-auto h-5 w-6" aria1-hidden="true" />
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
