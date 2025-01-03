// src/routes/AppRoutes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Availability } from '../pages/Availability';
import { Reservation } from '../pages/Reservation';

import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/availability"
        element={
          <ProtectedRoute>
            <Availability />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reservation"
        element={
          <ProtectedRoute>
            <Reservation />
          </ProtectedRoute>
        }
      />

      {/* Default Route */}
      <Route path="*" element={<Login />} />
    </Routes>
  </Router>
);

export default AppRoutes;
