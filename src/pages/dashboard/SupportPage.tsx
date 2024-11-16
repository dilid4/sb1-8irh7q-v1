import React from 'react';
import { MessageSquare, Phone, Mail, FileText, HelpCircle } from 'lucide-react';

const SupportPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
        <p className="mt-1 text-sm text-gray-500">
          Get help with your trading account and platform
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <h3 className="text-lg font-medium text-gray-900">Live Chat</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Chat with our support team in real-time
                </p>
                <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-500">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Phone className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <h3 className="text-lg font-medium text-gray-900">Phone Support</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Call us 24/7 for immediate assistance
                </p>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  +1 (800) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Mail className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <h3 className="text-lg font-medium text-gray-900">Email Support</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Send us an email anytime
                </p>
                <p className="mt-2 text-sm font-medium text-gray-900">
                  support@tradepro.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-6">
            {[
              {
                q: 'How do I deposit funds?',
                a: 'You can deposit funds using Bitcoin or bank transfer. Visit the Wallet page to see all available options.'
              },
              {
                q: 'What are the trading hours?',
                a: 'Trading hours vary by market. Forex markets are open 24/5, while stocks follow exchange hours.'
              },
              {
                q: 'How do I reset my password?',
                a: 'Click the "Forgot Password" link on the login page to reset your password via email.'
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                <dt className="text-sm font-medium text-gray-900">{faq.q}</dt>
                <dd className="mt-2 text-sm text-gray-500">{faq.a}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documentation */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Documentation</h2>
              <p className="mt-1 text-sm text-gray-500">
                Access our comprehensive trading guides and platform documentation
              </p>
            </div>
            <FileText className="h-6 w-6 text-gray-400" />
          </div>
          <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2">
            <a href="#" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <h3 className="text-sm font-medium text-gray-900">Platform Guide</h3>
              <p className="mt-1 text-sm text-gray-500">
                Learn how to use our trading platform effectively
              </p>
            </a>
            <a href="#" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <h3 className="text-sm font-medium text-gray-900">Trading Basics</h3>
              <p className="mt-1 text-sm text-gray-500">
                Understanding trading concepts and terminology
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;