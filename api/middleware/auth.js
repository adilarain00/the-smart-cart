// Authentication middleware for user, seller, and admin role checks
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Seller = require('../models/Seller');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

// Checks if user is authenticated
exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new errorHandler('Please log in to continue.', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new errorHandler('User not found. Please log in again.', 401));
  }

  req.user = user;
  next();
});

// Checks if seller is authenticated
exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;
  if (!seller_token) {
    return next(
      new errorHandler('Please log in as a seller to continue.', 401)
    );
  }

  const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
  req.seller = await Seller.findById(decoded.id);

  next();
});

// Checks if user has admin role (or specified roles)
exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new errorHandler(`${req.user.role} can not access this resources!`)
      );
    }
    next();
  };
};
