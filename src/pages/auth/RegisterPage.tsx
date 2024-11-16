import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Globe2, ArrowRight } from 'lucide-react';
import { registerSchema } from '../../lib/schemas/auth';
import Input from '../../components/ui/Input';
import { userService } from '../../lib/services/userService';
import Navbar from '../../components/Navbar';

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Create user
      await userService.createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: 'user',
        status: 'active'
      });

      // Log in the user
      const response = await userService.authenticate(data.email, data.password);
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      setError('root', {
        message: error instanceof Error ? error.message : 'Registration failed'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="flex justify-center">
            <Globe2 className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </motion.div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {errors.root && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{errors.root.message}</p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="First name"
                  {...register('firstName')}
                  error={errors.firstName?.message}
                />
                <Input
                  label="Last name"
                  {...register('lastName')}
                  error={errors.lastName?.message}
                />
              </div>

              <Input
                label="Email address"
                type="email"
                {...register('email')}
                error={errors.email?.message}
              />

              <Input
                label="Phone number"
                type="tel"
                {...register('phone')}
                error={errors.phone?.message}
              />

              <Input
                label="Password"
                type="password"
                {...register('password')}
                error={errors.password?.message}
              />

              <Input
                label="Confirm password"
                type="password"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />

              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;