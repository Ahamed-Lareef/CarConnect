const { ObjectId } = require("mongodb");
const db = require("../config/db");
const bookingsCollection = db.client.db("CarConnect").collection("Bookings");

async function createBooking(data) {
  const result = await bookingsCollection.insertOne(data);
  return result.insertedId;
}

async function getAllBookings(query = {}) {
  return await bookingsCollection.find(query).toArray();
}

async function getBookingById(id) {
  return await bookingsCollection.findOne({ _id: new ObjectId(id) });
}

async function updateBooking(id, updateData) {
  return await bookingsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
}

async function deleteBooking(id) {
  return await bookingsCollection.deleteOne({ _id: new ObjectId(id) });
}

module.exports = { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking };
