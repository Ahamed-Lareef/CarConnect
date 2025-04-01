require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

    // ✅ **User Login API**
    app.post("/api/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await usersCollection.findOne({ email });

        if (!user || user.password !== password) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({ message: "Login successful", user: { email: user.email, role: user.role } });
      } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    });

    // ✅ **Create Booking**
    app.post("/api/bookings", async (req, res) => {
      try {
        const { serviceType, location, amount, payNow, ...otherData } = req.body;

        if (serviceType === "mobile" && !location) {
          return res.status(400).json({ message: "Location is required for mobile service." });
        }

        const newBooking = { ...otherData, location, paymentStatus: "Pending", amount };
        const result = await bookingsCollection.insertOne(newBooking);

        // If user chooses to pay now, create a Stripe payment session
        if (payNow) {
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
              {
                price_data: {
                  currency: "usd",
                  product_data: { name: serviceType },
                  unit_amount: amount * 100, // Convert to cents
                },
                quantity: 1,
              },
            ],
            mode: "payment",
            success_url: `http://localhost:3000/payment-success?bookingId=${result.insertedId}`,
            cancel_url: `http://localhost:3000/payment-failed`,
          });

          return res.json({ paymentUrl: session.url });
        }

        res.status(200).json({ message: "Service booked successfully!", bookingId: result.insertedId });
      } catch (error) {
        res.status(500).json({ message: "Error creating booking", error: error.message });
      }
    });

    // ✅ **Get All Bookings**
    app.get("/api/bookings", async (req, res) => {
      try {
        const bookings = await bookingsCollection.find().toArray();
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
        const { appointmentDate, time, ...updateData } = req.body;

        if (!appointmentDate || !time) {
          return res.status(400).json({ message: "Appointment date and time are required." });
        }

        const result = await bookingsCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: updateData }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).json({ message: "Booking not found or no changes made." });
        }

        res.status(200).json({ message: "Booking updated successfully." });
      } catch (error) {
        res.status(500).json({ message: "Error updating booking", error: error.message });
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

    // ✅ **Stripe Payment API**
    app.post("/api/payments", async (req, res) => {
      try {
        const { bookingId, paymentMethodId } = req.body;

        if (!bookingId || !paymentMethodId) {
          return res.status(400).json({ message: "Booking ID and payment method are required" });
        }

        // Fetch booking details
        const booking = await bookingsCollection.findOne({ _id: new ObjectId(bookingId) });

        if (!booking) {
          return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.paymentStatus === "Paid") {
          return res.status(400).json({ message: "Booking is already paid." });
        }

        // Create PaymentIntent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
          amount: booking.amount * 100, // Convert to cents
          currency: "usd",
          payment_method: paymentMethodId,
          confirm: true,
        });

        // Update booking status to Paid
        await bookingsCollection.updateOne(
          { _id: new ObjectId(bookingId) },
          { $set: { paymentStatus: "Paid", transactionId: paymentIntent.id } }
        );

        res.status(200).json({ success: true, message: "Payment successful!", paymentIntent });
      } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ success: false, message: error.message });
      }
    });

    // ✅ **Verify Payment API**
    app.post("/api/verify-payment", async (req, res) => {
      try {
        const { bookingId } = req.body;

        if (!bookingId) {
          return res.status(400).json({ message: "Booking ID is required." });
        }

        const booking = await bookingsCollection.findOne({ _id: new ObjectId(bookingId) });

        if (!booking) {
          return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.paymentStatus === "Paid") {
          return res.status(200).json({ message: "Payment already verified." });
        }

        await bookingsCollection.updateOne(
          { _id: new ObjectId(bookingId) },
          { $set: { paymentStatus: "Paid" } }
        );

        res.status(200).json({ message: "Payment verified successfully!" });
      } catch (error) {
        res.status(500).json({ message: "Error verifying payment", error: error.message });
      }
    });

    // ✅ **Start the Server**
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  }
}

run();
