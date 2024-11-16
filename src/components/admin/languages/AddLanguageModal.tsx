import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Language } from '../../../lib/types/language';

const languageSchema = z.object({
  code: z.string().min(2, 'Language code is required').max(5),
  name: z.string().min(1, 'Language name is required'),
  nativeName: z.string().min(1, 'Native name is required'),
  direction: z.enum(['ltr', 'rtl']),
  isActive: z.boolean(),
  isDefault: z.boolean()
});

type LanguageFormData = z.infer<typeof languageSchema>;

interface AddLanguageModalProps {
  onSubmit: (data: Omit<Language, 'completionPercentage'>) => void;
  onClose: () => void;
}

const AddLanguageModal: React.FC<AddLanguageModalProps> = ({ onSubmit, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LanguageFormData>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      direction: 'ltr',
      isActive: true,
      isDefault: false
    }
  });

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Add Language</h3>
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
              Language Code
            </label>
            <input
              type="text"
              {...register('code')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="en"
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Language Name
            </label>
            <input
              type="text"
              {...register('name')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="English"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Native Name
            </label>
            <input
              type="text"
              {...register('nativeName')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="English"
            />
            {errors.nativeName && (
              <p className="mt-1 text-sm text-red-600">{errors.nativeName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Text Direction
            </label>
            <select
              {...register('direction')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="ltr">Left to Right (LTR)</option>
              <option value="rtl">Right to Left (RTL)</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
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

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('isDefault')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Set as Default
              </label>
            </div>
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
              Add Language
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLanguageModal;