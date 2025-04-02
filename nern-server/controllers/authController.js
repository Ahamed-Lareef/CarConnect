const userModel = require("../models/userModel");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findUserByEmail(email);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Automatically update role from "customer" to "service_provider"
    if (user.role === "customer") {
      const result = await userModel.updateUserRole(user._id, "service_provider");

      if (result.modifiedCount === 0) {
        return res.status(400).json({ message: "Role update failed." });
      }
    }

    res.json({ message: "Login successful", user: { email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = { login };
