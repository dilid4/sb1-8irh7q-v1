import React, { useEffect, useState } from 'react';
import { Bitcoin, Copy, CheckCircle } from 'lucide-react';
import { paymentService } from '../../lib/services/paymentService';
import QRCode from 'qrcode.react';

const DepositForm = () => {
  const [btcAddress, setBtcAddress] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBTCAddress = async () => {
      const address = await paymentService.getMainBTCAddress();
      setBtcAddress(address);
    };

    fetchBTCAddress();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(btcAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex items-center mb-4">
          <Bitcoin className="h-6 w-6 text-orange-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Bitcoin Deposit</h3>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg">
              <QRCode value={btcAddress} size={160} />
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              value={btcAddress}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {copied ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>

          <div className="text-sm text-gray-500">
            <p>• Send only BTC to this address</p>
            <p>• Minimum deposit: 0.001 BTC</p>
            <p>• Deposits will be credited after 3 network confirmations</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700">
          Your deposit will be automatically credited to your account once confirmed on the blockchain.
          This usually takes 30-60 minutes.
        </p>
      </div>
    </div>
  );
};

export default DepositForm;