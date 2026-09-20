import mongoose from 'mongoose';

let cached = global.mongooseCache;
if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectDB = async () => {
  const connStr = process.env.MONGODB_URI;
  if (!connStr) {
    return false;
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return true;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(connStr, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    }).then((m) => {
      console.log(`[Database] Connected to MongoDB Atlas at ${m.connection.host}`);
      return m;
    }).catch((err) => {
      console.warn(`[Database] Connection error: ${err.message}`);
      cached.promise = null;
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
    return mongoose.connection.readyState === 1;
  } catch (e) {
    cached.promise = null;
    return false;
  }
};

