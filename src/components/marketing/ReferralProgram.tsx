import React, { useState } from 'react';
import { Share2, Copy, CheckCircle } from 'lucide-react';
import QRCode from 'qrcode.react';
import { ReferralCode } from '../../lib/types/marketing';

interface ReferralProgramProps {
  referralCode: ReferralCode;
  referralUrl: string;
}

const ReferralProgram: React.FC<ReferralProgramProps> = ({ referralCode, referralUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Referral Program</h3>
            <p className="mt-1 text-sm text-gray-500">
              Share your referral link and earn bonuses for each new trader
            </p>
          </div>
          <Share2 className="h-6 w-6 text-gray-400" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700">
                Your Referral Link
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  readOnly
                  value={referralUrl}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm"
                />
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                >
                  {copied ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900">Referral Benefits</h4>
              <ul className="mt-2 text-sm text-gray-500 space-y-2">
                <li>• ${referralCode.bonusAmount} bonus for each referral</li>
                <li>• Instant credit upon referral registration</li>
                <li>• No limit on number of referrals</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
            <QRCode value={referralUrl} size={160} />
            <p className="mt-4 text-sm text-gray-500">
              Scan to share your referral link
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">Statistics</h4>
          </div>
          <dl className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <dt className="text-sm font-medium text-gray-500">Total Referrals</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">
                {referralCode.usageCount}
              </dd>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <dt className="text-sm font-medium text-gray-500">Total Earned</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">
                ${referralCode.usageCount * referralCode.bonusAmount}
              </dd>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <dt className="text-sm font-medium text-gray-500">Active Traders</dt>
              <dd className="mt-1 text-2xl font-semibold text-gray-900">
                {Math.floor(referralCode.usageCount * 0.8)} {/* Example calculation */}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgram;