import { useState } from "react";
import axios from "axios";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (response.data.user.role === "admin") {
        onLogin(response.data.user);
      } else {
        setError("Only admins can log in.");
      }
    } catch (err) {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <input
        type="email"
        placeholder="Admin Email"
        className="p-3 border rounded mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="p-3 border rounded mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Login
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default AdminLogin;
