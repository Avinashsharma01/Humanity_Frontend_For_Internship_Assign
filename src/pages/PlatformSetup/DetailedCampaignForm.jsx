import React, { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';

// Detailed Campaign Form Component with promoter and lead settings
function DetailedCampaignForm({ onSubmit, initialData = {} }) {
  const [campaignData, setCampaignData] = useState({
    name: initialData.name || '',
    promoterRewardType: initialData.promoterRewardType || 'points',
    promoterRewardValue: initialData.promoterRewardValue || '',
    promoterMessage: initialData.promoterMessage || '',
    leadRewardType: initialData.leadRewardType || 'discount',
    leadRewardValue: initialData.leadRewardValue || '',
    leadMessage: initialData.leadMessage || '',
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we'd validate the form here
    onSubmit({ detailedCampaign: { ...campaignData, completed: true } });
  };

  const handleBack = () => {
    // Go back to previous step
    onSubmit({ detailedCampaign: { ...campaignData, goBack: true } });
  };

  return (
    <div className="w-3/4">
      <div className="mb-6 flex items-center">
        <button 
          onClick={handleBack}
          className="mr-3 text-gray-500 hover:text-blue-600 flex items-center"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-lg font-medium">Create New Campaign</h2>
          <p className="text-sm text-gray-600">Create a new referral campaign in just few steps.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="border rounded-md bg-white p-5 w-full">
          <label className="block text-sm font-medium mb-2">Campaign Name</label>
          <input 
            type="text" 
            name="name"
            value={campaignData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., Summer Referral Special" 
          />
        </div>
        
        {/* Promoter Settings Section */}
        <div className="border rounded-md bg-white p-5">
          <h3 className="font-medium mb-4">Promoter Settings</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Reward Type<span className="text-red-500">*</span></label>
              <div className="bg-blue-50 rounded-md p-3 text-center text-blue-600">
                Points
                <div className="text-xs text-blue-400">(10 conversion to 1 rupee)</div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Reward Value<span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="promoterRewardValue"
                value={campaignData.promoterRewardValue}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="e.g., 200 points" 
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Promoter Message<span className="text-red-500">*</span></label>
            <textarea 
              name="promoterMessage"
              value={campaignData.promoterMessage}
              onChange={handleChange}
              className="w-full p-2 border rounded" 
              rows="3"
              placeholder="e.g., &quot;Hey! Share this with your friends and get $20 for each successful signup!&quot;" 
            ></textarea>
          </div>
          
          {/* Follow-up Strategy Section */}
          <div className="bg-gray-50 rounded-md p-4 mb-4">
            <h4 className="font-medium mb-3">Follow-Up Strategy<span className="text-red-500">*</span></h4>
            
            <div className="bg-white rounded p-3 mb-3 border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="bg-green-100 text-green-800 p-1 rounded mr-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"></path>
                      <path d="M10 5a1 1 0 00-1 1v3H6a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V6a1 1 0 00-1-1z"></path>
                    </svg>
                  </span>
                  <span>SMS</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center text-gray-500 text-sm mb-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                  <span>1</span>
                </div>
                <div className="flex-grow h-0.5 bg-blue-100"></div>
                <div className="mx-2">Wait 5 days</div>
                <div className="flex-grow h-0.5 bg-blue-100"></div>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 ml-2">
                  <span>2</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded">
                <h5 className="text-sm font-medium mb-2">Action Type</h5>
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center">
                    <input type="radio" name="action_type_promoter" className="mr-2" />
                    <span>Email</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="action_type_promoter" className="mr-2" checked />
                    <span>SMS</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="action_type_promoter" className="mr-2" />
                    <span>Wait Duration</span>
                  </label>
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm mb-1">Phone Number</label>
                  <div className="relative">
                    <select className="w-full p-2 border rounded appearance-none bg-white pr-8">
                      <option>Select</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm mb-1">Follow-Up Message</label>
                  <textarea 
                    className="w-full p-2 border rounded" 
                    rows="2"
                    placeholder="Enter message..." 
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-3">
                <button className="w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                  <Plus size={16} className="mr-1" />
                  Add Action
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Leads Settings Section */}
        <div className="border rounded-md bg-white p-5">
          <h3 className="font-medium mb-4">Leads Settings</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Reward Type<span className="text-red-500">*</span></label>
              <div className="bg-blue-50 rounded-md p-3 text-center text-blue-600">
                Discount
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Reward Value<span className="text-red-500">*</span></label>
              <input 
                type="text" 
                name="leadRewardValue"
                value={campaignData.leadRewardValue}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="e.g., 20%" 
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Referred Message<span className="text-red-500">*</span></label>
            <textarea 
              name="leadMessage"
              value={campaignData.leadMessage}
              onChange={handleChange}
              className="w-full p-2 border rounded" 
              rows="3"
              placeholder="e.g., &quot;You've been invited! Sign up now and get 15% off your first order.&quot;" 
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Form Fields<span className="text-red-500">*</span></label>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span>Full Name</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span>Email Address</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span>Phone Number</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span>Agree</span>
              </label>
            </div>
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
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  );
}

export default DetailedCampaignForm; 