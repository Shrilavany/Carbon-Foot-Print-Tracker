import React, { useReducer, useEffect } from "react";
import DayInput from "./DayInput";
import Results from "./Results";
import LoadingSpinner from "./LoadingSpinner";
import "./Dashboard.css";

// Define actions for the reducer
const ACTIONS = {
  SET_DAY_DATA: "set_day_data",
  SET_CURRENT_DAY: "set_current_day",
  SET_LOADING: "set_loading",
};

// Reducer function to manage state updates
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_DAY_DATA:
      return {
        ...state,
        weekData: {
          ...state.weekData,
          [action.payload.day]: action.payload.data,
        },
      };
    case ACTIONS.SET_CURRENT_DAY:
      return { ...state, currentDayIndex: action.payload.index };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload.loading };
    default:
      return state;
  }
};

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
  const [state, dispatch] = useReducer(reducer, {
    weekData: {},
    currentDayIndex: 0,
    loading: false,
  });

  // Update the data for a specific day
  const updateDayData = (day, data) => {
    dispatch({
      type: ACTIONS.SET_DAY_DATA,
      payload: { day, data },
    });
  };

  // Calculate the total emission for the week
  const calculateTotalEmission = () => {
    return Object.values(state.weekData).reduce(
      (total, entries) =>
        total +
        entries.reduce(
          (sum, entry) => sum + parseFloat(entry.emission || 0),
          0
        ),
      0
    );
  };

  // Handle page (day) change with a simulated loading effect
  const handlePageChange = (index) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: { loading: true } });
    setTimeout(() => {
      dispatch({
        type: ACTIONS.SET_CURRENT_DAY,
        payload: { index },
      });
      dispatch({ type: ACTIONS.SET_LOADING, payload: { loading: false } });
    }, 500);
  };

  // Debugging: Console log current day index and name
  useEffect(() => {
    console.log("Current Day Index:", state.currentDayIndex);
    console.log("Current Day Name:", daysOfWeek[state.currentDayIndex]);
  }, [state.currentDayIndex]);

  // Get the current day's data
  const currentDayData =
    state.weekData[daysOfWeek[state.currentDayIndex]] || [];

  // Check if all days have been filled with data
  const allDaysCompleted = daysOfWeek.every((day) => state.weekData[day]);

  return (
    <div className="dashboard-container">
      {/* Display loading spinner while data is loading */}
      {state.loading && <LoadingSpinner />}

      <div className="dashboard-content">
        <h2 className="dashboard-title">Carbon Footprint Tracker</h2>

        {/* Display day input for the current day */}
        <div className="day-inputs">
          <DayInput
            day={daysOfWeek[state.currentDayIndex]}
            updateDayData={updateDayData}
          />
        </div>

        {/* Display total weekly emission when all days are completed */}
        {allDaysCompleted && (
          <>
            <h3>
              Total Weekly Emission: {calculateTotalEmission().toFixed(2)} kg
              CO2
            </h3>
            {/* Display results based on week data */}
            <Results entries={Object.values(state.weekData).flat()} />
          </>
        )}

        {/* Pagination buttons for navigating through the days of the week */}
        <div className="pagination">
          {daysOfWeek.map((day, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={`page-button ${
                state.currentDayIndex === index ? "active" : ""
              }`}
              aria-label={`Go to ${day}`}
            >
              {day} {/* Display the day name */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
