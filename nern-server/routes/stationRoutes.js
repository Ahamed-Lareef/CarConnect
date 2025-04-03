const express = require("express");
const stationController = require("../controllers/stationController");

const router = express.Router();

// Existing routes
router.post("/stations", stationController.addStation);
router.get("/stations", stationController.getStations);

// New route to get stations by service provider's email
router.get("/stationsByEmail", stationController.getStationsByEmail);

module.exports = router;
