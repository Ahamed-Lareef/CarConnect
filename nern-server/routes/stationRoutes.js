const express = require("express");
const stationController = require("../controllers/stationController");

const router = express.Router();

router.post("/stations", stationController.addStation);
router.get("/stations", stationController.getStations);

module.exports = router;
