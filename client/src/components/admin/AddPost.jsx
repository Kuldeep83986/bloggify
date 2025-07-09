// src/components/admin/AddPost.jsx
import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const [form, setForm] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('/posts', form);
      navigate('/admin/dashboard'); // Redirect after success
    } catch (err) {
      setError('Failed to add post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded h-40"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Adding...' : 'Add Post'}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
