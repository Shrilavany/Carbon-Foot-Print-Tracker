// src/components/Profile.js
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Profile.css"; // Include the CSS for styling

const Profile = () => {
  const navigate = useNavigate(); // Create navigate function
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    age: "",
    bloodGroup: "",
    gender: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null); // Ref for the file input

  useEffect(() => {
    // Fetch user data from localStorage
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const age = localStorage.getItem("age");
    const bloodGroup = localStorage.getItem("bloodGroup");
    const gender = localStorage.getItem("gender");
    const image = localStorage.getItem("profileImage");

    if (username && email && age && bloodGroup && gender) {
      setUserData({
        username,
        email,
        age,
        bloodGroup,
        gender,
      });
    }

    if (image) {
      setProfileImage(image);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setProfileImage(base64Image);
        localStorage.setItem("profileImage", base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    // Trigger file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleBack = () => {
    navigate("/home"); // Navigate to the home page
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-info">
        <div className="profile-image-upload">
          <label htmlFor="profileImageInput">
            <img
              src={profileImage || "default-profile.png"} // Replace with a default image if none is uploaded
              alt="Profile"
              className="profile-image"
            />
          </label>
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef} // Attach the ref here
            style={{ display: "none" }}
          />
        </div>
        <p>
          <strong>Name:</strong> {userData.username}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Age:</strong> {userData.age}
        </p>
        <p>
          <strong>Blood Group:</strong> {userData.bloodGroup}
        </p>
        <p>
          <strong>Gender:</strong> {userData.gender}
        </p>
        <button className="edit-button" onClick={handleEditProfile}>
          Edit Profile
        </button>
        <button className="back-button" onClick={handleBack}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
