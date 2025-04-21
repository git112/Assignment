const BlogPost = require('../models/BlogPost');
const Author = require('../models/Author');
const mongoose = require('mongoose');

// @desc    Create a new blog post
// @route   POST /api/blogposts
// @access  Public
const createBlogPost = async (req, res, next) => {
  try {
    const { title, content, authorId } = req.body;

    // Validate required fields
    if (!title || !content || !authorId) {
      res.status(400);
      throw new Error('Please provide title, content and authorId');
    }

    // Check if author exists
    const author = await Author.findById(authorId);
    if (!author) {
      res.status(404);
      throw new Error('Author not found');
    }

    // Create blog post
    const blogPost = await BlogPost.create({
      title,
      content,
      author: authorId
    });

    // Return populated blog post
    const populatedBlogPost = await BlogPost.findById(blogPost._id).populate('author', 'name email');

    res.status(201).json({
      success: true,
      data: populatedBlogPost
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all blog posts
// @route   GET /api/blogposts
// @access  Public
const getBlogPosts = async (req, res, next) => {
  try {
    const blogPosts = await BlogPost.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogPosts.length,
      data: blogPosts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get blog post by ID
// @route   GET /api/blogposts/:id
// @access  Public
const getBlogPostById = async (req, res, next) => {
  try {
    // Validate object ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error('Invalid blog post ID format');
    }

    const blogPost = await BlogPost.findById(req.params.id)
      .populate('author', 'name email');

    if (!blogPost) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    res.status(200).json({
      success: true,
      data: blogPost
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogposts/:id
// @access  Public
const deleteBlogPost = async (req, res, next) => {
  try {
    // Validate object ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400);
      throw new Error('Invalid blog post ID format');
    }

    const blogPost = await BlogPost.findById(req.params.id);

    if (!blogPost) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    await blogPost.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlogPost,
  getBlogPosts,
  getBlogPostById,
  deleteBlogPost
};