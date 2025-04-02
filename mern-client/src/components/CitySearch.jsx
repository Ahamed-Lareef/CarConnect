import React, { useState } from "react";
import axios from "axios";

const CitySearch = () => {
  const [city, setCity] = useState("");
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle city input change
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Format time to a more readable format
  const formatTime = (time) => {
    const date = new Date(`1970-01-01T${time}:00Z`);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Fetch stations based on the city entered
  const fetchStations = async () => {
    if (!city.trim()) {
      setError("Please enter a city.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:5000/api/stations", {
        params: { location: city },
      });

      if (Array.isArray(response.data)) {
        // If services are in string format, split them into an array
        const updatedStations = response.data.map((station) => {
          if (typeof station.services === "string") {
            station.services = station.services.split(",").map(service => service.trim()); // Trim spaces
          }
          return station;
        });
        setStations(updatedStations);
      } else {
        setError("Unexpected response format.");
      }
    } catch (err) {
      setError("Failed to fetch stations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="flex flex-col items-center py-8">
        <input
          type="text"
          placeholder="Enter your city..."
          className="p-3 rounded border border-[#636363] focus:outline-none mb-4"
          value={city}
          onChange={handleCityChange}
        />
        <button
          onClick={fetchStations}
          className="bg-[#dc323f] hover:bg-[#c02a36] text-[#f8f8f6] px-6 py-3 rounded transition-colors"
        >
          Find Services
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
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p>No stations found for this location.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitySearch;
