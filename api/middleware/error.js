// Global error handling middleware for API responses
const errorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  // Set default status code and message
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server Error';

  // Handle file size limit errors
  if (err.name === 'LIMIT_FILE_SIZE') {
    return next(new errorHandler('Each image must be less than 5MB.', 400));
  }

  // Handle invalid MongoDB ObjectId errors
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid ID: ${err.path}.`;
    err = new errorHandler(message, 400);
  }

  // Handle duplicate key errors from MongoDB
  if (err.code === 11000) {
    const message = `Duplicate key entered: ${Object.keys(err.keyValue)}.`;
    err = new errorHandler(message, 400);
  }

  // Handle invalid JWT token errors
  if (err.name === 'JsonWebTokenError') {
    const message = `Invalid authentication token. Please log in again.`;
    err = new errorHandler(message, 400);
  }

  // Handle expired JWT token errors
  if (err.name === 'TokenExpiredError') {
    const message = `Authentication token has expired. Please log in again.`;
    err = new errorHandler(message, 400);
  }

  // Send error response
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
