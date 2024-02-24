import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css"; // Assume you have some basic CSS in place
import { useAuth } from "../../Context/AuthContext";

const Profile = () => {
  const { currentUser, loggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [loggedIn, navigate]);

  if (!currentUser) {
    return null; // Or some loading indicator
  }

  // Mock data for the profile card, replace with actual user data
  const profileData = {
    name: `${currentUser.name.firstname} ${currentUser.name.lastname}`,
    location: currentUser.address.city,
    job: "Web Producer - Web Specialist",
    university: "Columbia University",
    friendsCount: 65,
    photosCount: 43,
    commentsCount: 21,
  };

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileHeader}>
        <button className={styles.connectButton}>Connect</button>
        <button className={styles.messageButton}>Message</button>
      </div>
      <div className={styles.profileImage}>
        <img src="/path-to-user-image.jpg" alt="Profile" />
      </div>
      <div className={styles.profileInfo}>
        <h1 className={styles.profileName}>{profileData.name}</h1>
        <p className={styles.profileLocation}>{profileData.location}</p>
        <p className={styles.profileJob}>
          {profileData.job} at {profileData.university}
        </p>
        <div className={styles.profileStats}>
          <div>
            <strong>{profileData.friendsCount}</strong> Friends
          </div>
          <div>
            <strong>{profileData.photosCount}</strong> Photos
          </div>
          <div>
            <strong>{profileData.commentsCount}</strong> Comments
          </div>
        </div>
        <button className={styles.showMoreButton}>Show more</button>
      </div>
    </div>
  );
};

export default Profile;
