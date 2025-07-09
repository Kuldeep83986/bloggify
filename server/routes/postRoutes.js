const express = require('express');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getAllPosts)          // Public
  .post(protect, admin, createPost);  // Admin only

router.route('/:id')
  .get(getPostById)          // Public
  .put(protect, admin, updatePost)    // Admin only
  .delete(protect, admin, deletePost);// Admin only

module.exports = router;
