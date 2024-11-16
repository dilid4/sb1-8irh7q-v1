import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMarketsData } from '../../hooks/useMarketsData';

const POPULAR_MARKETS = [
  { symbol: 'EUR/USD', type: 'forex' },
  { symbol: 'BTC/USD', type: 'crypto' },
  { symbol: 'AAPL', type: 'stocks' },
  { symbol: '^SPX', type: 'indices' }
];

const MarketOverview = () => {
  const { markets, isLoading } = useMarketsData(POPULAR_MARKETS);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 rounded" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {markets.map((market) => (
        <Link
          key={market.symbol}
          to={`/terminal?symbol=${market.symbol}`}
          className="block p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">{market.symbol}</h3>
              <p className="text-xs text-gray-500">{market.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                ${market.price.toFixed(market.type === 'forex' ? 5 : 2)}
              </p>
              <div className="flex items-center justify-end">
                {market.change >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-xs font-medium ${
                  market.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {market.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MarketOverview;