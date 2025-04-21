
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Import routes
const authorRoutes = require('./routes/authorRoutes');
const blogPostRoutes = require('./routes/blogPostRoutes');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/authors', authorRoutes);
app.use('/api/blogposts', blogPostRoutes);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
