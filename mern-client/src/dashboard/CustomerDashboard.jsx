import React from 'react';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Home</Link>
                        </li>
                        <li>
                            <Link to="/updateProfile" className="text-gray-700 hover:text-blue-600">Update Profile</Link>
                        </li>
                        <li>
                            <Link to="/settings" className="text-gray-700 hover:text-blue-600">Account Settings</Link>
                        </li>
                        <li>
                            <button className="w-full text-left text-red-600 hover:text-red-800">Logout</button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h2>
                    <p className="text-gray-700 mb-4">Hello,</p>
                    
                    {/* Booking Details */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-800">Your Bookings:</h3>
                        <ul className="list-disc pl-5 text-gray-600">
                            
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CustomerDashboard;