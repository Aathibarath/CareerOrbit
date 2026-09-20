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


// Register REST API endpoints (supporting both /api/* and /* for Vercel rewrites)
app.use(['/api/auth', '/auth'], authRoutes);
app.use(['/api/applications', '/applications'], applicationRoutes);
app.use(['/api/companies', '/companies'], companyRoutes);
app.use(['/api/contacts', '/contacts'], contactRoutes);
app.use(['/api/interviews', '/interviews'], interviewRoutes);
app.use(['/api/tasks', '/tasks'], taskRoutes);
app.use(['/api/followups', '/followups'], followupRoutes);
app.use(['/api/analytics', '/analytics'], analyticsRoutes);
app.use(['/api/ai', '/ai'], aiRoutes);

// Health check endpoint
app.get(['/api/health', '/health', '/api'], (req, res) => {
  res.json({
    status: 'online',
    app: 'CareerOrbit API',
    database: req.dbConnected ? 'Connected (MongoDB)' : 'High-Performance Local Mode',
    timestamp: new Date()
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

// Start server for local standalone development
if (!process.env.VERCEL) {
  connectDB().then((dbStatus) => {
    isConnected = dbStatus;
    app.listen(PORT, () => {
      console.log(`🚀 CareerOrbit Server running on http://localhost:${PORT}`);
      console.log(`✨ Status: ${isConnected ? 'MongoDB Active' : 'Sample Seed Mode Ready'}`);
    });
  }).catch(() => {
    app.listen(PORT, () => {
      console.log(`🚀 CareerOrbit Server running on http://localhost:${PORT}`);
    });
  });
}

export default app;

