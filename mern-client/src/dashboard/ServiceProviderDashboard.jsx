import React from "react";
import { Link } from "react-router-dom";

const ServiceProviderDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Service Provider Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Register Station */}
          <div className="bg-[#dc323f] text-white p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold">Register Your Station</h2>
            <p className="mt-2">Add your car wash station to our platform and start getting bookings.</p>
            <Link
              to="/stationRegistration"
              className="mt-4 inline-block bg-white text-[#dc323f] px-6 py-3 rounded-full hover:bg-[#f8f8f6] hover:text-[#dc323f] transition-all"
            >
              Register Now
            </Link>
          </div>

          {/* View Stations */}
          <div className="bg-[#f8f8f6] text-gray-800 p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold">View Your Stations</h2>
            <p className="mt-2">Manage and view your registered stations.</p>
            <Link
              to="/providerStations"
              className="mt-4 inline-block bg-[#dc323f] text-white px-6 py-3 rounded-full hover:bg-red-600 transition-all"
            >
              View Stations
            </Link>
          </div>

          {/* View Bookings */}
          <div className="bg-[#f8f8f6] text-gray-800 p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold">View Your Bookings</h2>
            <p className="mt-2">View and manage the bookings made for your station.</p>
            <Link
              to="/viewBookings"
              className="mt-4 inline-block bg-[#dc323f] text-white px-6 py-3 rounded-full hover:bg-red-600 transition-all"
            >
              View Bookings
            </Link>
          </div>

          {/* Additional Options (if needed) */}
          <div className="bg-[#f8f8f6] text-gray-800 p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold">More Options</h2>
            <p className="mt-2">Explore other features available for service providers.</p>
            <Link
              to="/moreOptions"
              className="mt-4 inline-block bg-[#dc323f] text-white px-6 py-3 rounded-full hover:bg-red-600 transition-all"
            >
              More Options
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;
