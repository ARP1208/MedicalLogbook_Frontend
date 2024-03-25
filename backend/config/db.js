// db.js
// import dotenv from 'dotenv';
// dotenv.config(); // Load environment variables from .env file
// import  GridFsStorage from 'multer-gridfs-storage'
import mongoose from 'mongoose';

// // Initialize GridFS storage engine
// const storage = new GridFsStorage({
//   url: process.env.MONGO_URI, // Use MongoDB connection URI from .env file
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     return {
//       filename: file.originalname
//     };
//   }
// });

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
};

export { connectDB, closeDB };
