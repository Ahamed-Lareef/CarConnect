require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Configuration
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const db = client.db("CarConnect");
    const bookingsCollection = db.collection("Bookings");
    const usersCollection = db.collection("Users");
    const stationsCollection = db.collection("Stations"); // New Stations Collection

    // ✅ **User Login API**
    app.post("/api/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await usersCollection.findOne({ email });

        if (!user || user.password !== password) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        // Automatically update role from "customer" to "service_provider"
        if (user.role === "customer") {
          const result = await usersCollection.updateOne(
            { _id: user._id },
            { $set: { role: "service_provider" } }
          );

          if (result.modifiedCount === 0) {
            return res.status(400).json({ message: "Role update failed." });
          }
        }

        res.json({ message: "Login successful", user: { email: user.email, role: user.role } });
      } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    });

    // ✅ **Create Booking**
    app.post("/api/bookings", async (req, res) => {
      try {
        const { serviceType, location, amount, ...otherData } = req.body;

        if (serviceType === "mobile" && !location) {
          return res.status(400).json({ message: "Location is required for mobile service." });
        }

        const newBooking = { ...otherData, location, paymentStatus: "Pending", amount };
        const result = await bookingsCollection.insertOne(newBooking);

        res.status(201).json({ message: "Service booked successfully!", bookingId: result.insertedId });
      } catch (error) {
        res.status(500).json({ message: "Error creating booking", error: error.message });
      }
    });

    // ✅ **Get All Bookings or Filter by Email**
    app.get("/api/bookings", async (req, res) => {
      try {
        const { email } = req.query;
        let query = email ? { email } : {}; // Filter by email if provided

        const bookings = await bookingsCollection.find(query).toArray();

        if (bookings.length === 0) {
          return res.status(404).json({ message: "No bookings found" });
        }

        res.status(200).json(bookings);
      } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message });
      }
    });

    // ✅ **Get Single Booking by ID**
    app.get("/api/bookings/:id", async (req, res) => {
      try {
        const booking = await bookingsCollection.findOne({ _id: new ObjectId(req.params.id) });

        if (!booking) {
          return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(booking);
      } catch (error) {
        res.status(500).json({ message: "Error retrieving booking", error: error.message });
      }
    });

    // ✅ **Update Booking**
    app.patch("/api/bookings/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const updateData = req.body;

        if (!updateData.appointmentDate || !updateData.time) {
          return res.status(400).json({ message: "Appointment date and time are required." });
        }

        delete updateData._id; // Ensure _id is not modified
        const result = await bookingsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateData });

        if (result.modifiedCount === 0) {
          return res.status(404).json({ message: "Booking not found or no changes made." });
        }

        res.status(200).json({ message: "Booking updated successfully." });
      } catch (error) {
        res.status(500).json({ message: "Error updating booking.", error: error.message });
      }
    });

    // ✅ **Delete Booking**
    app.delete("/api/bookings/:id", async (req, res) => {
      try {
        const result = await bookingsCollection.deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error deleting booking", error: error.message });
      }
    });

    // ✅ **Add Station** (New Endpoint)
    app.post("/api/stations", async (req, res) => {
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

        // Create a new station object
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

        // Insert the new station into the stations collection
        const result = await stationsCollection.insertOne(newStation);

        // Respond with success message
        return res.status(201).json({
          message: "Station registered successfully!",
          stationId: result.insertedId,
        });
      } catch (error) {
        console.error("Error adding station", error);
        return res.status(500).json({ message: "Error adding station", error: error.message });
      }
    });

    app.get("/api/stations", async (req, res) => {
      try {
        const { location } = req.query; // Get location from query params
        let query = {};
        if (location) {
          query.location = { $regex: location, $options: 'i' }; // Case-insensitive search for location
        }
    
        const stations = await stationsCollection.find(query).toArray();
        
        console.log('Stations data:', stations); // Log the data to inspect it
    
        if (stations.length === 0) {
          return res.status(200).json([]); // Return an empty array if no stations found
        }
    
        res.status(200).json(stations);
      } catch (error) {
        res.status(500).json({ message: "Error fetching stations", error: error.message });
      }
    });
    

    // ✅ **Start the Server**
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
}

run();
