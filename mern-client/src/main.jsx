import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router.jsx";
import { AuthProvider } from "./AuthContext"; // ✅ Import AuthProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider> {/* ✅ Wrap everything with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
