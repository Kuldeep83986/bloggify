// controllers/commentController.js
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Add comment to a post (public)
exports.addComment = async (req, res) => {
  const { text, userName } = req.body;
  const postId = req.params.postId;

  if (!text) return res.status(400).json({ message: 'Comment text is required' });

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = new Comment({
      post: postId,
      text,
      userName: userName || (req.user?.username ?? 'Anonymous'),
      user: req.user?._id || null,
    });

    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments for a post (public)
exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .sort({ createdAt: -1 })
      .select('-__v');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment (admin only)
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete comment' });
    }

    await comment.deleteOne();
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
