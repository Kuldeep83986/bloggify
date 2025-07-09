// src/components/Navbar.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to Home after logout
  };

  if (loading) return null;

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-blue-500 text-white">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
      </div>

      {/* Right side buttons */}
      <div className="space-x-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded cursor-pointer"
          >
            Logout
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
