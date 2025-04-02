import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role is 'customer'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    try {
      // Send registration details to the backend
      const response = await axios.post('http://localhost:5000/api/signup', {
        name,
        email,
        password,
        role,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#0b0c0e] shadow-lg rounded-lg mt-10 text-white">
      <h1 className="text-3xl font-bold text-[#dc323f] text-center mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Full Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Select Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] text-white"
          >
            <option value="customer">Customer</option>
            <option value="serviceProvider">Service Provider</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-[#dc323f] text-white rounded-md hover:bg-[#b01e2b] transition-all"
        >
          Sign Up
        </button>
      </form>

      {message && <p className="mt-4 text-center text-[#f8f8f6]">{message}</p>}

      {/* Link to Login Page */}
      <div className="mt-6 text-center">
        <p className="text-sm text-[#f8f8f6]">
          Already have an account?{' '}
          <Link to="/loginForm" className="text-[#dc323f] hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
