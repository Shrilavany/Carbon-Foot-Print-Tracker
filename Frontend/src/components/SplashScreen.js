// src/components/SplashScreen.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css"; // Import the CSS file

import backgroundImage from "../assets/images/background-image2.jpg"; // Import image using ES6 import

const SplashScreen = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3); // Initialize countdown state to 3

  useEffect(() => {
    // Function to handle AI speech
    const speakNumber = (number) => {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(number.toString());
        window.speechSynthesis.speak(utterance);
      }
    };

    // Speak the initial countdown value
    speakNumber(countdown);

    // Set up a timer to decrease the countdown every second
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        const newCountdown = prevCountdown - 1;

        // Only speak when the number is 3, 2, or 1
        if (newCountdown > 0) {
          speakNumber(newCountdown);
        }

        return newCountdown;
      });
    }, 1000);

    // After 3 seconds, navigate to /login
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000); // Redirect after 3 seconds

    return () => {
      clearInterval(interval); // Clean up interval on component unmount
      clearTimeout(timer); // Clean up timer on component unmount
    };
  }, [navigate]);

  return (
    <div
      className="splash-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      role="img"
      aria-label="Splash screen background"
    >
      <h1>Carbon Footprint Tracker</h1>
      <div className="countdown">{countdown}</div> {/* Display countdown */}
    </div>
  );
};

export default SplashScreen;
