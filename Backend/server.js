require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Basic route to test server
app.get("/", (req, res) => {
  res.send("Carbon Footprint Tracker API is running");
});

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI) // Removed deprecated options
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Use routes
const footprintRoutes = require("./routes/footprints");
app.use("/api/footprints", footprintRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
