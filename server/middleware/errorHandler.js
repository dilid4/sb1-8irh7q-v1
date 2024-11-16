import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error('Error:', err);

  if (err.type === 'validation') {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors
    });
  }

  if (err.type === 'auth') {
    return res.status(401).json({
      error: 'Authentication error',
      message: err.message
    });
  }

  if (err.type === 'notFound') {
    return res.status(404).json({
      error: 'Not found',
      message: err.message
    });
  }

  // Default error
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};