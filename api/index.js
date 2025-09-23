const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const colors = require('colors');
const connectDB = require('./db/db');
const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/error');
const eventRoutes = require('./routes/eventRoutes');
const orderRoutes = require('./routes/orderRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const messageRoutes = require('./routes/messageRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const withdrawRoutes = require('./routes/withdrawRoutes');
const couponCodeRoutes = require('./routes/couponCodeRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const visitorRoutes = require('./routes/visitorRoutes');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error occurred: ${err.message}`.underline);
  console.log(
    `Uncaught exception error occurred. Server is closing to protect operations.`
  );
});

// Connect to MongoDB
connectDB();

// Configure Cloudinary for image uploads
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Enable CORS for frontend communication
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Middleware for parsing JSON, cookies, and URL-encoded data
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Root endpoint
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API route registrations
app.use('/api/users', userRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/couponCodes', couponCodeRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/withdraws', withdrawRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/visitors', visitorRoutes);

// Global error handler
app.use(errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(
    `Shutting down server for unhandled promise rejection: ${err.message}`
      .underline
  );
  console.log(
    `Unhandled promise rejection — server is shutting down gracefully.`
  );

  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;
