import React from "react";
import { useHistory } from "react-router-dom";
import "./EmissionsInfo.css";

const EmissionsInfo = ({ totalEmissions }) => {
  const history = useHistory();

  // Quote based on total emissions
  const quote =
    totalEmissions > 10000
      ? "Your carbon footprint is above average. Consider using public transport or carpooling!"
      : "Great job! Your emissions are below average. Keep up the good work!";

  // Effects of transportation emissions
  const effectsMessage = `
    Transportation emissions contribute significantly to climate change. 
    Reducing your carbon footprint can lead to cleaner air, reduced health risks, 
    and a more sustainable future. Consider switching to eco-friendly modes of transport.
  `;

  const handleNext = () => {
    history.push("/nextPage"); // Redirect to the next page
  };

  return (
    <div className="emissions-info-container">
      <h1>Your Carbon Emissions Summary</h1>
      <h2>Total Emissions: {totalEmissions.toFixed(2)} gCO2</h2>
      <p>{quote}</p>
      <h3>Effects of Transportation Emissions</h3>
      <p>{effectsMessage}</p>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default EmissionsInfo;
