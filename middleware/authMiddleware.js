const jwt = require('jsonwebtoken');
const config = require('../config'); // Create a config file to store your JWT secret
const Post = require('../models/Post');

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Authentication token missing' });

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user;
    next();
  });
}

function authorizeUser(req, res, next) {
  const postId = req.params.postId;

  Post.findById(postId, (err, post) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'You are not authorized to perform this action' });
    }

    next();
  });
}

module.exports = { authenticateToken, authorizeUser };