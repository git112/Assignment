const Author = require('../models/Author');

// @desc    Create a new author
// @route   POST /api/authors
// @access  Public
const createAuthor = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    // Validate required fields
    if (!name || !email) {
      res.status(400);
      throw new Error('Please provide name and email');
    }

    // Create author
    const author = await Author.create({
      name,
      email
    });

    res.status(201).json({
      success: true,
      data: author
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all authors
// @route   GET /api/authors
// @access  Public
const getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();

    res.status(200).json({
      success: true,
      count: authors.length,
      data: authors
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAuthor,
  getAuthors
};