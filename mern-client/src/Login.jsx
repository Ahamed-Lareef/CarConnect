import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!email || !password) {
      setError("All fields are required.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (data.role === "customer") {
          const confirmChange = window.confirm(
            "Would you like to become a Service Provider?"
          );
  
          if (confirmChange) {
            // Call the backend to update the role in the database
            const updateResponse = await fetch(
              `http://localhost:5000/api/users/${data._id}/updateRole`,
              {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: "service_provider" }),
              }
            );
  
            if (updateResponse.ok) {
              data.role = "service_provider"; // Update frontend role
              alert("You are now a Service Provider!");
            } else {
              alert("Failed to update role. Please try again.");
            }
          }
        }
  
        localStorage.setItem("user", JSON.stringify(data)); // Store updated user info
        navigate("/serviceProviderDashboard");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#dc323f] text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account? <a href="/signup" className="text-blue-500">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
