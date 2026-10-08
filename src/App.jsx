import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { PortfolioProvider } from "./context/PortfolioContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <ToastContainer position="top-right" autoClose={2500} theme="colored" />
          <Routes>
            {/* Public Portfolio Route */}
            <Route path="/" element={<Home />} />

            {/* Admin Authentication Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Admin CMS Dashboard Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
