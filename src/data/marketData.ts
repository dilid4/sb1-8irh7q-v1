export const marketData = {
  forex: {
    title: 'Forex',
    markets: [
      { symbol: 'EUR/USD', name: 'Euro vs US Dollar', price: '1.05561', change: 0.05 },
      { symbol: 'GBP/USD', name: 'British Pound vs US Dollar', price: '1.26278', change: -0.29 },
      { symbol: 'USD/JPY', name: 'US Dollar vs Japanese Yen', price: '110.235', change: 0.12 },
      { symbol: 'AUD/USD', name: 'Australian Dollar vs US Dollar', price: '0.6524', change: -0.15 },
      { symbol: 'USD/CAD', name: 'US Dollar vs Canadian Dollar', price: '1.3645', change: 0.08 }
    ]
  },
  indices: {
    title: 'Indices',
    markets: [
      { symbol: 'US30', name: 'Dow Jones Industrial Average', price: '34950', change: 0.15 },
      { symbol: 'US500', name: 'S&P 500', price: '4486.5', change: 0.25 },
      { symbol: 'GER40', name: 'DAX 40', price: '15780', change: -0.18 }
    ]
  },
  commodities: {
    title: 'Commodities',
    markets: [
      { symbol: 'XAUUSD', name: 'Gold vs US Dollar', price: '1825.50', change: -0.18 },
      { symbol: 'XAGUSD', name: 'Silver vs US Dollar', price: '23.950', change: -0.35 },
      { symbol: 'USOIL', name: 'US Crude Oil', price: '72.45', change: 0.45 }
    ]
  }
};