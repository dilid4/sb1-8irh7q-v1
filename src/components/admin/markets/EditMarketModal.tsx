import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { MarketSettings } from '../../../lib/types/market';

const marketSettingsSchema = z.object({
  symbol: z.string(),
  isActive: z.boolean(),
  accountTypes: z.array(z.enum(['standard', 'vip', 'manager'])),
  minDeposit: z.number().min(0),
  maxLeverage: z.number().min(1),
  spreadType: z.enum(['fixed', 'variable']),
  commission: z.number().min(0)
});

interface EditMarketModalProps {
  settings: MarketSettings;
  onSubmit: (data: MarketSettings) => Promise<void>;
  onClose: () => void;
}

const EditMarketModal: React.FC<EditMarketModalProps> = ({
  settings,
  onSubmit,
  onClose
}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MarketSettings>({
    resolver: zodResolver(marketSettingsSchema),
    defaultValues: settings
  });

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Edit Market Settings - {settings.symbol}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Types
            </label>
            <div className="mt-2 space-y-2">
              {['standard', 'vip', 'manager'].map((type) => (
                <label key={type} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    {...register('accountTypes')}
                    value={type}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minimum Deposit ($)
            </label>
            <input
              type="number"
              {...register('minDeposit', { valueAsNumber: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.minDeposit && (
              <p className="mt-1 text-sm text-red-600">{errors.minDeposit.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maximum Leverage
            </label>
            <input
              type="number"
              {...register('maxLeverage', { valueAsNumber: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.maxLeverage && (
              <p className="mt-1 text-sm text-red-600">{errors.maxLeverage.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Spread Type
            </label>
            <select
              {...register('spreadType')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="variable">Variable</option>
              <option value="fixed">Fixed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Commission ($ per lot)
            </label>
            <input
              type="number"
              step="0.01"
              {...register('commission', { valueAsNumber: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.commission && (
              <p className="mt-1 text-sm text-red-600">{errors.commission.message}</p>
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
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMarketModal;