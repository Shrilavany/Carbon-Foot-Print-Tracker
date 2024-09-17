// models/Footprint.js
const mongoose = require("mongoose");

const FootprintSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    required: true,
  },
  distanceTravelled: {
    type: Number,
    required: true,
  },
  carbonFootprint: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Footprint", FootprintSchema);
