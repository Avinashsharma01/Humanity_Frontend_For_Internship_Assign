import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

// Campaign Setup Form Component
function CampaignSetupForm({ onSubmit, initialData = {} }) {
  const [campaignType, setCampaignType] = useState(initialData.type || 'referral');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we'd collect form data here
    onSubmit({ campaignSetup: { ...initialData, type: campaignType, completed: true } });
  };

  const handleBack = () => {
    // Go back to previous step
    onSubmit({ campaignSetup: { ...initialData, goBack: true } });
  };

  return (
    <div className="w-2/3">
      <div className="mb-6 flex items-center">
        <button 
          onClick={handleBack}
          className="mr-3 text-gray-500 hover:text-blue-600 flex items-center"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-lg font-medium">Campaign Setup: Choose Campaign Type</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Referral Campaign */}
          <div 
            className={`p-4 border rounded-md cursor-pointer ${campaignType === 'referral' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            onClick={() => setCampaignType('referral')}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h3 className="font-medium mb-1">Referral Campaign</h3>
            <p className="text-sm text-gray-600">Incentivize your customers to refer their friends and family.</p>
          </div>
          
          {/* Loyalty Program */}
          <div 
            className={`p-4 border rounded-md cursor-pointer ${campaignType === 'loyalty' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            onClick={() => setCampaignType('loyalty')}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-medium mb-1">Loyalty Program</h3>
            <p className="text-sm text-gray-600">Reward your customers for their continued business and engagement.</p>
          </div>
          
          {/* Affiliate Program */}
          <div 
            className={`p-4 border rounded-md cursor-pointer ${campaignType === 'affiliate' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            onClick={() => setCampaignType('affiliate')}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-medium mb-1">Affiliate Program</h3>
            <p className="text-sm text-gray-600">Partner with content creators and influencers to promote your products.</p>
          </div>
          
          {/* Partner Program */}
          <div 
            className={`p-4 border rounded-md cursor-pointer ${campaignType === 'partner' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
            onClick={() => setCampaignType('partner')}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
            </div>
            <h3 className="font-medium mb-1">Partner Program</h3>
            <p className="text-sm text-gray-600">Collaborate with businesses to cross-promote and expand reach.</p>
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <button 
            type="button"
            onClick={handleBack}
            className="w-1/4 bg-white border border-blue-500 text-blue-600 py-3 rounded hover:bg-blue-50 transition"
          >
            Back
          </button>
          <button 
            type="submit"
            className="w-3/4 bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default CampaignSetupForm; 