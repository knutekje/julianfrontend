// src/routes/AppRoutes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Availability from '../pages/Availability';
import ReservationListPage from '../pages/ReservationListPage';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import BookingPage from '../pages/BookingPage'; // Renamed for consistency
import GuestPage from '../pages/GuestPage';
import RoomGrid from '../components/RoomGrid';
import { SettingsPages } from '../pages/SettingsPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route: Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <Layout>
                <ReservationListPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/availability"
          element={
            <ProtectedRoute>
              <Layout>
                <Availability />
              </Layout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/guests"
          element={
            <ProtectedRoute>
              <Layout>
                <GuestPage/>
              </Layout>
            </ProtectedRoute>
          }
        />
           <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Layout>
                <RoomGrid/>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Layout>
                <BookingPage />
              </Layout>
            </ProtectedRoute>
          }
        />
             <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <SettingsPages />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Default Route: Redirect authenticated users to Dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
