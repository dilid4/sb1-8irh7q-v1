import { io, Socket } from 'socket.io-client';
import { tradingEngine } from './tradingEngine';
import { useMarketStore } from '../store/marketStore';

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect() {
    if (this.socket?.connected) return;

    this.socket = io(import.meta.env.VITE_WS_URL || 'ws://localhost:3001', {
      reconnection: true,
      reconnectionDelay: this.reconnectDelay,
      reconnectionAttempts: this.maxReconnectAttempts,
    });

    this.socket.on('connect', this.handleConnect);
    this.socket.on('disconnect', this.handleDisconnect);
    this.socket.on('price', this.handlePriceUpdate);
    this.socket.on('error', this.handleError);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  subscribe(symbols: string[]) {
    if (this.socket?.connected) {
      this.socket.emit('subscribe', symbols);
    }
  }

  unsubscribe(symbols: string[]) {
    if (this.socket?.connected) {
      this.socket.emit('unsubscribe', symbols);
    }
  }

  private handleConnect = () => {
    console.log('WebSocket connected');
    this.reconnectAttempts = 0;
  };

  private handleDisconnect = () => {
    console.log('WebSocket disconnected');
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => this.connect(), this.reconnectDelay * this.reconnectAttempts);
    }
  };

  private handlePriceUpdate = (data: { symbol: string; bid: number; ask: number }) => {
    tradingEngine.updatePrice(data.symbol, data.bid, data.ask);
  };

  private handleError = (error: Error) => {
    console.error('WebSocket error:', error);
  };
}

export const wsService = new WebSocketService();