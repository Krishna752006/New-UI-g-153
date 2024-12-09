import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { AppIcon } from './icons/AppIcon';

export function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-purple-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <AppIcon />
            <span className="font-bold text-xl">IPL Predictor</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-purple-200">Dashboard</Link>
                <Link to="/predictions" className="hover:text-purple-200">My Predictions</Link>
                <Link to="/teams" className="hover:text-purple-200">Teams</Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-purple-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                className="flex items-center space-x-1 hover:text-purple-200"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}