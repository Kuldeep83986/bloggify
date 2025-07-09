import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to login after logout
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="dashboard" className="block hover:underline">All Posts</Link>
          <Link to="add-post" className="block hover:underline">Add Post</Link>
          <Link to="users" className="block hover:underline">All Users</Link>
          {/* <Link to="comments" className="block hover:underline">All Comments</Link> */}
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet /> {/* Nested admin components render here */}
      </main>
    </div>
  );
};

export default DashboardLayout;
