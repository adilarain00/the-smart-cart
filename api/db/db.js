// MongoDB connection utility with retry and event handling
const mongoose = require('mongoose');

let retryCount = 0;
const maxRetries = 5;

// Connects to MongoDB with retry logic
const connectDatabase = async () => {
  try {
    const data = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      maxPoolSize: 10,
    });

    console.log(
      `mongoDB connected with server: ${data.connection.host}`.yellow.bold
        .underline
    );
    retryCount = 0;
  } catch (err) {
    console.error(
      `Database connection failed (attempt ${retryCount + 1}/${maxRetries}):`,
      err.message
    );

    if (retryCount < maxRetries) {
      retryCount++;
      console.log(`Retrying in 05 seconds...`);
      setTimeout(connectDatabase, 5000);
    } else {
      console.error('Max retries reached. Exiting...');
      process.exit(1);
    }
  }
};

mongoose.connection.on('disconnected', () => {
  // Handle MongoDB disconnection and attempt reconnection
  console.log('MongoDB disconnected! Attempting to reconnect...');
  connectDatabase();
});

mongoose.connection.on('error', (err) => {
  // Log MongoDB connection errors
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('reconnected', () => {
  // Log successful reconnection
  console.log('MongoDB reconnected successfully');
});

module.exports = connectDatabase;
