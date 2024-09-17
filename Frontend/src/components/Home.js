// src/components/Home.js
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css"; // Import the CSS file

const Home = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  return (
    <div className="home-page">
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/activities">Activities</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link> {/* Link to Profile page */}
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <h1>Welcome, {username}</h1>
      <div className="carbon-footprint-content">
        <p>
          Our website helps you track the carbon footprint of your daily
          transportation. By monitoring your vehicle usage, you can become more
          aware of your environmental impact and take steps to reduce your
          carbon emissions. Start tracking today and make a positive change for
          the Earth!
        </p>
      </div>
      <button>
        <Link to="/dashboard">Start Tracking</Link>
      </button>
    </div>
  );
};

export default Home;
