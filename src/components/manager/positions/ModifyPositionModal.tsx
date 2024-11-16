import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { Position } from '../../../lib/types/trading';
import { PositionModification } from '../../../lib/types/position';

interface ModifyPositionModalProps {
  position: Position;
  onModify: (modification: PositionModification) => Promise<void>;
  onClose: () => void;
  isProcessing: boolean;
  error?: string | null;
}

const ModifyPositionModal: React.FC<ModifyPositionModalProps> = ({
  position,
  onModify,
  onClose,
  isProcessing,
  error
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PositionModification>({
    defaultValues: {
      positionId: position.id,
      takeProfit: position.takeProfit,
      stopLoss: position.stopLoss
    }
  });

  const onSubmit = async (data: PositionModification) => {
    await onModify(data);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Modify Position - {position.symbol}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Take Profit
            </label>
            <input
              type="number"
              step="0.00001"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('takeProfit')}
            />
            {errors.takeProfit && (
              <p className="mt-1 text-sm text-red-600">{errors.takeProfit.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stop Loss
            </label>
            <input
              type="number"
              step="0.00001"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('stopLoss')}
            />
            {errors.stopLoss && (
              <p className="mt-1 text-sm text-red-600">{errors.stopLoss.message}</p>
            )}
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyPositionModal;