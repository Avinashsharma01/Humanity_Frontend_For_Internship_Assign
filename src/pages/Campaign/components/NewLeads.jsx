import React, { useState } from 'react';
import { Check, Clock, Globe, Mail, MessageSquare, Pencil, Phone, Trash, User } from 'lucide-react';

const NewLeads = () => {
  const [activeTab, setActiveTab] = useState('leadsSettings');
  const [followUpSteps, setFollowUpSteps] = useState([
    { type: 'sms', waitTime: 0, waitUnit: 'days' },
    { type: 'wait', waitTime: 5, waitUnit: 'days' },
    { type: 'email', waitTime: 0, waitUnit: 'days' },
    { type: 'wait', waitTime: 2, waitUnit: 'days' },
    { type: 'sms', waitTime: 0, waitUnit: 'days' },
    { type: 'wait', waitTime: 3, waitUnit: 'days' },
    { type: 'sms', waitTime: 0, waitUnit: 'days' }
  ]);

  const [leadsData, setLeadsData] = useState({
    leadNotifications: true,
  });

  const toggleNotifications = () => {
    setLeadsData({
      ...leadsData,
      leadNotifications: !leadsData.leadNotifications
    });
  };

  return (
    <div className="space-y-8 bg-white rounded-md p-8">
      <div className="flex space-x-4 border-b pb-4">
        <button 
          className="px-6 py-2 text-gray-600 rounded-md"
          onClick={() => setActiveTab('promoterSettings')}>
          Promoter Settings
        </button>
        <button 
          className="px-6 py-2 bg-blue-100 text-blue-600 rounded-md"
          onClick={() => setActiveTab('leadsSettings')}>
          Leads Settings
        </button>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-800">Leads Settings</h3>
        
        {/* Follow Up Strategy */}
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
        
        {/* Lead Notifications */}
        {/* <div className="flex items-center space-x-3">
          <button 
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              leadsData.leadNotifications 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}
            onClick={toggleNotifications}
          >
            {leadsData.leadNotifications && <Check size={14} />}
          </button>
          <span className="text-gray-700">Notify me when new leads are captured</span>
        </div> */}
      </div>
      
      {/* Save Button */}
      {/* <div className="flex justify-center pt-4">
        <button className="px-8 py-2 bg-blue-500 text-white rounded-md">
          Save Changes
        </button>
      </div> */}
    </div>
  );
};

export default NewLeads; 