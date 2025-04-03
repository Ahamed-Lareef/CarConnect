import React, { useState } from "react";
import axios from "axios";

const ProviderStations = () => {
  const [email, setEmail] = useState("");
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Format time to a more readable format
  const formatTime = (time) => {
    const date = new Date(`1970-01-01T${time}:00Z`);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Fetch stations based on provider's email
  const fetchStationsByEmail = async () => {
    if (!email.trim()) {
      setError("Please enter an email.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:5000/api/stationsByEmail", {
        params: { email },
      });

      if (Array.isArray(response.data)) {
        setStations(response.data);
      } else {
        setError("Unexpected response format.");
      }
    } catch (err) {
      setError("Failed to fetch stations.");
    } finally {
      setLoading(false);
    }
  };

  // Delete station
  const deleteStation = async (stationId) => {
    try {
      await axios.delete(`http://localhost:5000/api/stations/${stationId}`);
      setStations(stations.filter(station => station._id !== stationId));
    } catch (err) {
      setError("Failed to delete station.");
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col items-center py-8">
        <input
          type="email"
          placeholder="Enter your email..."
          className="p-3 rounded border border-[#636363] focus:outline-none mb-4"
          value={email}
          onChange={handleEmailChange}
        />
        <button
          onClick={fetchStationsByEmail}
          className="bg-[#dc323f] hover:bg-[#c02a36] text-[#f8f8f6] px-6 py-3 rounded transition-colors"
        >
          View My Stations
        </button>

        {loading && <p className="text-[#636363]">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="mt-8">
          {stations.length > 0 ? (
            <ul>
              {stations.map((station) => (
                <li key={station._id} className="border-b py-4 px-6">
                  <h3 className="font-semibold text-lg">{station.stationName}</h3>
                  <p className="text-gray-600">{station.location}</p>
                  <p className="mt-2">
                    <strong>Services:</strong>{" "}
                    {Array.isArray(station.services)
                      ? station.services.join(", ")
                      : station.services}
                  </p>
                  <div className="mt-4">
                    <strong>Opening Hours: </strong>
                    <span>{formatTime(station.openingHours)}</span>
                  </div>
                  <div>
                    <strong>Closing Hours: </strong>
                    <span>{formatTime(station.closingHours)}</span>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => deleteStation(station._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => alert('Update functionality to be implemented')}
                      className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded"
                    >
                      Update
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p>No stations found for this email.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderStations;