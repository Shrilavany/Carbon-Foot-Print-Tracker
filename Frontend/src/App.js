import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Results from "./components/Results";
import About from "./components/About";
import Profile from "./components/Profile";

const App = () => {
  // Sample dayData to pass to the Results component
  const dayData = [
    {
      day: "Monday",
      entries: [
        {
          vehicleType: "Car",
          emission: 120,
          kilometers: 15,
        },
        {
          vehicleType: "Bike",
          emission: 40,
          kilometers: 25,
        },
      ],
    },
    {
      day: "Tuesday",
      entries: [
        {
          vehicleType: "Car",
          emission: 100,
          kilometers: 10,
        },
      ],
    },
    // Add more days and entries as needed
  ];

  // Choose a specific day's data to pass to Results, e.g., Monday's data
  const selectedDayData =
    dayData.find((day) => day.day === "Monday")?.entries || [];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/results"
          element={<Results entries={selectedDayData} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
