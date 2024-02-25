import { useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import styles from "./styles.module.css";
import { LoginIcon } from "@heroicons/react/outline";

const Signin = () => {
  const { setCurrentUser, setIsSubmitting, loggedIn, setLoggedIn } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.get("https://epicbazaar.onrender.com/users");

      const user = response.data.find(
        (user) =>
          user.email === emailRef.current.value &&
          user.password === passwordRef.current.value
      );

      if (user) {
        // Extract specific fields from user object
        const currentUserData = {
          id: user.id,
          email: user.email,
          username: user.username,
          password: user.password,
          name: {
            firstname: user.name.firstname,
            lastname: user.name.lastname,
          },
        };

        setCurrentUser(currentUserData);
        setLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(currentUserData));
        navigate("/");
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
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

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
                ref={emailRef}
                className={styles.input}
                placeholder="Email Address"
                required
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                type="password"
                ref={passwordRef}
                className={styles.input}
                placeholder="Password"
                required
              />
            </div>
            <div className={styles.linkBox}>
              <div className={styles.linkDiv}>
                <span>
                  Don't have an account? Sign up
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    here.
                  </Link>
                </span>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className={styles.button}>
                <LoginIcon className="h-5 w-5" aria-hidden="true" />
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
