import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { BonusRule } from '../../../lib/types/bonus';

const bonusSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  type: z.enum(['fixed', 'percentage']),
  minDeposit: z.number().min(0, 'Minimum deposit must be positive'),
  maxBonus: z.number().optional(),
  expiryDays: z.number().min(1, 'Expiry days must be positive'),
  tradingRequirement: z.number().min(0, 'Trading requirement must be positive'),
  isActive: z.boolean()
});

type BonusFormData = z.infer<typeof bonusSchema>;

interface CreateBonusModalProps {
  onSubmit: (data: Omit<BonusRule, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

const CreateBonusModal: React.FC<CreateBonusModalProps> = ({ onSubmit, onClose }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<BonusFormData>({
    resolver: zodResolver(bonusSchema),
    defaultValues: {
      type: 'fixed',
      isActive: true
    }
  });

  const bonusType = watch('type');

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Create Bonus Rule</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                <option value="fixed">Fixed Amount</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {bonusType === 'fixed' ? 'Amount ($)' : 'Percentage (%)'}
              </label>
              <input
                type="number"
                step={bonusType === 'fixed' ? '1' : '0.01'}
                {...register('amount', { valueAsNumber: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
              )}
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

            {bonusType === 'percentage' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Maximum Bonus ($)
                </label>
                <input
                  type="number"
                  {...register('maxBonus', { valueAsNumber: true })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry (Days)
              </label>
              <input
                type="number"
                {...register('expiryDays', { valueAsNumber: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.expiryDays && (
                <p className="mt-1 text-sm text-red-600">{errors.expiryDays.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Trading Requirement ($)
              </label>
              <input
                type="number"
                {...register('tradingRequirement', { valueAsNumber: true })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.tradingRequirement && (
                <p className="mt-1 text-sm text-red-600">{errors.tradingRequirement.message}</p>
              )}
            </div>
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
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Create Bonus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBonusModal;