import React from 'react';
import { useForm } from 'react-hook-form';
import { X, Upload, Check, AlertCircle } from 'lucide-react';

interface KYCVerificationModalProps {
  userId: string;
  onVerify: (approved: boolean, notes: string) => Promise<void>;
  onClose: () => void;
  documents: {
    type: string;
    url: string;
    status: 'pending' | 'approved' | 'rejected';
  }[];
}

const KYCVerificationModal: React.FC<KYCVerificationModalProps> = ({
  userId,
  onVerify,
  onClose,
  documents
}) => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      notes: ''
    }
  });

  const onSubmit = async (data: { notes: string }, approved: boolean) => {
    await onVerify(approved, data.notes);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">KYC Verification</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Upload className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">
                      {doc.type}
                    </span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    doc.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : doc.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                </div>
                <div className="mt-2">
                  <img
                    src={doc.url}
                    alt={doc.type}
                    className="max-h-48 rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit((data) => onSubmit(data, true))} className="mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Verification Notes
              </label>
              <textarea
                {...register('notes')}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Add any notes about the verification..."
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
                type="button"
                onClick={handleSubmit((data) => onSubmit(data, false))}
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
              >
                <AlertCircle className="h-4 w-4 mr-2 inline" />
                Reject
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                <Check className="h-4 w-4 mr-2 inline" />
                Approve
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KYCVerificationModal;