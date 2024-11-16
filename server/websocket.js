import { WebSocket } from 'ws';
import { logger } from './utils/logger.js';
import { getMarketData } from './services/marketDataService.js';

export function setupWebSocket(io, prisma) {
  // Polygon.io WebSocket connection
  const polygonWs = new WebSocket('wss://socket.polygon.io/forex');

  polygonWs.on('open', () => {
    logger.info('Connected to Polygon.io WebSocket');
    
    // Authenticate
    polygonWs.send(JSON.stringify({
      action: 'auth',
      params: process.env.POLYGON_API_KEY
    }));

    // Subscribe to forex pairs
    polygonWs.send(JSON.stringify({
      action: 'subscribe',
      params: 'C.EUR/USD,C.GBP/USD,C.USD/JPY'
    }));
  });

  polygonWs.on('message', async (data) => {
    try {
      const message = JSON.parse(data);
      
      if (message.ev === 'C') {
        const marketData = {
          symbol: message.p,
          bid: message.b,
          ask: message.a,
          updatedAt: new Date()
        };

        // Update database
        await prisma.marketData.upsert({
          where: { symbol: marketData.symbol },
          update: marketData,
          create: marketData
        });

        // Broadcast to connected clients
        io.emit('price', marketData);
      }
    } catch (error) {
      logger.error('WebSocket message processing error:', error);
    }
  });

  polygonWs.on('error', (error) => {
    logger.error('Polygon.io WebSocket error:', error);
  });

  // Socket.io connection handling
  io.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`);

    socket.on('subscribe', async (symbols) => {
      try {
        // Get initial market data
        const marketData = await getMarketData(symbols);
        socket.emit('marketData', marketData);

        // Join symbol-specific rooms
        symbols.forEach(symbol => {
          socket.join(symbol);
        });
      } catch (error) {
        logger.error('Subscription error:', error);
      }
    });

    socket.on('unsubscribe', (symbols) => {
      symbols.forEach(symbol => {
        socket.leave(symbol);
      });
    });

    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });
}