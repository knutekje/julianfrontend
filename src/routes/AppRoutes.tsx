import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Availability from '../pages/Availability';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import BookingPage from '../pages/BookingPage'; 
import RoomGrid from '../components/RoomGrid';
import { SettingsPages } from '../pages/SettingsPage';
import GuestListPage from '../pages/GuestListPage';
import ReservationList from '../pages/ReservationListPage';
import BookingForm from '../components/ReservationForm';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

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
                <ReservationList/>
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
                <GuestListPage/>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route 
        path="/form"
        element={
          <ProtectedRoute>
            <Layout>
              <BookingForm/>
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

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
