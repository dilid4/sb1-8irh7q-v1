import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import MarketsList from '../../components/admin/markets/MarketsList';
import MarketFilters from '../../components/admin/markets/MarketFilters';
import { polygonService } from '../../lib/services/polygonService';
import { MarketData } from '../../lib/types/market';

const MarketsManagementPage = () => {
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');

  const fetchMarkets = async () => {
    setIsLoading(true);
    try {
      const forexMarkets = await polygonService.getForexPairs();
      const cryptoMarkets = await polygonService.getCryptoPairs();
      const stockMarkets = await polygonService.getStocks();
      const indicesMarkets = await polygonService.getIndices();

      setMarkets([
        ...forexMarkets,
        ...cryptoMarkets,
        ...stockMarkets,
        ...indicesMarkets
      ]);
    } catch (error) {
      console.error('Failed to fetch markets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  const handleToggleMarket = async (symbol: string, isActive: boolean) => {
    // Update market availability in the database
    try {
      await polygonService.updateMarketAvailability(symbol, isActive);
      setMarkets(markets.map(market => 
        market.symbol === symbol 
          ? { ...market, isActive }
          : market
      ));
    } catch (error) {
      console.error('Failed to update market availability:', error);
    }
  };

  const filteredMarkets = markets.filter(market => {
    const matchesSearch = market.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      market.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || market.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Markets Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage available trading instruments
          </p>
        </div>
        <button
          onClick={fetchMarkets}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Markets
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search markets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      {showFilters && (
        <MarketFilters
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          onClose={() => setShowFilters(false)}
        />
      )}

      <MarketsList
        markets={filteredMarkets}
        onToggleMarket={handleToggleMarket}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MarketsManagementPage;