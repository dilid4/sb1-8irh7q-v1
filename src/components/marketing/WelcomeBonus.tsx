import React from 'react';
import { Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WelcomeBonus = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-8 sm:p-10 sm:pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white">Welcome Bonus</h3>
            <p className="mt-2 text-lg text-blue-100">
              Start trading with a $100 bonus
            </p>
          </div>
          <Gift className="h-12 w-12 text-blue-200" />
        </div>
        
        <div className="mt-6">
          <div className="text-3xl font-extrabold text-white">
            $100
            <span className="ml-2 text-xl font-medium text-blue-200">USD</span>
          </div>
        </div>
      </div>
      
      <div className="px-6 pt-6 pb-8 bg-blue-700 sm:px-10 sm:py-6">
        <ul className="space-y-3">
          {[
            'No deposit required',
            'Trade Forex, Crypto, and more',
            'Complete trading requirements to withdraw',
            '24/7 support available'
          ].map((feature, index) => (
            <li key={index} className="flex items-center text-blue-100">
              <ArrowRight className="h-5 w-5 text-blue-300 mr-2" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <div className="rounded-lg shadow-sm">
            <Link
              to="/register"
              className="block w-full text-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-colors"
            >
              Get Started Now
            </Link>
          </div>
          <p className="mt-4 text-sm text-blue-100 text-center">
            Terms and conditions apply
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBonus;