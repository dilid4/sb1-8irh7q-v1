import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { LandingPage } from '../../../lib/types/marketing';

const landingPageSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  slug: z.string().min(1, 'URL slug is required')
    .regex(/^[a-z0-9-]+$/, 'URL slug can only contain lowercase letters, numbers, and hyphens'),
  bonusAmount: z.number().min(0, 'Bonus amount must be positive'),
  moneyManagerId: z.string().optional(),
  isActive: z.boolean()
});

type LandingPageFormData = z.infer<typeof landingPageSchema>;

interface CreateLandingPageModalProps {
  onSubmit: (data: Omit<LandingPage, 'id' | 'createdAt' | 'updatedAt' | 'visits' | 'registrations'>) => void;
  onClose: () => void;
}

const CreateLandingPageModal: React.FC<CreateLandingPageModalProps> = ({ onSubmit, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LandingPageFormData>({
    resolver: zodResolver(landingPageSchema),
    defaultValues: {
      bonusAmount: 100,
      isActive: true
    }
  });

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Create Landing Page</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              {...register('title')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
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
            <label className="block text-sm font-medium text-gray-700">URL Slug</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                /register/
              </span>
              <input
                type="text"
                {...register('slug')}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300"
              />
            </div>
            {errors.slug && (
              <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bonus Amount ($)
            </label>
            <input
              type="number"
              {...register('bonusAmount', { valueAsNumber: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.bonusAmount && (
              <p className="mt-1 text-sm text-red-600">{errors.bonusAmount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Money Manager (Optional)
            </label>
            <select
              {...register('moneyManagerId')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">None</option>
              <option value="1">Manager 1</option>
              <option value="2">Manager 2</option>
            </select>
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
              Create Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLandingPageModal;