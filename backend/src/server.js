/**
 * MAMA HAI Backend Server
 *
 * This is the main entry point for the MAMA HAI API server.
 * It sets up Express, security middleware, database connection, and Socket.io
 *
 * WHAT THIS FILE DOES:
 * - Loads environment variables from .env file
 * - Creates an Express application
 * - Sets up security middleware (CORS, Helmet, Rate Limiting)
 * - Connects to PostgreSQL database via Prisma
 * - Sets up Socket.io for real-time communication
 * - Defines API routes
 * - Starts the HTTP server
 */

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
const httpServer = createServer(app);

// Initialize Socket.io for real-time communication
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Make io accessible to routes
app.set('io', io);

// ============================================
// SECURITY MIDDLEWARE
// ============================================

// Helmet - Sets various HTTP headers for security
// Protects against common vulnerabilities like XSS, clickjacking, etc.
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for development (enable in production)
  crossOriginEmbedderPolicy: false
}));

// CORS - Allow cross-origin requests from frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting - Prevents abuse by limiting requests per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all API routes
app.use('/api', limiter);

// Stricter rate limit for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Only 5 login attempts per 15 minutes
  message: 'Too many login attempts, please try again later.',
  skipSuccessfulRequests: true
});

// ============================================
// GENERAL MIDDLEWARE
// ============================================

// Compression - Compress all responses to reduce bandwidth
app.use(compression());

// Morgan - HTTP request logger for debugging
app.use(morgan('dev'));

// Body parsers - Parse JSON and URL-encoded request bodies
app.use(express.json({ limit: '10mb' })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================
// API ROUTES
// ============================================

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'MAMA HAI API'
  });
});

// Import routes
import authRoutes from './routes/auth.routes.js';
// Other routes will be added in later phases:
// import patientRoutes from './routes/patient.routes.js';
// import monitoringRoutes from './routes/monitoring.routes.js';
// import alertRoutes from './routes/alert.routes.js';
// import referralRoutes from './routes/referral.routes.js';

// Apply auth limiter to login/register routes
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Mount API routes
app.use('/api/auth', authRoutes);
// app.use('/api/patients', patientRoutes);
// app.use('/api/monitoring', monitoringRoutes);
// app.use('/api/alerts', alertRoutes);
// app.use('/api/referrals', referralRoutes);

// ============================================
// SOCKET.IO REAL-TIME EVENTS
// ============================================

io.on('connection', (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  // Join a patient monitoring room
  socket.on('join-monitoring', (patientId) => {
    socket.join(`patient-${patientId}`);
    console.log(`📡 Socket ${socket.id} joined monitoring room for patient ${patientId}`);
  });

  // Leave monitoring room
  socket.on('leave-monitoring', (patientId) => {
    socket.leave(`patient-${patientId}`);
    console.log(`📴 Socket ${socket.id} left monitoring room for patient ${patientId}`);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║   MAMA HAI API Server                  ║
  ║   Status: Running                      ║
  ║   Port: ${PORT}                            ║
  ║   Environment: ${process.env.NODE_ENV || 'development'}           ║
  ║   URL: http://localhost:${PORT}           ║
  ╚════════════════════════════════════════╝
  `);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM signal received: closing HTTP server');
  httpServer.close(() => {
    console.log('✅ HTTP server closed');
  });
});

export default app;
