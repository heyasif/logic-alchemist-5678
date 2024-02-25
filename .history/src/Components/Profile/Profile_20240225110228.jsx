import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css"; // Assume you have some basic CSS in place
import { useAuth } from "../../Context/AuthContext";

const Profile = () => {
  const { currentUser, loggedIn } = useAuth();
  const navigate = useNavigate();

  console.log(currentUser);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [loggedIn, navigate]);

  if (!currentUser) {
    return null; // Or some loading indicator
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <img
          src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1708782262~exp=1708785862~hmac=8a11482b5a85aa704f15c7d476c83899825589729024d56dc6513dc5bcf64e92&w=1380"
          alt="Profile"
          className={styles.profileImage}
        />
        <h1
          className={styles.profileName}
        >{`${currentUser.name.firstname} ${currentUser.name.lastname}`}</h1>
        <p className={styles.profileEmail}>{currentUser.email}</p>
        <p className={styles.profileUsername}>{currentUser.username}</p>
        <p className={styles.profilePhone}>{currentUser.phone}</p>
        {/* <p className={styles.profileAddress}>
          {`${currentUser.address.street}, ${currentUser.address.city}, ${currentUser.address.zipcode}`}
        </p> */}
        {/* Add more user details as needed */}
      </div>
    </div>
  );
};

export default Profile;
