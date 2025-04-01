import React, { useState } from "react";

const ServiceProviderSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    services: [],
  });

  const serviceOptions = ["Car Wash", "Interior Cleaning", "Oil Change", "Tire Change", "Engine Check"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (service) => {
    setFormData((prevData) => ({
      ...prevData,
      services: prevData.services.includes(service)
        ? prevData.services.filter((s) => s !== service)
        : [...prevData.services, service],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Service Provider Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" required />

          <div className="space-y-2">
            <p className="font-semibold">Select Services:</p>
            {serviceOptions.map((service) => (
              <label key={service} className="flex items-center space-x-2">
                <input type="checkbox" checked={formData.services.includes(service)} onChange={() => handleCheckboxChange(service)} />
                <span>{service}</span>
              </label>
            ))}
          </div>

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-800">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceProviderSignup;
