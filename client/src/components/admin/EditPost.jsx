// src/components/admin/EditPost.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch post data on mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setForm({ title: res.data.title, content: res.data.content });
      } catch (err) {
        setError('Failed to load post data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.put(`/posts/${id}`, form);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to update post.');
    }
  };

  if (loading) return <p>Loading post...</p>;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
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
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
