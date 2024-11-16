import { authService } from '../services/authService.js';
import { logger } from '../utils/logger.js';

export const auth = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const payload = await authService.verifyToken(token);
      if (!payload) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      req.user = payload;

      // Role-based access control
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied' });
      }

      next();
    } catch (error) {
      logger.error('Authentication error:', error);
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};