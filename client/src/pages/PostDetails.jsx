// src/components/PostDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../api/axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { fetchPostById } from '../features/posts/postSlice';

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singlePost, loading, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [loadingComments, setLoadingComments] = useState(true);

  // Fetch post details
  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  // Fetch comments
  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const res = await axios.get(`/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  // Submit comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!commentText.trim()) {
      setSubmitError('Comment cannot be empty.');
      return;
    }

    try {
      await axios.post(`/comments/${id}`, {
        text: commentText,
        userName: user?.username || 'Anonymous',
      });

      setCommentText('');
      fetchComments(); // Refresh comments
    } catch (err) {
      console.error(err);
      setSubmitError('Failed to add comment.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4 max-w-4xl mx-auto">
        {loading && <p className="text-center">Loading post...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {singlePost && (
          <div className="bg-white shadow rounded-lg p-6 mb-10">
            <h1 className="text-3xl font-bold text-blue-700 mb-4">{singlePost.title}</h1>
            <p className="text-gray-700 whitespace-pre-wrap">{singlePost.content}</p>
          </div>
        )}

        {/* Comments Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>

          {loadingComments ? (
            <p>Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          ) : (
            <ul className="space-y-4 mb-6 max-h-60 overflow-y-auto">
              {comments.map((comment) => (
                <li key={comment._id} className="border-b border-gray-200 pb-3">
                  <p className="text-gray-800">{comment.text}</p>
                  <small className="text-gray-500">
                    By {comment.userName || 'Anonymous'} on{' '}
                    {new Date(comment.createdAt).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleCommentSubmit} className="space-y-4 mt-4">
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={4}
              placeholder="Write your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            {submitError && <p className="text-red-500">{submitError}</p>}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add Comment
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostDetails;
