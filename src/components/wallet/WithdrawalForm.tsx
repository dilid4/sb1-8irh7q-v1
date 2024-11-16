import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bitcoin, Building2 } from 'lucide-react';
import { BankDetails } from '../../lib/types/payment';
import { paymentService } from '../../lib/services/paymentService';

const withdrawalSchema = z.object({
  amount: z.number().min(0.001, 'Minimum withdrawal is 0.001'),
  method: z.enum(['btc', 'bank']),
  btcAddress: z.string().optional(),
  bankDetails: z.object({
    accountHolder: z.string().min(1, 'Account holder is required'),
    bankName: z.string().min(1, 'Bank name is required'),
    accountNumber: z.string().min(1, 'Account number is required'),
    swiftCode: z.string().min(8, 'Invalid SWIFT code'),
    iban: z.string().optional(),
    country: z.string().min(1, 'Country is required'),
    bankAddress: z.string().optional()
  }).optional()
});

type WithdrawalFormData = z.infer<typeof withdrawalSchema>;

const WithdrawalForm = () => {
  const [method, setMethod] = useState<'btc' | 'bank'>('btc');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<WithdrawalFormData>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      method: 'btc'
    }
  });

  const onSubmit = async (data: WithdrawalFormData) => {
    setIsSubmitting(true);
    try {
      await paymentService.requestWithdrawal(
        'user123', // Replace with actual user ID
        data.amount,
        'USD',
        data.method,
        data.btcAddress || '',
        data.bankDetails
      );
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setMethod('btc')}
          className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border ${
            method === 'btc'
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Bitcoin className="h-5 w-5 mr-2" />
          Bitcoin
        </button>
        <button
          onClick={() => setMethod('bank')}
          className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border ${
            method === 'bank'
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Building2 className="h-5 w-5 mr-2" />
          Bank Transfer
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount (USD)
          </label>
          <input
            type="number"
            step="0.01"
            {...register('amount', { valueAsNumber: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>

        {method === 'btc' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bitcoin Address
            </label>
            <input
              type="text"
              {...register('btcAddress')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.btcAddress && (
              <p className="mt-1 text-sm text-red-600">{errors.btcAddress.message}</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Account Holder
              </label>
              <input
                type="text"
                {...register('bankDetails.accountHolder')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bank Name
              </label>
              <input
                type="text"
                {...register('bankDetails.bankName')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Account Number
                </label>
                <input
                  type="text"
                  {...register('bankDetails.accountNumber')}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SWIFT Code
                </label>
                <input
                  type="text"
                  {...register('bankDetails.swiftCode')}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                IBAN (Optional)
              </label>
              <input
                type="text"
                {...register('bankDetails.iban')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                {...register('bankDetails.country')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        )}

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-700">
            {method === 'btc'
              ? 'Please double-check the Bitcoin address. Transactions cannot be reversed.'
              : 'Bank transfers typically take 2-5 business days to process.'}
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : 'Request Withdrawal'}
        </button>
      </form>
    </div>
  );
};

export default WithdrawalForm;