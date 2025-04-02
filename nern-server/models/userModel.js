const { ObjectId } = require("mongodb");
const db = require("../config/db");
const usersCollection = db.client.db("CarConnect").collection("Users");

async function findUserByEmail(email) {
  return await usersCollection.findOne({ email });
}

async function updateUserRole(id, role) {
  return await usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: { role } });
}

module.exports = { findUserByEmail, updateUserRole };
