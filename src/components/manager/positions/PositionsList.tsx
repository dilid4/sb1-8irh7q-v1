import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Position } from '../../../lib/types/trading';
import ModifyPositionModal from './ModifyPositionModal';
import { usePositionManagement } from '../../../hooks/usePositionManagement';

interface PositionsListProps {
  positions: Position[];
  onPositionUpdate: () => void;
}

const PositionsList: React.FC<PositionsListProps> = ({ positions, onPositionUpdate }) => {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const { modifyPosition, closePosition, isProcessing, error } = usePositionManagement();

  const handleModify = async (positionId: string) => {
    const position = positions.find(p => p.id === positionId);
    if (position) {
      setSelectedPosition(position);
    }
  };

  const handleClose = async (positionId: string) => {
    const success = await closePosition(positionId);
    if (success) {
      onPositionUpdate();
    }
  };

  const handleModifySubmit = async (modification: any) => {
    if (!selectedPosition) return;
    
    const success = await modifyPosition(
      selectedPosition.id,
      modification.takeProfit,
      modification.stopLoss
    );
    
    if (success) {
      setSelectedPosition(null);
      onPositionUpdate();
    }
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Open Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P/L
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {positions.map((position) => (
                <tr key={position.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Client #{position.id.split('-')[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {position.symbol}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`flex items-center text-sm ${
                      position.type === 'BUY' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {position.type === 'BUY' ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {position.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {position.lots}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {position.openPrice.toFixed(5)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {position.currentPrice.toFixed(5)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      position.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${position.profitLoss.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleModify(position.id)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Modify
                    </button>
                    <button
                      onClick={() => handleClose(position.id)}
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

      {selectedPosition && (
        <ModifyPositionModal
          position={selectedPosition}
          onModify={handleModifySubmit}
          onClose={() => setSelectedPosition(null)}
          isProcessing={isProcessing}
          error={error}
        />
      )}
    </>
  );
};

export default PositionsList;