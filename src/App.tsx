import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Teams } from './pages/Teams';
import { PredictionHistory } from './pages/PredictionHistory';
import { Contact } from './pages/Contact';
import { useAuthStore } from './store/authStore';

function App() {
  const user = useAuthStore((state) => state.user);

  // Log the user state for debugging purposes
  useEffect(() => {
    console.log('User state:', user);
  }, [user]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Render the Navbar on every page */}
        <Navbar />

        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes (only accessible if user is logged in) */}
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/teams"
            element={user ? <Teams /> : <Navigate to="/login" />}
          />
          <Route
            path="/predictions"
            element={user ? <PredictionHistory /> : <Navigate to="/login" />}
          />

          {/* Contact page is accessible without login */}
          <Route path="/contact" element={<Contact />} />

          {/* Redirect to dashboard if no route is matched */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
