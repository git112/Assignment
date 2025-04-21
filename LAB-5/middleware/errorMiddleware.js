const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
  
    res.status(statusCode);
  
    // Format mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
  
    // Handle mongoose duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate field value entered'
      });
    }
  
    // Handle mongoose cast error (invalid ID)
    if (err.name === 'CastError') {
      return res.status(404).json({
        success: false,
        error: 'Resource not found'
      });
    }
  
    res.json({
      success: false,
      message: err.message || 'Server Error',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  };
  
  module.exports = { errorHandler };
  