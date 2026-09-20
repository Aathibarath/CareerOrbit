import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import followupRoutes from './routes/followupRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map(s => s.trim()) : '*';
app.use(cors({
  origin: allowedOrigins === '*' ? '*' : allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Inject database connection state (supporting Serverless & Standalone)
let isConnected = false;
app.use(async (req, res, next) => {
  if (process.env.MONGODB_URI) {
    try {
      isConnected = await connectDB();
    } catch (e) {
      isConnected = false;
    }
  }
  req.dbConnected = isConnected;
  next();
});


// Register REST API endpoints
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/followups', followupRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'CareerOrbit API',
    database: isConnected ? 'Connected (MongoDB)' : 'High-Performance Local Mode',
    timestamp: new Date()
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

// Initialize database & start server
connectDB().then((dbStatus) => {
  isConnected = dbStatus;
  if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
      console.log(`🚀 CareerOrbit Server running on http://localhost:${PORT}`);
      console.log(`✨ Status: ${isConnected ? 'MongoDB Active' : 'Sample Seed Mode Ready'}`);
    });
  }
});

export default app;
