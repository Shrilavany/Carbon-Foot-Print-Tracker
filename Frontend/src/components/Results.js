import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import html2canvas from "html2canvas"; // Import html2canvas
import "./Results.css";
import Profile from "./Profile"; // Import Profile component

// Register chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const vehicleImages = {
  Car: "https://i.pinimg.com/564x/d9/5c/d0/d95cd04d85043401df2b957eeba934cd.jpg",
  Bike: "https://i.pinimg.com/736x/fd/6a/92/fd6a9223e1cf388fa6d79ad73559b76f.jpg",
  Scooter:
    "https://i.pinimg.com/564x/08/00/32/080032b87d3972ce42aa885a32b5106d.jpg",
  Auto: "https://i.pinimg.com/564x/32/84/74/328474138abea310481783b232f46e74.jpg",
  Truck:
    "https://i.pinimg.com/564x/92/0c/e0/920ce0438fa2da257f32b21a8d6b285d.jpg",
  Bus: "https://i.pinimg.com/564x/a2/f7/41/a2f741dba80999d6b5da41e8584bf766.jpg",
  Flight:
    "https://i.pinimg.com/564x/05/63/45/056345307771dee34e8fc6e6bf62fe62.jpg",
};

// Emission factors in grams of CO2 per kilometer
const emissionFactors = {
  Car: 120,
  Bike: 80,
  Scooter: 60,
  Auto: 90,
  Truck: 180,
  Bus: 100,
  Flight: 250,
};

// Array of days of the week
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Results = () => {
  const location = useLocation();
  const componentRef = useRef(); // Create a ref for the component

  // State to store entries
  const [entriesWithEmissions, setEntriesWithEmissions] = useState([]);

  // State for profile information
  const [profileName, setProfileName] = useState("User");
  const [profileDetails, setProfileDetails] = useState({});

  // Retrieve data from localStorage on component mount
  useEffect(() => {
    const storedEntries = JSON.parse(
      localStorage.getItem("entriesWithEmissions")
    );
    const storedProfileName = localStorage.getItem("profileName");
    const storedProfileDetails = JSON.parse(
      localStorage.getItem("profileDetails")
    );

    if (storedEntries) setEntriesWithEmissions(storedEntries);
    if (storedProfileName) setProfileName(storedProfileName);
    if (storedProfileDetails) setProfileDetails(storedProfileDetails);
  }, []);

  // Update state from location if available and save to localStorage
  useEffect(() => {
    if (location.state) {
      const {
        entries = [],
        profileName = "User",
        profileDetails = {},
      } = location.state;

      // Calculate emissions based on kilometers and vehicle type
      const calculatedEntries = entries.map((entry) => {
        const emissionFactor = emissionFactors[entry.vehicleType] || 100;
        const emissions = entry.kilometers * emissionFactor;
        return { ...entry, emissions };
      });

      // Save to state and localStorage
      setEntriesWithEmissions(calculatedEntries);
      setProfileName(profileName);
      setProfileDetails(profileDetails);

      // Store in localStorage
      localStorage.setItem(
        "entriesWithEmissions",
        JSON.stringify(calculatedEntries)
      );
      localStorage.setItem("profileName", profileName);
      localStorage.setItem("profileDetails", JSON.stringify(profileDetails));
    }
  }, [location.state]);

  // Calculate total emissions for the week
  const totalEmissions = entriesWithEmissions.reduce(
    (total, entry) => total + entry.emissions,
    0
  );

  // Create labels based on days of the week
  const chartLabels = entriesWithEmissions.map(
    (_, index) => daysOfWeek[index % daysOfWeek.length]
  );

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Kilometers",
        data: entriesWithEmissions.map((entry) => entry.kilometers),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        yAxisID: "y1",
      },
      {
        label: "Emissions",
        data: entriesWithEmissions.map((entry) => entry.emissions),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        yAxisID: "y2",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      y1: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Kilometers",
        },
        beginAtZero: true,
      },
      y2: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Emissions (gCO2)",
        },
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const shareText = `Hi! I am ${profileName}. Here are my emissions data for the week:
${entriesWithEmissions
  .map(
    (entry, index) =>
      `${daysOfWeek[index % daysOfWeek.length]} - ${entry.vehicleType} - ${
        entry.vehicleBrand
      } - ${entry.date} ${entry.time}: ${entry.emissions.toFixed(2)} gCO2`
  )
  .join("\n")}
Total Emissions: ${totalEmissions.toFixed(2)} gCO2
Profile Name: ${profileName}`;

  const downloadJPG = () => {
    const element = componentRef.current;

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "results.jpg";
      link.href = canvas.toDataURL("image/jpeg");
      link.click();
    });
  };

  return (
    <div className="results-container" ref={componentRef}>
      <Profile profileName={profileName} profileDetails={profileDetails} />
      <h1>Results for {profileName}</h1>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="vehicle-images">
        {entriesWithEmissions.length > 0 ? (
          entriesWithEmissions.map((entry, index) => (
            <div key={index} className="vehicle-entry">
              <img
                src={
                  vehicleImages[entry.vehicleType] ||
                  "https://i.pinimg.com/564x/a0/75/30/a0753076a5223b646bec6a454a325eee.jpg"
                }
                alt={entry.vehicleType}
              />
              <p>
                {entry.vehicleType} - {entry.vehicleBrand}
              </p>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
      <div className="emissions-section">
        <h2>Emissions Data</h2>
        {entriesWithEmissions.length > 0 ? (
          entriesWithEmissions.map((entry, index) => (
            <p key={index}>
              {daysOfWeek[index % daysOfWeek.length]} - {entry.vehicleType} -{" "}
              {entry.vehicleBrand} - {entry.date} {entry.time}:{" "}
              {entry.emissions.toFixed(2)} gCO2
            </p>
          ))
        ) : (
          <p>No data available</p>
        )}
        <h3>Total Emissions: {totalEmissions.toFixed(2)} gCO2</h3>
      </div>
      <div className="share-buttons">
        <h3>Share your results:</h3>
        <FacebookShareButton url={window.location.href} quote={shareText}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={window.location.href} title={shareText}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={window.location.href} summary={shareText}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <WhatsappShareButton url={window.location.href} title={shareText}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

      <button onClick={downloadJPG}>Download JPG</button>
    </div>
  );
};

export default Results;
