import React, { useState } from "react";
import DayInput from "./DayInput";
import Results from "./Results";
import LoadingSpinner from "./LoadingSpinner";
import "./Dashboard.css";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Dashboard = () => {
  const [weekData, setWeekData] = useState({});
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const updateDayData = (day, data) => {
    setWeekData((prev) => ({ ...prev, [day]: data }));
  };

  const calculateTotalEmission = () => {
    return Object.values(weekData).reduce(
      (total, { emission }) => total + emission,
      0
    );
  };

  const handlePageChange = (index) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentDayIndex(index);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="dashboard-container">
      {loading && <LoadingSpinner />}
      <div className="dashboard-content">
        <h2 className="dashboard-title">Carbon Footprint Tracker</h2>
        <div className="day-inputs">
          <DayInput
            day={daysOfWeek[currentDayIndex]}
            updateDayData={updateDayData}
          />
        </div>
        <h3>
          Total Weekly Emission: {calculateTotalEmission().toFixed(2)} kg CO2
        </h3>
        <Results weekData={weekData} />
        <div className="pagination">
          {daysOfWeek.map((day, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={`page-button ${
                currentDayIndex === index ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
