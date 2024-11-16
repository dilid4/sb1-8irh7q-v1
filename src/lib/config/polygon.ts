export const POLYGON_CONFIG = {
  API_KEY: import.meta.env.VITE_POLYGON_API_KEY || '',
  BASE_URL: 'https://api.polygon.io',
  FOREX_PATH: '/v2/aggs/ticker',
  CRYPTO_PATH: '/v2/aggs/ticker',
  STOCKS_PATH: '/v2/aggs/ticker',
  INDICES_PATH: '/v2/aggs/ticker',
  TIMESPAN: '1min',
  LIMIT: 120
};