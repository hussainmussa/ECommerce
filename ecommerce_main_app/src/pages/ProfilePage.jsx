import React from "react";
import "./ProfilePage.css"; // Import the CSS file for styling
import BottomBar from "./BottomBar";

// Define a functional component for the profile page
const ProfilePage = () => {
  // Hardcoded profile data for demonstration
  const profileData = {
    name: "Jane Doe",
    icon: "👤",
    location: "New York, NY",
    job: "Software Developer",
    bio: "Passionate about creating impactful software. Lover of coffee and good books."
  };

  return (
    <div className="profile-container">
      <div className="profile-icon">{profileData.icon}</div>
      <div className="profile-name">{profileData.name}</div>
      <div className="profile-info">
        <strong>Location:</strong> {profileData.location}
      </div>
      <div className="profile-info">
        <strong>Job:</strong> {profileData.job}
      </div>
      <div className="profile-bio">{profileData.bio}</div>
      <BottomBar/>
    </div>
  );
};

export default ProfilePage;
