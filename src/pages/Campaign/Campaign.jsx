import React, { useState } from 'react';
import { Eye, Trash2, Plus, Search, Filter } from 'lucide-react';
import CreateCampaignModal from './components/CreateCampaignModal';
import { PastPromoters, NewPromoters, NewLeads } from './components';

function Campaign() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Summer Referral Program',
      status: 'Active',
      dateRange: '5/31/2024 - 8/30/2024',
      referrals: '245',
      conversion: '32%',
      roi: '287%',
      aiSuggestion: 'Increase reward by 10% to boost conversion rates during peak season'
    },
    {
      id: 2,
      name: 'Early Bird Special',
      status: 'Inactive',
      dateRange: '8/20/2024 - 9/19/2024',
      referrals: '300',
      conversion: '40%',
      roi: '320%',
      aiSuggestion: 'Extend your campaign! Strong engagement suggests higher conversions with more time.'
    },
    {
      id: 3,
      name: 'Holiday Promotion',
      status: 'Active',
      dateRange: '11/20/2024 - 12/31/2024',
      referrals: '127',
      conversion: '28%',
      roi: '215%',
      aiSuggestion: 'Consider offering a tiered reward structure to incentivize multiple referrals.'
    }
  ]);

  // Filter campaigns based on search term
  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count active campaigns
  const activeCampaignsCount = campaigns.filter(campaign => 
    campaign.status === 'Active'
  ).length;

  const handleCreateCampaign = (campaignData) => {
    // Generate a simple ID for new campaign
    const newId = campaigns.length > 0 
      ? Math.max(...campaigns.map(c => c.id)) + 1 
      : 1;
    
    // Format date range
    const startDate = new Date(campaignData.startDate);
    const endDate = new Date(campaignData.endDate);
    const dateRange = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    
    // Create new campaign object
    const newCampaign = {
      id: newId,
      name: campaignData.name,
      status: 'Active',
      dateRange,
      referrals: '0',
      conversion: '0%',
      roi: '0%',
      rewardType: campaignData.rewardType,
      rewardValue: campaignData.rewardValue,
      description: campaignData.description
    };
    
    // Add to campaigns list
    setCampaigns([...campaigns, newCampaign]);
  };

  const handleDeleteCampaign = (campaignId) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'past':
        return <PastPromoters onDelete={handleDeleteCampaign} />;
      case 'new':
        return <NewPromoters />;
      case 'leads':
        return <NewLeads />;
      case 'all':
        return renderCampaignList();
      default:
        return renderCampaignList();
    }
  };

  // Render the main campaign list
  const renderCampaignList = () => {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map(campaign => (
            <div 
              key={campaign.id} 
              className="bg-white rounded-lg border shadow-sm"
            >
              <div className="p-5 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{campaign.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{campaign.dateRange}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    campaign.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x border-b">
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-600">Referrals</p>
                  <p className="text-2xl font-bold mt-1">{campaign.referrals}</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-600">Conversion</p>
                  <p className="text-2xl font-bold mt-1">{campaign.conversion}</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-600">ROI</p>
                  <p className="text-2xl font-bold mt-1">{campaign.roi}</p>
                </div>
              </div>

              {campaign.aiSuggestion && (
                <div className="p-4 bg-blue-50 border-b flex items-start">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-xs">AI</span>
                  </div>
                  <p className="text-sm text-gray-700">{campaign.aiSuggestion}</p>
                </div>
              )}

              <div className="p-4 flex justify-between">
                <button 
                  className="text-red-600 hover:text-red-800 flex items-center"
                  onClick={() => handleDeleteCampaign(campaign.id)}
                >
                  <Trash2 size={18} className="mr-1" />
                  <span>Delete</span>
                </button>
                <button className="text-gray-600 hover:text-gray-900 flex items-center">
                  <Eye size={18} className="mr-1" />
                  <span>View</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredCampaigns.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">No campaigns found</h3>
            <p className="text-gray-500 mb-4">Create your first campaign to get started</p>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Campaign
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-6">
        {/* Header with title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create & Manage Referral Campaigns</h1>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <button
            className={`px-4 py-2 rounded text-sm font-medium ${
              activeTab === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All Campaigns
          </button>
          <button
            className={`px-4 py-2 rounded text-sm font-medium ${
              activeTab === 'past'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('past')}
          >
            Past Promoters
          </button>
          <button
            className={`px-4 py-2 rounded text-sm font-medium ${
              activeTab === 'new'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('new')}
          >
            New Promoters
          </button>
          <button
            className={`px-4 py-2 rounded text-sm font-medium ${
              activeTab === 'leads'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('leads')}
          >
            New Leads
          </button>
        </div>

        {/* Action and filter bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500 mb-1">Active Campaigns</p>
            <p className="text-2xl font-bold">{activeCampaignsCount}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search campaigns"
                className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-auto"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700">
              <Filter size={16} />
              Filter
            </button>
            
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus size={16} />
              Create Campaign
            </button>
          </div>
        </div>

        {/* Main content area */}
        {renderTabContent()}
      </div>

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateCampaign}
      />
    </div>
  );
}

export default Campaign; 