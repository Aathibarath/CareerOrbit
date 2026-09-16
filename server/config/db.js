import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/careerorbit';
    await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 2500, // Quick timeout if no local mongo running
    });
    console.log(`[Database] Connected to MongoDB at ${mongoose.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database] MongoDB connection skipped/unavailable (${error.message}). Running in High-Performance Local In-Memory Mode.`);
    return false;
  }
};
