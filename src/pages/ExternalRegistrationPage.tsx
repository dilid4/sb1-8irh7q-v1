import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Globe2 } from 'lucide-react';
import { marketingService } from '../lib/services/marketingService';

const registrationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const ExternalRegistrationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema)
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const response = await marketingService.handleExternalRegistration({
        ...data,
        landingPageId: slug!,
        ip: '127.0.0.1', // In production, get from server
        userAgent: navigator.userAgent
      });

      if (response.success) {
        // Redirect to dashboard with welcome message
        window.location.href = '/dashboard?welcome=true';
      } else {
        console.error('Registration failed:', response.error);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Globe2 className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Get Started with $100 Bonus
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create your trading account and receive a welcome bonus
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  type="text"
                  {...register('firstName')}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  {...register('lastName')}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Globe2 className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Welcome Bonus Details
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>$100 trading bonus upon registration</li>
                      <li>Complete trading requirements to withdraw bonus</li>
                      <li>24/7 support available</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExternalRegistrationPage;