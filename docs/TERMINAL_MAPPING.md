# Trading Terminal Component Mapping

## Header Components

### Account Information
- **Balance**: Maps to `user.accountBalance`
  - Real-time updates via WebSocket
  - Format: Currency with 2 decimal places
  - Updates after each trade/deposit/withdrawal

### Margin Information
- **Used Margin**: Calculated from open positions
  - Formula: Sum of (Position Size × Current Price × Margin Rate)
  - Updates in real-time with price changes
  - Color coding: <100% green, >100% yellow, >150% red

### Maintenance Margin
- **Level**: Maps to risk management settings
  - Source: `RiskSettings` table
  - Warning levels configurable by admin
  - Triggers automatic notifications at defined thresholds

### Profit/Loss Display
- **Daily P/L**: Calculated from today's closed positions
- **Total P/L**: Sum of all open position unrealized P/L
- **Updates**: Real-time via WebSocket price feeds

## Left Panel Navigation

### Market Categories
1. **Forex (41)**
   - Data Source: `Market` table with type="forex"
   - Real-time prices via Polygon.io WebSocket
   - Spread calculation: (ask - bid)
   - Shows only markets where `isActive=true`

2. **Indices (15)**
   - Source: `Market` table with type="indices"
   - Delayed prices (15 min) for some indices
   - Premium real-time data for others

3. **Commodities (8)**
   - Source: `Market` table with type="commodities"
   - Mix of spot and futures prices
   - Special margin requirements

### Market Groups
- **Forex Baskets**
  - Custom grouped instruments
  - Based on `MarketGroup` table
  - User-specific watchlists supported

- **Treasury**
  - Government bond markets
  - Special trading hours
  - Fixed spreads

### Market Display
- Symbol
- Bid/Ask prices
- Daily change
- Spread
- Trading hours status

## Trading Functions

### Order Types
1. **Market Orders**
   - Immediate execution
   - Uses `OrderService.executeMarketOrder()`
   - Slippage protection included

2. **Limit Orders**
   - Stored in `PendingOrders` table
   - Monitored by order execution engine
   - GTC/GTD/IOC time in force

3. **Stop Orders**
   - Price triggers from `MarketData` feed
   - Server-side validation
   - Trailing stop support

### Position Management
- Open positions table
- Position modification
- Stop loss/Take profit
- Position closing
- Partial closes

## Chart Integration

### TradingView Charts
- Multiple timeframes
- Custom indicators
- Drawing tools
- Chart templates
- Multi-chart layout support

### Technical Analysis
- Built-in indicators
- Custom studies
- Alert system
- Pattern recognition

## Economic Calendar

### Event Categories
- High impact
- Medium impact
- Low impact
- Custom filters

### Data Points
- Previous
- Forecast
- Actual
- Market reaction

## News Feed

### Sources
- Major news providers
- Market analysis
- Technical updates
- Economic reports

### Integration
- Real-time updates
- Sentiment analysis
- Impact indicators
- Related instruments

## Risk Management

### Account Limits
- Maximum position size
- Maximum leverage
- Margin call levels
- Stop out levels

### Monitoring
- Real-time margin calculation
- Risk exposure alerts
- Position size warnings
- Drawdown tracking

## Data Integration Points

### Real-time Data
```typescript
interface MarketData {
  symbol: string;
  bid: number;
  ask: number;
  timestamp: number;
  dayChange: number;
  dayVolume: number;
}
```

### Order Flow
```typescript
interface OrderRequest {
  symbol: string;
  type: 'MARKET' | 'LIMIT' | 'STOP';
  side: 'BUY' | 'SELL';
  volume: number;
  price?: number;
  stopLoss?: number;
  takeProfit?: number;
  timeInForce?: 'GTC' | 'IOC' | 'FOK';
}
```

### Position Updates
```typescript
interface Position {
  id: string;
  symbol: string;
  openPrice: number;
  currentPrice: number;
  volume: number;
  pnl: number;
  margin: number;
  stopLoss?: number;
  takeProfit?: number;
}
```