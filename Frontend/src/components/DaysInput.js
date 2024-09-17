// src/components/DaysInput.js
import React, { useState } from "react";
import DayInput from "./DayInput";

const DaysInput = () => {
  const [daysData, setDaysData] = useState({});
  const [allDaysFilled, setAllDaysFilled] = useState(false);

  const handleUpdateDayData = (day, entries) => {
    setDaysData((prevData) => ({
      ...prevData,
      [day]: entries,
    }));
    checkAllDaysFilled();
  };

  const checkAllDaysFilled = () => {
    const filledDays = Object.keys(daysData).length;
    if (filledDays === 7) {
      setAllDaysFilled(true);
    }
  };

  const calculateTotalEmissions = () => {
    let totalEmissions = 0;
    for (const day in daysData) {
      totalEmissions += daysData[day].reduce(
        (sum, entry) => sum + entry.emission,
        0
      );
    }
    return totalEmissions;
  };

  return (
    <div>
      {Array.from({ length: 7 }, (_, i) => (
        <DayInput
          key={i}
          day={`Day ${i + 1}`}
          updateDayData={handleUpdateDayData}
          navigateToResults={() => {}}
        />
      ))}
      {allDaysFilled && (
        <div className="total-emissions">
          <h4>
            Total Carbon Emissions: {calculateTotalEmissions().toFixed(2)} kg
            CO2
          </h4>
        </div>
      )}
    </div>
  );
};

export default DaysInput;
