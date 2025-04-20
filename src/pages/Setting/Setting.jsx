import React, { useState } from 'react';
import User_Profile from './components/User_Profile';
import Business_Profile from './components/Business_Profile';
import AISetting from './components/AISetting';
import EmailPhoneSetup from './components/EmailPhoneSetup';
import SubscriptionANDUsage from './components/SubscriptionANDUsage';

const Setting = () => {
  const [activeTab, setActiveTab] = useState('user-profile');
  
  // Mock user data
  const userData = {
    name: 'Avinash Sharma',
    email: 'avinashsharma@gmail.com',
    phone: '6201693634',
    password: '********'
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex-1 bg-gray-50 h-full">
      {/* Tabs */}
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex flex-wrap md:flex-nowrap  space-x-8 border-b border-gray-200">
          <button
            className={`py-4 text-sm font-medium whitespace-nowrap border-b-2 -mb-px ${
              activeTab === 'user-profile'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent'
            }`}
            onClick={() => handleTabChange('user-profile')}
          >
            User Profile
          </button>
          <button
            className={`py-4 text-sm font-medium whitespace-nowrap border-b-2 -mb-px ${
              activeTab === 'business-profile'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent'
            }`}
            onClick={() => handleTabChange('business-profile')}
          >
            Business Profile
          </button>
          <button
            className={`py-4 text-sm font-medium whitespace-nowrap border-b-2 -mb-px ${
              activeTab === 'ai-settings'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent'
            }`}
            onClick={() => handleTabChange('ai-settings')}
          >
            AI Settings
          </button>
          <button
            className={`py-4 text-sm font-medium whitespace-nowrap border-b-2 -mb-px ${
              activeTab === 'email-phone'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent'
            }`}
            onClick={() => handleTabChange('email-phone')}
          >
            Email & Phone Setup
          </button>
          <button
            className={`py-4 text-sm font-medium whitespace-nowrap border-b-2 -mb-px ${
              activeTab === 'subscription'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent'
            }`}
            onClick={() => handleTabChange('subscription')}
          >
            Subscription & Usage
          </button>
        </div>

        {/* Content based on active tab */}
        <div className="mt-6">
          {activeTab === 'user-profile' && <User_Profile />}
          {activeTab === 'business-profile' && <Business_Profile />}
          {activeTab === 'ai-settings' && <AISetting />}
          {activeTab === 'email-phone' && <EmailPhoneSetup />}
          {activeTab === 'subscription' && <SubscriptionANDUsage />}
        </div>
      </div>
    </div>
  );
};

export default Setting;