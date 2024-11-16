import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import LandingPagesList from '../../components/admin/marketing/LandingPagesList';
import CreateLandingPageModal from '../../components/admin/marketing/CreateLandingPageModal';
import { LandingPage } from '../../lib/types/marketing';

// Sample data - replace with API call
const SAMPLE_LANDING_PAGES: LandingPage[] = [
  {
    id: '1',
    slug: 'welcome-bonus',
    title: 'Get $100 Welcome Bonus',
    description: 'Start trading with a $100 welcome bonus',
    bonusAmount: 100,
    isActive: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
    visits: 150,
    registrations: 25
  }
];

const LandingPagesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateLandingPage = (page: Omit<LandingPage, 'id' | 'createdAt' | 'updatedAt' | 'visits' | 'registrations'>) => {
    console.log('Creating landing page:', page);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Landing Pages</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage external registration pages and track conversions
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Landing Page
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search landing pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <LandingPagesList pages={SAMPLE_LANDING_PAGES} />

      {showCreateModal && (
        <CreateLandingPageModal
          onSubmit={handleCreateLandingPage}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default LandingPagesPage;