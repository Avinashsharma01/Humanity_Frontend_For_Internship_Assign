import React from 'react';
import { Plus } from 'lucide-react';

const CampaignHeader = ({ activeTab, setActiveTab, campaignsCount, activeCampaignsCount }) => {
  const tabs = [
    { id: 'past', label: 'Past Promoters' },
    { id: 'new', label: 'New Promoters' },
    { id: 'leads', label: 'New Leads' }
  ];

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create & Manage Referral Campaigns</h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`px-8 py-2 rounded-md ${
              activeTab === tab.id 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Action buttons and stats */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
            <Plus size={18} />
            Create New Campaign
          </button>
          {campaignsCount > 0 && (
            <div className="text-sm text-gray-600">
              {campaignsCount} Campaigns • {activeCampaignsCount} Active
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search campaigns..."
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignHeader; 