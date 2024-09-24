import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Results from "./components/Results";
import About from "./components/About";
import Activities from "./components/Activities"; // Corrected the spelling
import Profile from "./components/Profile";
import DayInput from "./components/DayInput"; // Import DayInput component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/day-input" element={<DayInput />} />{" "}
        {/* Route for DayInput */}
        <Route path="/results" element={<Results />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/activities" element={<Activities />} />{" "}
        {/* Corrected spelling here */}
      </Routes>
    </Router>
  );
};

export default App;
