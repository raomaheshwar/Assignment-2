const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const { authenticateToken, authorizeUser } = require('../middleware/authMiddleware');

router.get('/', postsController.getAllPosts);
router.post('/', authenticateToken, postsController.createPost);
router.put('/:postId', authenticateToken, authorizeUser, postsController.editPost);
router.delete('/:postId', authenticateToken, authorizeUser, postsController.deletePost);

module.exports = router;