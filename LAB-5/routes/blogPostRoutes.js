const express = require('express');
const router = express.Router();
const {
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
  deleteBlogPost
} = require('../controllers/blogPostController');

// Routes for /api/blogposts
router.post('/', createBlogPost);
router.get('/', getBlogPosts);
router.get('/:id', getBlogPostById);
router.delete('/:id', deleteBlogPost);

module.exports = router;
