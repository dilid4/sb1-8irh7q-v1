import React from 'react';
import { Position } from '../../lib/types/trading';

interface PositionsListProps {
  positions: Position[];
  onClose: (positionId: string) => void;
  onModify: (positionId: string) => void;
}

const PositionsList: React.FC<PositionsListProps> = ({ positions, onClose, onModify }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Open Positions</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P/L</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {positions.map((position) => (
              <tr key={position.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {position.symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`font-medium ${
                    position.type === 'BUY' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {position.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {position.lots.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {position.openPrice.toFixed(5)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {position.currentPrice.toFixed(5)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className={position.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                    ${position.profitLoss.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onModify(position.id)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => onClose(position.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Close
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionsList;