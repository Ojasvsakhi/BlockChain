import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import App from "./Login";
import IssuerDashboard from "./pages/IssuerDashboard";
import UserDashboard from "./pages/UserDashboard";
import VerifierDashboard from "./pages/VerifierDashboard";
import UserProfile from "./components/UserProfile";
function MainApp() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <Routes>
      {/* Login page */}
      <Route path="/" element={<App />} />
      {/* Verifier Dashboard */}
      <Route 
        path="/VerifierDashboard" 
        element={<VerifierDashboard />}
      />
      {/* User Dashboard */}
      <Route
        path="/UserDashboard"
        element={
          isAuthenticated ? <UserDashboard /> : <Navigate to="/" />
        }
      />

      {/* Issuer Dashboard */}
      <Route
        path="/IssuerDashboard"
        element={
          isAuthenticated ? <IssuerDashboard /> : <Navigate to="/" />
        }
      />
      <Route path="/UserProfile" element={<UserProfile />} />
      {/* Default Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default MainApp;
