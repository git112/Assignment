const express = require('express');
const router = express.Router();
const { createAuthor, getAuthors } = require('../controllers/authorController');

// Routes for /api/authors
router.post('/', createAuthor);
router.get('/', getAuthors);

module.exports = router;