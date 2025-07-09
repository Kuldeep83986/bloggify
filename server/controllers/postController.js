const Post = require('../models/Post');

// Create a new post (Admin only)
exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = new Post({
      title,
      content,
      author: req.user._id,
    });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all posts (public)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single post by id (public)
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post (Admin only)
exports.updatePost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = title || post.title;
    post.content = content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a post (Admin only)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

