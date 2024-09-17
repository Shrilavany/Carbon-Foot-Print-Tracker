// src/components/Results.js
import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

const Results = ({ entries }) => {
  if (!Array.isArray(entries) || entries.length === 0) {
    return <div>No results to display</div>;
  }

  // Prepare data for pie chart (emissions by vehicle type)
  const emissionData = entries.reduce((acc, entry) => {
    acc[entry.vehicleType] = (acc[entry.vehicleType] || 0) + entry.emission;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(emissionData),
    datasets: [
      {
        label: "Emissions by Vehicle Type",
        data: Object.values(emissionData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for bar chart (distance traveled by vehicle type)
  const distanceData = entries.reduce((acc, entry) => {
    acc[entry.vehicleType] =
      (acc[entry.vehicleType] || 0) + parseFloat(entry.kilometers);
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(distanceData),
    datasets: [
      {
        label: "Distance Traveled by Vehicle Type (km)",
        data: Object.values(distanceData),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Results</h2>
      <div className="chart-container">
        <h3>Emissions by Vehicle Type</h3>
        <Pie data={pieData} />
      </div>
      <div className="chart-container">
        <h3>Distance Traveled by Vehicle Type</h3>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Results;
