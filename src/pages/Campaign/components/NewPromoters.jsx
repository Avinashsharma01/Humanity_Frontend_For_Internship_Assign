import React, { useState } from 'react';
import { Calendar, Check, Clock, Mail, MessageSquare, Pencil, Trash } from 'lucide-react';

const NewPromoters = () => {
  const [campaignData, setCampaignData] = useState({
    name: 'Summer Referral Special',
    rewardType: 'points',
    rewardValue: '200 points',
    message: 'Hey! Share this with your friends and get $20 for each successful signup!',
  });
  
  // Create a state with the same pattern as in NewLeads
  const [followUpSteps, setFollowUpSteps] = useState([
    { type: 'sms', waitTime: 0, waitUnit: 'days' },
    { type: 'wait', waitTime: 1, waitUnit: 'days' },
    { type: 'email', waitTime: 0, waitUnit: 'days' },
    { type: 'wait', waitTime: 2, waitUnit: 'days' },
    { type: 'sms', waitTime: 0, waitUnit: 'days' },
    { type: 'wait', waitTime: 3, waitUnit: 'days' },
    { type: 'email', waitTime: 0, waitUnit: 'days' },
    { type: 'wait', waitTime: 2, waitUnit: 'days' },
    { type: 'sms', waitTime: 0, waitUnit: 'days' }
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignData({
      ...campaignData,
      [name]: value
    });
  };

  return (
    <div className="space-y-8 bg-white rounded-md p-8">
      <div className="flex space-x-4 border-b pb-4">
        <button className="px-6 py-2 bg-blue-100 text-blue-600 rounded-md">
          Promoter Settings
        </button>
        <button className="px-6 py-2 text-gray-600 rounded-md">
          Leads Settings
        </button>
      </div>

      {/* Campaign Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Campaign Name
        </label>
        <input
          type="text"
          name="name"
          value={campaignData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Reward Type and Value */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Reward Type*
          </label>
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-blue-800 font-medium">Points</p>
            <p className="text-xs text-blue-600">($1 is equivalent to 10 points)</p>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Reward Value*
          </label>
          <input
            type="text"
            name="rewardValue"
            value={campaignData.rewardValue}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="200 points"
          />
        </div>
      </div>

      {/* Promoter Message */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Promoter Message*
        </label>
        <textarea
          name="message"
          value={campaignData.message}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Enter the message that promoters will share"
        ></textarea>
      </div>

      {/* Follow-Up Strategy */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="mb-4">
          <h4 className="text-base font-medium text-gray-800 flex items-center">
            Follow-Up Strategy<span className="text-red-500 ml-1">*</span>
          </h4>
        </div>
        
        {/* Timeline */}
        <div className="flex flex-col items-center space-y-2 py-4">
          {followUpSteps.map((step, index) => (
            <React.Fragment key={index}>
              {step.type !== 'wait' ? (
                <div className="w-full flex justify-center">
                  <div className="flex items-center bg-white rounded-lg px-4 py-2 border border-gray-200 shadow-sm w-fit">
                    <div className="mr-4">
                      {step.type === 'sms' ? (
                        <div className="bg-green-100 rounded-full p-2">
                          <MessageSquare size={20} className="text-green-600" />
                        </div>
                      ) : (
                        <div className="bg-blue-100 rounded-full p-2">
                          <Mail size={20} className="text-blue-600" />
                        </div>
                      )}
                    </div>
                    <div className="mr-4">
                      <span className="text-gray-700">
                        {step.type === 'sms' ? 'SMS' : 'Email'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Pencil size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500">
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="h-10 w-0.5 bg-gray-300"></div>
                  <div className="flex items-center bg-white rounded-lg px-4 py-2 border border-gray-200 shadow-sm">
                    <div className="mr-4">
                      <div className="bg-gray-100 rounded-full p-2">
                        <Clock size={20} className="text-gray-600" />
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-700">Wait- {step.waitTime} days</span>
                    </div>
                  </div>
                  <div className="h-10 w-0.5 bg-gray-300"></div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Landing Page Preview */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Landing Page Preview</h3>
        
        <div className="border rounded-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button className="px-4 py-2 text-sm border-r">Chat with AI</button>
            <button className="px-4 py-2 text-sm border-r">My Leads</button>
            <button className="px-4 py-2 text-sm">My Rewards</button>
          </div>
          
          {/* Preview Content */}
          <div className="p-6 bg-gray-50 min-h-[250px]">
            <div className="text-center space-y-3">
              <h2 className="text-xl font-bold">Welcome back! You're promoting:</h2>
              <h1 className="text-2xl font-bold">SnackNation Express</h1>
              
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                SnackNation delivers hand-picked, chef-curated snacks — from spicy wasabi nuts to sweet pastry treats — delivered fresh to your door in under 45 minutes.
              </p>
              
              <div className="bg-white p-4 rounded-lg shadow-sm mt-6">
                <p className="font-medium">Every successful referral earns you 200 points</p>
              </div>
              
              <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md">
                Start Promoting & Earning
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit Button */}
      <div className="flex justify-center pt-4">
        <button className="px-8 py-2 bg-blue-500 text-white rounded-md">
          Edit
        </button>
      </div>
    </div>
  );
};

export default NewPromoters; 