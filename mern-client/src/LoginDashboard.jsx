import React from "react";
import { Link } from "react-router-dom";

const LoginDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Login As</h1>
        <div className="space-y-4">
          <Link
            to="/loginCustomer"
            className="block w-60 px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-800 transition"
          >
            Customer
          </Link>
          <Link
            to="/loginServiceProvider"
            className="block w-60 px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-800 transition"
          >
            Service Provider
          </Link>
          <Link
            to="/adminLogin"
            className="block w-60 px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-800 transition"
          >
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginDashboard;
