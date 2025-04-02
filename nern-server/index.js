require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const stationRoutes = require("./routes/stationRoutes");
const db = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
db.connect();

// Routes
app.use("/api", authRoutes);
app.use("/api", bookingRoutes);
app.use("/api", stationRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
