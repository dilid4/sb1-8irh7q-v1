import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import TerminalHeader from '../../components/terminal/TerminalHeader';
import TerminalSidebar from '../../components/terminal/TerminalSidebar';
import TradingViewChart from '../../components/terminal/TradingViewChart';
import OrderPanel from '../../components/terminal/OrderPanel';
import MarketInfo from '../../components/terminal/MarketInfo';
import ChartToolbar from '../../components/terminal/ChartToolbar';
import { useMarketData } from '../../lib/hooks/useMarketData';

const TradingTerminal = () => {
  const { user } = useAuth();
  const [selectedSymbol, setSelectedSymbol] = useState('EUR/USD');
  const [timeframe, setTimeframe] = useState('15m');
  const { marketData, isLoading } = useMarketData(selectedSymbol);

  // Default market data
  const defaultMarketData = {
    symbol: selectedSymbol,
    bid: 0,
    ask: 0,
    spread: 0,
    change: 0,
    high: 0,
    low: 0
  };

  // Use actual market data if available, otherwise use defaults
  const currentMarketData = marketData || defaultMarketData;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <TerminalHeader 
        balance={user?.accountBalance || 50000}
        equity={user?.accountBalance || 50000}
        margin={0}
        marginLevel={100}
        accountType={user?.accountType || 'standard'}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <TerminalSidebar
          selectedSymbol={selectedSymbol}
          onSelectSymbol={setSelectedSymbol}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Chart Toolbar */}
          <ChartToolbar 
            symbol={selectedSymbol}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />

          {/* Market Info */}
          <MarketInfo {...currentMarketData} />

          {/* Chart Area */}
          <div className="flex-1 relative">
            <TradingViewChart 
              symbol={selectedSymbol}
              container="tradingview-widget"
            />
          </div>
        </div>

        {/* Order Panel */}
        <OrderPanel 
          symbol={selectedSymbol}
          bid={currentMarketData.bid}
          ask={currentMarketData.ask}
          balance={user?.accountBalance || 50000}
        />
      </div>
    </div>
  );
};

export default TradingTerminal;