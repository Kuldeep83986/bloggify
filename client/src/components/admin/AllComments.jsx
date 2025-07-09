// src/components/admin/AllComments.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useParams } from 'react-router-dom';

const AllComments = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      setError('Failed to fetch comments');
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await axios.delete(`/comments/${commentId}`);
      // Refresh comments after deletion
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (err) {
      alert('Failed to delete comment');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      {error && <p className="text-red-500">{error}</p>}
      {comments.length === 0 ? (
        <p>No comments found.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment._id}
              className="bg-white p-4 shadow rounded-md border border-gray-200"
            >
              <p className="text-sm text-gray-500">
                User: {comment.user?.username || 'Anonymous'}
              </p>
              <p className="mt-1">{comment.text}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
              <button
                onClick={() => handleDelete(comment._id)}
                className="mt-2 inline-block text-red-600 text-sm hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllComments;
