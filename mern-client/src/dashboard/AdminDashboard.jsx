import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stations, setStations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, stationsRes, bookingsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/users"),
        axios.get("http://localhost:5000/api/stations"),
        axios.get("http://localhost:5000/api/bookings"),
      ]);

      setUsers(usersRes.data);
      setStations(stationsRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const deleteStation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stations/${id}`);
      setStations(stations.filter(station => station._id !== id));
    } catch (err) {
      console.error("Failed to delete station:", err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center bg-gray-800 p-4 rounded-md shadow-md mb-6">
        <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Users</h3>
        <table className="w-full table-auto border-collapse mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left text-sm text-gray-600">Name</th>
              <th className="border p-3 text-left text-sm text-gray-600">Email</th>
              <th className="border p-3 text-left text-sm text-gray-600">Role</th>
              <th className="border p-3 text-left text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border p-3 text-sm">{user.name}</td>
                <td className="border p-3 text-sm">{user.email}</td>
                <td className="border p-3 text-sm">{user.role}</td>
                <td className="border p-3 text-sm">
                  <button onClick={() => deleteUser(user._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Stations</h3>
        <table className="w-full table-auto border-collapse mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left text-sm text-gray-600">Station Name</th>
              <th className="border p-3 text-left text-sm text-gray-600">Location</th>
              <th className="border p-3 text-left text-sm text-gray-600">Services</th>
              <th className="border p-3 text-left text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station) => (
              <tr key={station._id} className="hover:bg-gray-50">
                <td className="border p-3 text-sm">{station.stationName}</td>
                <td className="border p-3 text-sm">{station.location}</td>
                <td className="border p-3 text-sm">{station.services.join(", ")}</td>
                <td className="border p-3 text-sm">
                  <button onClick={() => deleteStation(station._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Bookings</h3>
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left text-sm text-gray-600">User</th>
              <th className="border p-3 text-left text-sm text-gray-600">Station</th>
              <th className="border p-3 text-left text-sm text-gray-600">Service</th>
              <th className="border p-3 text-left text-sm text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="border p-3 text-sm">{booking.userEmail}</td>
                <td className="border p-3 text-sm">{booking.stationName}</td>
                <td className="border p-3 text-sm">{booking.serviceType}</td>
                <td className="border p-3 text-sm">{new Date(booking.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
