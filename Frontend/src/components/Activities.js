import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Activities.css"; // Include your custom styles

const reductionTips = [
  {
    day: "Day 1",
    tip: "Try biking or walking for short distances.",
    gif: "https://i.pinimg.com/originals/3e/a3/26/3ea3260b1f63bba1c266c7d35e3ca01b.gif", // Example GIF link
  },
  {
    day: "Day 2",
    tip: "Carpool to reduce individual car usage.",
    gif: "https://i.pinimg.com/736x/ab/1b/03/ab1b03c3924b09c2921e016fa30cd7e6.jpg",
  },
  {
    day: "Day 3",
    tip: "Use public transportation instead of driving solo.",
    gif: "https://cdn.leonardo.ai/users/2bc0079b-12c9-4862-91ce-da7820cb17aa/generations/91f7873d-86f3-4660-9d0b-1e95d82c6434/Leonardo_Phoenix_A_vibrant_and_colorful_illustration_depicting_2.jpg",
  },
  {
    day: "Day 4",
    tip: "Avoid idling your car to save fuel and reduce emissions.",
    gif: "https://cdn.leonardo.ai/users/2bc0079b-12c9-4862-91ce-da7820cb17aa/generations/fae0e36f-b34d-423e-b5e9-76f84cae816a/Leonardo_Phoenix_A_serene_and_thoughtful_illustration_of_a_per_2.jpg",
  },
  {
    day: "Day 5",
    tip: "Maintain your vehicle to ensure it's running efficiently.",
    gif: "https://cdn.leonardo.ai/users/2bc0079b-12c9-4862-91ce-da7820cb17aa/generations/1cf4bd34-97a7-49bc-9127-acf39565ebea/Leonardo_Phoenix_A_wellmaintained_sleek_silver_sports_car_is_p_2.jpg",
  },
  {
    day: "Day 6",
    tip: "Combine errands into one trip to minimize driving.",
    gif: "https://cdn.leonardo.ai/users/2bc0079b-12c9-4862-91ce-da7820cb17aa/generations/eedaa53a-cd6d-4155-a802-0f07ee49492d/Leonardo_Phoenix_A_busy_urban_street_scene_with_a_young_adult_0.jpg",
  },
  {
    day: "Day 7",
    tip: "Consider using electric or hybrid vehicles.",
    gif: "https://cdn.leonardo.ai/users/2bc0079b-12c9-4862-91ce-da7820cb17aa/generations/2dd2e7a3-ad99-426a-b856-7212923b719b/Leonardo_Phoenix_A_futuristic_cityscape_with_a_gentle_warm_glo_2.jpg",
  },
];

const Activites = () => {
  const [currentDay, setCurrentDay] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  const nextTip = () => {
    setCurrentDay((prevDay) => (prevDay + 1) % reductionTips.length); // Go to the next tip
  };

  const goToHome = () => {
    navigate("/home"); // Navigate to the home page
  };

  return (
    <div className="activities-page">
      <h1>Footprint Reduction Tips</h1>

      <div className="tip-container">
        <h2>{reductionTips[currentDay].day}</h2>
        <p>{reductionTips[currentDay].tip}</p>
        <img
          src={reductionTips[currentDay].gif}
          alt="Tip Visual"
          className="tip-gif"
        />
      </div>

      <button onClick={nextTip} className="next-tip-button">
        Next Tip
      </button>

      <button
        onClick={goToHome}
        className="back-button"
        style={{ marginTop: "20px" }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Activites;
