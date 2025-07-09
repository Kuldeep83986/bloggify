import React, { useEffect, useState } from 'react';
import axios from '../../api/axios'; // your axios instance with auth token

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users from backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user by id
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`/users/${id}`);
      // Refresh list after deletion
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Username</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Role</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ _id, username, email, role }) => (
              <tr key={_id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{username}</td>
                <td className="border border-gray-300 p-2">{email}</td>
                <td className="border border-gray-300 p-2">{role}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => handleDelete(_id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllUsers;
