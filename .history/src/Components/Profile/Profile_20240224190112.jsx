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
      navigate("/login"); // Redirect to login page if not logged in
    }
  }, [loggedIn, navigate]);

  if (!currentUser) {
    return null; // or a loading indicator
  }

  return (
    <div className={styles.profile}>
      <h2>User Profile</h2>
      <div className={styles.userInfo}>
        <p>
          <strong>Name:</strong> {currentUser.name.firstname}{" "}
          {currentUser.name.lastname}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>Username:</strong> {currentUser.username}
        </p>
        <p>
          <strong>Phone:</strong> {currentUser.phone}
        </p>
        <p>
          <strong>Address:</strong> {currentUser.address.street},{" "}
          {currentUser.address.city}, {currentUser.address.zipcode}
        </p>
        <p>
          <strong>Geolocation:</strong> Lat:{" "}
          {currentUser.address.geolocation.lat}, Long:{" "}
          {currentUser.address.geolocation.long}
        </p>
      </div>
    </div>
  );
};

export default Profile;
