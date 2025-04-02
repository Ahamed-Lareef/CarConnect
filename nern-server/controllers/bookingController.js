const bookingModel = require("../models/bookingModel");

async function createBooking(req, res) {
  try {
    const { serviceType, location, amount, ...otherData } = req.body;

    if (serviceType === "mobile" && !location) {
      return res.status(400).json({ message: "Location is required for mobile service." });
    }

    const newBooking = { ...otherData, location, paymentStatus: "Pending", amount };
    const bookingId = await bookingModel.createBooking(newBooking);

    res.status(201).json({ message: "Service booked successfully!", bookingId });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
}

async function getBookings(req, res) {
  try {
    const { email } = req.query;
    const query = email ? { email } : {}; // Filter by email if provided
    const bookings = await bookingModel.getAllBookings(query);

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
}

async function getBookingById(req, res) {
  try {
    const booking = await bookingModel.getBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving booking", error: error.message });
  }
}

async function updateBooking(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!updateData.appointmentDate || !updateData.time) {
      return res.status(400).json({ message: "Appointment date and time are required." });
    }

    delete updateData._id; // Ensure _id is not modified
    const result = await bookingModel.updateBooking(id, updateData);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Booking not found or no changes made." });
    }

    res.status(200).json({ message: "Booking updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error updating booking.", error: error.message });
  }
}

async function deleteBooking(req, res) {
  try {
    const result = await bookingModel.deleteBooking(req.params.id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error: error.message });
  }
}

module.exports = { createBooking, getBookings, getBookingById, updateBooking, deleteBooking };
