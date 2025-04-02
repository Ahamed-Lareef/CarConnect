
import { useState } from "react";

const Booking = () => {
  const [formData, setFormData] = useState({
    userId: Math.floor(Math.random() * 10000), // Temporary User ID
    name: "",
    email: "",
    contact: "",
    serviceType: "",
    vehicleNumber: "",
    vehicleType: "",
    make: "",
    model: "",
    appointmentDate: "",
    time: "",
    location: "",
    washType: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-[#0b0c0e] shadow-lg rounded-lg mt-10 text-white mb-20">
      <h2 className="text-3xl font-bold text-[#dc323f] text-center mb-6">Book a Car Wash</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={formData.name}
            required
            className="p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={formData.email}
            required
            className="p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            onChange={handleChange}
            value={formData.contact}
            required
            className="p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] w-full"
          />
          <input
            type="text"
            name="vehicleNumber"
            placeholder="Vehicle Number"
            onChange={handleChange}
            value={formData.vehicleNumber}
            required
            className="p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] w-full"
          />
        </div>

        {/* Service Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="serviceType"
            onChange={handleChange}
            value={formData.serviceType}
            required
            className="p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] w-full"
          >
            <option value="">Select Service Type</option>
            <option value="station">Station Service</option>
            <option value="mobile">Mobile Service</option>
          </select>

          <select
            name="washType"
            onChange={handleChange}
            value={formData.washType}
            required
            className="p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] w-full"
          >
            <option value="">Select Wash Type</option>
            <option value="basic">Basic Wash</option>
            <option value="premium">Premium Wash</option>
            <option value="deep">Deep Cleaning & Waxing</option>
            <option value="eco">Eco-Friendly Waterless Wash</option>
            <option value="engine">Engine Bay Cleaning</option>
          </select>
        </div>

        {/* Vehicle Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="vehicleType"
            placeholder="Vehicle Type (e.g., Sedan, SUV)"
            onChange={handleChange}
            value={formData.vehicleType}
            required
            className="p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] w-full"
          />
          <input
            type="text"
            name="make"
            placeholder="Vehicle Make (e.g., Toyota)"
            onChange={handleChange}
            value={formData.make}
            required
            className="p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] w-full"
          />
        </div>

        <input
          type="text"
          name="model"
          placeholder="Vehicle Model (e.g., Corolla)"
          onChange={handleChange}
          value={formData.model}
          required
          className="p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] w-full"
        />

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="appointmentDate"
            onChange={handleChange}
            value={formData.appointmentDate}
            required
            className="p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] w-full"
          />
          <input
            type="time"
            name="time"
            onChange={handleChange}
            value={formData.time}
            required
            className="p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] w-full"
          />
        </div>

        {/* Location (only for mobile service) */}
        {formData.serviceType === "mobile" && (
          <input
            type="text"
            name="location"
            placeholder="Location (Required for mobile service)"
            onChange={handleChange}
            value={formData.location}
            required
            className="p-3 bg-[#222222] border border-[#333] rounded-md focus:ring-2 focus:ring-[#dc323f] w-full"
          />
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#dc323f] text-white p-3 rounded-md hover:bg-[#b01e2b] transition-all"
        >
          Book Service
        </button>
      </form>
    </div>
  );
};

export default Booking;
