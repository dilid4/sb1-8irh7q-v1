import axios from 'axios';
import { MarketData, MarketGroup } from '../types/market';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class MarketService {
  async getMarketGroups(): Promise<MarketGroup[]> {
    try {
      const response = await axios.get(`${API_URL}/markets/groups`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch market groups');
    }
  }

  async getMarketsByGroup(groupId: string): Promise<MarketData[]> {
    try {
      const response = await axios.get(`${API_URL}/markets/groups/${groupId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch markets for group');
    }
  }

  async getMarketData(symbol: string): Promise<MarketData> {
    try {
      const response = await axios.get(`${API_URL}/markets/${symbol}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch market data');
    }
  }

  async getActiveMarkets(): Promise<MarketData[]> {
    try {
      const response = await axios.get(`${API_URL}/markets/active`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch active markets');
    }
  }
}

export const marketService = new MarketService();