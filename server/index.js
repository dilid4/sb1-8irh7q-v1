import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

import { setupWebSocket } from './websocket.js';
import { setupRoutes } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';

config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Setup WebSocket
setupWebSocket(io, prisma);

// Setup Routes
setupRoutes(app, prisma);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});