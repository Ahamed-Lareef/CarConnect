import React, { useState } from 'react';
import axios from 'axios';

const StationRegistration = () => {
  const [formData, setFormData] = useState({
    stationName: '',
    ownerName: '',
    email: '',
    phone: '',
    location: '',
    services: [],
    openingHours: '',
    closingHours: '',
    password: '',
    confirmPassword: ''
  });

  const serviceOptions = [
    "Basic Wash",
    "Premium Wash",
    "Deep Cleaning & Waxing",
    "Eco-Friendly Waterless Wash",
    "Engine Bay Cleaning"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        services: checked 
          ? [...prev.services, value] 
          : prev.services.filter(service => service !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Convert services array to a comma-separated string
    const servicesString = formData.services.join(',');

    const newStation = {
      ...formData,
      services: servicesString // Sending services as a string
    };

    try {
      const response = await axios.post('http://localhost:5000/api/stations', newStation, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert(`Error submitting form: ${error.response?.data.message || error.message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-[#dc323f]">Register Your Car Wash Station</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input type="text" name="stationName" placeholder="Station Name" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="ownerName" placeholder="Owner's Name" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required className="w-full p-2 border rounded" />
        
        <div>
          <p className="font-semibold">Select Services Offered:</p>
          {serviceOptions.map(service => (
            <label key={service} className="block">
              <input type="checkbox" value={service} onChange={handleChange} /> {service}
            </label>
          ))}
        </div>
        
        <div className="flex space-x-4">
          <input type="time" name="openingHours" placeholder="Opening Hours" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="time" name="closingHours" placeholder="Closing Hours" onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>
        
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required className="w-full p-2 border rounded" />
        
        <button type="submit" className="w-full bg-[#dc323f] text-white p-2 rounded hover:bg-red-600">Register Station</button>
      </form>
    </div>
  );
};

export default StationRegistration;
