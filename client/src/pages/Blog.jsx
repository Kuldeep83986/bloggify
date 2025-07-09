// src/components/Blog.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/posts/postSlice';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Blog = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredPosts.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">Explore Our Blog</h1>

          {/* Search */}
          <div className="mb-10 flex justify-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search posts by title..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Error & Loading */}
          {loading && <p className="text-center text-gray-500">Loading posts...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Blog Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-blue-800 mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">
                    {post.summary || post.content?.slice(0, 120) + '...'}
                  </p>
                </div>
                <div className="mt-auto">
                  <Link
                    to={`/posts/${post._id}`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {!loading && !error && filteredPosts.length === 0 && (
            <p className="text-center text-gray-500 mt-6">No posts found.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentPage === index + 1
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blog;
