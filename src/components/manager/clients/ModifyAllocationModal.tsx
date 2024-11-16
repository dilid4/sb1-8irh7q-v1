import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { ClientAllocation } from '../../../lib/types/moneyManager';

const modificationSchema = z.object({
  allocationAmount: z.number().min(0, 'Allocation must be positive'),
  notes: z.string().optional()
});

type ModificationFormData = z.infer<typeof modificationSchema>;

interface ModifyAllocationModalProps {
  allocation: ClientAllocation;
  onModify: (data: ModificationFormData) => Promise<void>;
  onClose: () => void;
}

const ModifyAllocationModal: React.FC<ModifyAllocationModalProps> = ({
  allocation,
  onModify,
  onClose
}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ModificationFormData>({
    resolver: zodResolver(modificationSchema),
    defaultValues: {
      allocationAmount: allocation.allocationAmount
    }
  });

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Modify Client Allocation
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onModify)} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Allocation Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              {...register('allocationAmount', { valueAsNumber: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.allocationAmount && (
              <p className="mt-1 text-sm text-red-600">{errors.allocationAmount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes (Optional)
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
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

export default ModifyAllocationModal;