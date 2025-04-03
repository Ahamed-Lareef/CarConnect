const { ObjectId } = require("mongodb");
const db = require("../config/db");
const stationsCollection = db.client.db("CarConnect").collection("Stations");

async function addStation(stationData) {
  const result = await stationsCollection.insertOne(stationData);
  return result.insertedId;
}

async function getStations(query = {}) {
  return await stationsCollection.find(query).toArray();
}

// New function to get stations by provider email
async function getStationsByEmail(email) {
  return await stationsCollection.find({ email }).toArray();
}

module.exports = { addStation, getStations, getStationsByEmail };
