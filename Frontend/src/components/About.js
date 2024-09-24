import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./About.css"; // Import the CSS file for styling

// Array of steps containing descriptions and image paths
const steps = [
  {
    description: "Step 1: Understand your transportation habits.",
    image:
      "https://cdn.leonardo.ai/users/bdd4fbae-5cce-4f03-8fe0-3b85ad436266/generations/857507a1-c2dc-4121-8202-315b31ecac77/Leonardo_Phoenix_A_minimalist_illustration_of_a_person_sitting_2.jpg",
  },
  {
    description: "Step 2: Track your vehicle usage daily.",
    image:
      "https://cdn.leonardo.ai/users/bdd4fbae-5cce-4f03-8fe0-3b85ad436266/generations/8960a0e5-62fa-4cce-8b6b-20bbe97305ce/Leonardo_Phoenix_By_tracking_your_vehicle_usage_you_can_see_ho_1.jpg",
  },
  {
    description: "Step 3: Calculate your weekly carbon emissions.",
    image:
      "https://cdn.leonardo.ai/users/bdd4fbae-5cce-4f03-8fe0-3b85ad436266/generations/8960a0e5-62fa-4cce-8b6b-20bbe97305ce/Leonardo_Phoenix_By_tracking_your_vehicle_usage_you_can_see_ho_3.jpg",
  },
  {
    description: "Step 4: Review your detailed weekly carbon footprint report.",
    image:
      "https://cdn.leonardo.ai/users/bdd4fbae-5cce-4f03-8fe0-3b85ad436266/generations/b55a6750-62e1-456e-9e18-4751fe70f6f3/Leonardo_Phoenix_This_website_is_designed_to_help_you_calculat_2.jpg",
  },
  {
    description: "Step 5: Take actions to reduce your environmental impact.",
    image:
      "https://cdn.leonardo.ai/users/bdd4fbae-5cce-4f03-8fe0-3b85ad436266/generations/b55a6750-62e1-456e-9e18-4751fe70f6f3/Leonardo_Phoenix_This_website_is_designed_to_help_you_calculat_1.jpg",
  },
];

const About = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [isSpeechActive, setIsSpeechActive] = useState(true); // State for toggling speech
  const [currentStep, setCurrentStep] = useState(0); // Track the current step in the sequence
  const [stepsStarted, setStepsStarted] = useState(false); // Track if steps have been started
  const [spokenContent, setSpokenContent] = useState(""); // State to store spoken content

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

    // Set speech speed and pitch
    speech.rat;
    const startSpeech = () => {
      window.speechSynthesis.speak(speech);
      setSpokenContent(speech.text); // Store spoken content
    };

    if (isSpeechActive) {
      // Start speech when component mounts
      startSpeech();
    }

    // Cleanup function to stop speech when component unmounts or speech is deactivated
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [isSpeechActive]); // Rerun effect when isSpeechActive changes

  // Function to handle back button click
  const handleBackClick = () => {
    navigate("/home"); // Navigate to the home page
  };

  // Function to toggle speech on/off
  const toggleSpeech = () => {
    if (isSpeechActive) {
      window.speechSynthesis.cancel(); // Stop speech
    } else {
      window.speechSynthesis.resume(); // Resume speech
    }
    setIsSpeechActive(!isSpeechActive); // Toggle state
  };

  // Function to handle the next step button click
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1); // Move to the next step
    } else {
      navigate("/home"); // After the last step, go back to home
    }
  };

  // Function to start the step-by-step sequence
  const startSteps = () => {
    setStepsStarted(true); // Show the steps once the button is clicked
  };

  return (
    <div className="About">
      <h1>About Us</h1>

      {/* Top-right button to start the steps */}
      <button onClick={startSteps} className="start-steps-button">
        Start Steps
      </button>

      {/* Conditional rendering of step content */}
      {stepsStarted && (
        <div className="step-content">
          <p>{steps[currentStep].description}</p>
          <img
            src={steps[currentStep].image}
            alt={`Step ${currentStep + 1}`}
            className="step-image"
          />
          {/* Display spoken content */}
          <p className="spoken-content">{spokenContent}</p>
        </div>
      )}

      {/* Buttons for navigation */}
      <div className="buttons">
        {stepsStarted && (
          <>
            <button onClick={handleNextStep} className="next-step-button">
              {currentStep < steps.length - 1 ? "Next Step" : "Back to Home"}
            </button>
            <button onClick={toggleSpeech} className="toggle-speech-button">
              {isSpeechActive ? "Stop Speech" : "Start Speech"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default About;
