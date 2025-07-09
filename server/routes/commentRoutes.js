// routes/commentRoutes.js
const express = require('express');
const {
  addComment,
  getCommentsByPost,
  deleteComment,
} = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public: Add a comment to a specific post
router.post('/:postId', addComment);

// Public: Get all comments for a specific post
router.get('/:postId', getCommentsByPost);

// Protected: Delete comment (admin only)
router.delete('/:commentId', protect, deleteComment);

module.exports = router;
