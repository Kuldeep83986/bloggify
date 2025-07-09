import React, { useEffect, useState } from 'react';
import axios from '../../api/axios'; // your axios instance
import { useNavigate } from 'react-router-dom';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/posts'); // GET /api/posts
      setPosts(response.data);
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/edit-post/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`/posts/${id}`); // DELETE /api/posts/:id
      fetchPosts(); // Refresh list
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const handleViewComments = (postId) => {
    navigate(`/admin/comments/${postId}`);
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Author</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td className="border border-gray-300 p-2">{post.title}</td>
                <td className="border border-gray-300 p-2">{post.author?.username || 'N/A'}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(post._id)}
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleViewComments(post._id)}
                    className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    View Comments
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

export default AllPosts;
