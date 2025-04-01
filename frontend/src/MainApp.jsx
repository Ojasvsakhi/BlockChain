import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import IssuerDashboard from "./pages/IssuerDashboard";
import UserDashboard from "./pages/UserDashboard";
import VerifierDashboard from "./pages/VerifierDashboard";
import UserProfile from "./components/UserProfile";
import Login3rdparty from "./Login3rdparty";
function MainApp() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <Routes>
      {/* Login Page */}
      <Route path="/" element= {<Login />} />
      {/*3rd Party Login page */}
      <Route path="/3rdparty" element={<Login3rdparty />} />
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
