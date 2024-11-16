import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import TerminalHeader from '../../components/terminal/TerminalHeader';
import TerminalSidebar from '../../components/terminal/TerminalSidebar';
import TerminalTabs from '../../components/terminal/TerminalTabs';
import ChartArea from '../../components/terminal/ChartArea';
import OrderPanel from '../../components/terminal/OrderPanel';
import { useMarketData } from '../../hooks/useMarketData';

const TradingTerminal = () => {
  const { user } = useAuth();
  const [selectedSymbol, setSelectedSymbol] = useState('EUR/USD');
  const { marketData } = useMarketData(selectedSymbol);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <TerminalHeader 
        balance={user?.accountBalance || 50000}
        equity={user?.accountBalance || 50000}
        margin={0}
        marginLevel={100}
        accountType={user?.accountType || 'standard'}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <TerminalSidebar
          selectedSymbol={selectedSymbol}
          onSelectSymbol={setSelectedSymbol}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Terminal Tabs */}
          <TerminalTabs />

          {/* Chart Area */}
          <div className="flex-1">
            <ChartArea symbol={selectedSymbol} />
          </div>
        </div>

        {/* Order Panel */}
        <OrderPanel 
          symbol={selectedSymbol}
          bid={marketData?.bid}
          ask={marketData?.ask}
          balance={user?.accountBalance || 50000}
        />
      </div>
    </div>
  );
};

export default TradingTerminal;