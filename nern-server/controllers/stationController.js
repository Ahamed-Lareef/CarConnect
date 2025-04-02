const stationModel = require("../models/stationModel");

async function addStation(req, res) {
  try {
    const {
      stationName,
      ownerName,
      email,
      phone,
      location,
      services,
      openingHours,
      closingHours,
      password,
      confirmPassword
    } = req.body;

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    const newStation = {
      stationName,
      ownerName,
      email,
      phone,
      location,
      services,
      openingHours,
      closingHours,
      password,
      createdAt: new Date(),
    };

    const stationId = await stationModel.addStation(newStation);

    return res.status(201).json({
      message: "Station registered successfully!",
      stationId,
    });
  } catch (error) {
    console.error("Error adding station", error);
    return res.status(500).json({ message: "Error adding station", error: error.message });
  }
}

async function getStations(req, res) {
  try {
    const { location } = req.query;
    let query = {};
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const stations = await stationModel.getStations(query);

    if (stations.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stations", error: error.message });
  }
}

module.exports = { addStation, getStations };
