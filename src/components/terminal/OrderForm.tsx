import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { OrderRequest } from '../../lib/types/order';

interface OrderFormProps {
  symbol: string;
  bid: number;
  ask: number;
  balance: number;
  onSubmit: (order: OrderRequest) => Promise<void>;
}

const OrderForm: React.FC<OrderFormProps> = ({
  symbol,
  bid,
  ask,
  balance,
  onSubmit
}) => {
  const [volume, setVolume] = useState('0.01');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT' | 'STOP'>('MARKET');
  const [limitPrice, setLimitPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const [timeInForce, setTimeInForce] = useState<'GTC' | 'IOC' | 'FOK'>('GTC');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (side: 'BUY' | 'SELL') => {
    try {
      setError(null);
      const order: OrderRequest = {
        symbol,
        type: side,
        volume: parseFloat(volume),
        orderType,
        timeInForce,
        price: orderType === 'MARKET' ? undefined : parseFloat(limitPrice || stopPrice)
      };
      await onSubmit(order);
      
      // Reset form after successful submission
      if (orderType !== 'MARKET') {
        setLimitPrice('');
        setStopPrice('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
    }
  };

  return (
    <div className="p-4 space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Volume</label>
        <input
          type="number"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          step="0.01"
          min="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Order Type</label>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value as 'MARKET' | 'LIMIT' | 'STOP')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="MARKET">Market</option>
          <option value="LIMIT">Limit</option>
          <option value="STOP">Stop</option>
        </select>
      </div>

      {orderType !== 'MARKET' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {orderType === 'LIMIT' ? 'Limit Price' : 'Stop Price'}
          </label>
          <input
            type="number"
            value={orderType === 'LIMIT' ? limitPrice : stopPrice}
            onChange={(e) => orderType === 'LIMIT' 
              ? setLimitPrice(e.target.value)
              : setStopPrice(e.target.value)
            }
            step="0.00001"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Time in Force</label>
        <select
          value={timeInForce}
          onChange={(e) => setTimeInForce(e.target.value as 'GTC' | 'IOC' | 'FOK')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="GTC">Good Till Cancelled</option>
          <option value="IOC">Immediate or Cancel</option>
          <option value="FOK">Fill or Kill</option>
        </select>
      </div>

      <div className="pt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => handleSubmit('SELL')}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Sell @ {bid.toFixed(5)}
        </button>
        <button
          onClick={() => handleSubmit('BUY')}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Buy @ {ask.toFixed(5)}
        </button>
      </div>
    </div>
  );
};

export default OrderForm;