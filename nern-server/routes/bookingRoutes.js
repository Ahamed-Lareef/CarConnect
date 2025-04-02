const express = require("express");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router.post("/bookings", bookingController.createBooking);
router.get("/bookings", bookingController.getBookings);
router.get("/bookings/:id", bookingController.getBookingById);
router.patch("/bookings/:id", bookingController.updateBooking);
router.delete("/bookings/:id", bookingController.deleteBooking);

module.exports = router;
