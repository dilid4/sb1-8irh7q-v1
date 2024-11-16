import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { marketGroupSchema } from '../../../lib/types/market';
import type { MarketGroup } from '../../../lib/types/market';

type MarketGroupFormData = Omit<MarketGroup, 'id' | 'createdAt' | 'updatedAt'>;

interface CreateMarketGroupModalProps {
  onSubmit: (data: MarketGroupFormData) => Promise<void>;
  onClose: () => void;
}

const CreateMarketGroupModal: React.FC<CreateMarketGroupModalProps> = ({
  onSubmit,
  onClose
}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MarketGroupFormData>({
    resolver: zodResolver(marketGroupSchema),
    defaultValues: {
      isActive: true,
      sortOrder: 0
    }
  });

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Create Market Group</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register('name')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              {...register('type')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="forex">Forex</option>
              <option value="crypto">Crypto</option>
              <option value="stocks">Stocks</option>
              <option value="indices">Indices</option>
              <option value="commodities">Commodities</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Background Image URL</label>
            <input
              type="text"
              {...register('backgroundImage')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.backgroundImage && (
              <p className="mt-1 text-sm text-red-600">{errors.backgroundImage.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sort Order</label>
            <input
              type="number"
              {...register('sortOrder', { valueAsNumber: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.sortOrder && (
              <p className="mt-1 text-sm text-red-600">{errors.sortOrder.message}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('isActive')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Active
            </label>
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
              {isSubmitting ? 'Creating...' : 'Create Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMarketGroupModal;