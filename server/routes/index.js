import { Router } from 'express';
import authRoutes from './authRoutes.js';
import tradingRoutes from './tradingRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import marketRoutes from './marketRoutes.js';
import userRoutes from './userRoutes.js';
import adminRoutes from './adminRoutes.js';
import managerRoutes from './managerRoutes.js';

export function setupRoutes(app, prisma) {
  const router = Router();

  // Pass prisma client to route handlers
  router.use('/auth', authRoutes(prisma));
  router.use('/trading', tradingRoutes(prisma));
  router.use('/payment', paymentRoutes(prisma));
  router.use('/markets', marketRoutes(prisma));
  router.use('/users', userRoutes(prisma));
  router.use('/admin', adminRoutes(prisma));
  router.use('/manager', managerRoutes(prisma));

  // API versioning
  app.use('/api/v1', router);

  // Health check
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
}