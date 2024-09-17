// routes/footprints.js
const express = require("express");
const router = express.Router();
const Footprint = require("../models/Footprint");

// POST request to add a new footprint record
router.post("/", async (req, res) => {
  try {
    const newFootprint = new Footprint(req.body);
    const savedFootprint = await newFootprint.save();
    res.status(201).json(savedFootprint);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET request to retrieve all footprint records
router.get("/", async (req, res) => {
  try {
    const footprints = await Footprint.find();
    res.status(200).json(footprints);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
