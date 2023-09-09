const Post = require('../models/Post');

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().populate('user', 'name email');
    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function createPost(req, res) {
  const { title, body, image } = req.body;
  const user = req.user._id;

  try {
    const post = new Post({ title, body, image, user });
    await post.save();
    res.status(201).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function editPost(req, res) {
  const postId = req.params.postId;
  const { title, body, image } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check if the user is authorized to edit this post
    if (post.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'You are not authorized to edit this post' });
    }

    post.title = title;
    post.body = body;
    post.image = image;

    await post.save();
    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deletePost(req, res) {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check if the user is authorized to delete this post
    if (post.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'You are not authorized to delete this post' });
    }

    await post.remove();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getAllPosts, createPost, editPost, deletePost };