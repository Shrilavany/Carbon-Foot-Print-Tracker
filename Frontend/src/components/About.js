import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./About.css"; // Import the CSS file for styling

const About = () => {
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Create a SpeechSynthesisUtterance instance
    const speech = new SpeechSynthesisUtterance(`
      Welcome to the About Us page. This website is designed to help you calculate
      your carbon footprint based on your weekly transportation activities.
      Understanding your carbon footprint is essential to recognizing the impact
      of your daily travel on the environment. By tracking your vehicle usage,
      you can see how much carbon dioxide is emitted from your travels over the 
      course of a week. Every Sunday, you will receive a detailed report of your 
      weekly carbon footprint, helping you make informed decisions to reduce your 
      environmental impact.
    `);

    // Function to start speech
    const startSpeech = () => {
      window.speechSynthesis.speak(speech);
    };

    // Start speech when component mounts
    startSpeech();

    // Cleanup function to stop speech when component unmounts
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Function to handle back button click
  const handleBackClick = () => {
    navigate("/home"); // Navigate to the home page
  };

  return (
    <div className="About">
      <h1>About Us</h1>
      <p>
        This website is designed to help you calculate your carbon footprint
        based on your weekly transportation activities. Understanding your
        carbon footprint is essential to recognizing the impact of your daily
        travel on the environment.
      </p>
      <p>
        By tracking your vehicle usage, you can see how much carbon dioxide is
        emitted from your travels over the course of a week. Every Sunday, you
        will receive a detailed report of your weekly carbon footprint, helping
        you make informed decisions to reduce your environmental impact.
      </p>
      <button onClick={handleBackClick} className="back-button">
        Back to Home
      </button>
    </div>
  );
};

export default About;
