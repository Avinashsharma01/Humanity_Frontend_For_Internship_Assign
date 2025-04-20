import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

// Agent Rules Form Component
function AgentRulesForm({ onSubmit, initialData = {} }) {
  const [agentEnabled, setAgentEnabled] = useState(initialData.enabled ?? true);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we'd collect form data here
    onSubmit({ agentRules: { ...initialData, enabled: agentEnabled, completed: true } });
  };

  const handleBack = () => {
    // Go back to previous step
    onSubmit({ agentRules: { ...initialData, goBack: true } });
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
        <h2 className="text-lg font-medium">AI Agent Rules: Automate Your Referral Program</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <h3 className="text-blue-800 font-medium mb-2">Enable AI Agent</h3>
          <p className="text-sm text-blue-700 mb-3">
            The AI agent can proactively reach out to customers, follow up with leads, and optimize your campaigns based on performance data.
          </p>
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={agentEnabled}
                onChange={() => setAgentEnabled(!agentEnabled)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                {agentEnabled ? 'Agent Enabled' : 'Agent Disabled'}
              </span>
            </label>
          </div>
        </div>

        {agentEnabled && (
          <>
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">Communication Preferences</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    id="comms-email" 
                    type="checkbox" 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                    defaultChecked={initialData.commsEmail ?? true}
                  />
                  <label htmlFor="comms-email" className="ml-2 block text-sm text-gray-700">
                    Allow AI to send emails to customers
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    id="comms-sms" 
                    type="checkbox" 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                    defaultChecked={initialData.commsSms ?? true}
                  />
                  <label htmlFor="comms-sms" className="ml-2 block text-sm text-gray-700">
                    Allow AI to send SMS to customers
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    id="comms-messaging" 
                    type="checkbox" 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                    defaultChecked={initialData.commsMessaging ?? false}
                  />
                  <label htmlFor="comms-messaging" className="ml-2 block text-sm text-gray-700">
                    Allow AI to use in-app messaging
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">Agent Behavior</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    id="behavior-follow" 
                    type="checkbox" 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                    defaultChecked={initialData.behaviorFollow ?? true}
                  />
                  <label htmlFor="behavior-follow" className="ml-2 block text-sm text-gray-700">
                    Automatically follow up with leads who haven't converted
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    id="behavior-optimize" 
                    type="checkbox" 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                    defaultChecked={initialData.behaviorOptimize ?? true}
                  />
                  <label htmlFor="behavior-optimize" className="ml-2 block text-sm text-gray-700">
                    Optimize campaigns based on performance data
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    id="behavior-suggest" 
                    type="checkbox" 
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded" 
                    defaultChecked={initialData.behaviorSuggest ?? true}
                  />
                  <label htmlFor="behavior-suggest" className="ml-2 block text-sm text-gray-700">
                    Suggest new campaign ideas based on customer behavior
                  </label>
                </div>
              </div>
            </div>
          </>
        )}
        
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

export default AgentRulesForm; 