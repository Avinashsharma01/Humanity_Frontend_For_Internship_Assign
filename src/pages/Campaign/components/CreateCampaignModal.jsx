import React, { useState } from 'react';
import { Clock, Mail, MessageSquare, Plus, X } from 'lucide-react';

const CreateCampaignModal = ({ isOpen, onClose, onCreateCampaign }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: '',
    rewardType: 'discount',
    rewardValue: '',
    leadMessage: '',
    formFields: {
      fullName: true,
      emailAddress: true,
      phoneNumber: false,
      termsConditions: false
    },
    followUpStrategy: [
      { type: 'sms', waitTime: 0, waitUnit: 'days' },
      { type: 'wait', waitTime: 5, waitUnit: 'days' }
    ]
  });

  // For adding new actions to follow-up strategy
  const [actionType, setActionType] = useState('email');
  const [followUpMessage, setFollowUpMessage] = useState('');
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignData({
      ...campaignData,
      [name]: value
    });
  };

  const handleFormFieldToggle = (field) => {
    setCampaignData({
      ...campaignData,
      formFields: {
        ...campaignData.formFields,
        [field]: !campaignData.formFields[field]
      }
    });
  };

  const addFollowUpAction = () => {
    const newAction = {
      type: actionType,
      waitTime: 0,
      waitUnit: 'days',
      message: followUpMessage
    };
    
    // Add a "wait" step after every action except the first one
    if (campaignData.followUpStrategy.length > 0) {
      setCampaignData({
        ...campaignData,
        followUpStrategy: [
          ...campaignData.followUpStrategy,
          { type: 'wait', waitTime: 3, waitUnit: 'days' },
          newAction
        ]
      });
    } else {
      setCampaignData({
        ...campaignData,
        followUpStrategy: [...campaignData.followUpStrategy, newAction]
      });
    }
    
    setFollowUpMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateCampaign(campaignData);
    onClose();
    // Reset form
    setCampaignData({
      name: '',
      rewardType: 'discount',
      rewardValue: '',
      leadMessage: '',
      formFields: {
        fullName: true,
        emailAddress: true,
        phoneNumber: false,
        termsConditions: false
      },
      followUpStrategy: [
        { type: 'sms', waitTime: 0, waitUnit: 'days' },
        { type: 'wait', waitTime: 5, waitUnit: 'days' }
      ]
    });
    setCurrentStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center z-50 bg-transparent bg-opacity-20 backdrop-blur-sm">
      <div className="bg-white border qborder-gray-200 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="text-xl font-semibold">Create New Campaign</h2>
            <p className="text-sm text-gray-500">Create a new referral campaign in just few steps.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 flex items-center justify-center">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              01
            </div>
            <div className="w-20 h-1 mx-2 bg-gray-200">
              <div className={`h-full ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              02
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-1">
          <div className="text-xs text-gray-500 text-center w-32">Promoter Settings</div>
          <div className="text-xs text-gray-500 text-center w-32">Leads Settings</div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {currentStep === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={campaignData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="e.g., Summer Referral Special"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reward Type*
                  </label>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-blue-800 font-medium">Discount</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reward Value*
                  </label>
                  <input
                    type="text"
                    name="rewardValue"
                    value={campaignData.rewardValue}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="e.g., 20%"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lead Message*
                </label>
                <textarea
                  name="leadMessage"
                  value={campaignData.leadMessage}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="e.g., 'You've been invited! Sign up now and get 15% off your first order.'"
                  required
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                >
                  Continue
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  Form Fields <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="fullName"
                      checked={campaignData.formFields.fullName}
                      onChange={() => handleFormFieldToggle('fullName')}
                      className="mr-2"
                    />
                    <label htmlFor="fullName" className="text-sm">Full Name</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emailAddress"
                      checked={campaignData.formFields.emailAddress}
                      onChange={() => handleFormFieldToggle('emailAddress')}
                      className="mr-2"
                    />
                    <label htmlFor="emailAddress" className="text-sm">Email Address</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="phoneNumber"
                      checked={campaignData.formFields.phoneNumber}
                      onChange={() => handleFormFieldToggle('phoneNumber')}
                      className="mr-2"
                    />
                    <label htmlFor="phoneNumber" className="text-sm">Phone Number</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="termsConditions"
                      checked={campaignData.formFields.termsConditions}
                      onChange={() => handleFormFieldToggle('termsConditions')}
                      className="mr-2"
                    />
                    <label htmlFor="termsConditions" className="text-sm">Agree to Terms & Conditions & Opt-in</label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  Follow-Up Strategy <span className="text-red-500 ml-1">*</span>
                </label>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  {/* Existing follow up strategy */}
                  <div className="flex flex-col items-center space-y-2 py-4">
                    {campaignData.followUpStrategy.map((step, index) => (
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

                  {/* Action Type */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Action Type
                    </label>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="email"
                          name="actionType"
                          value="email"
                          checked={actionType === 'email'}
                          onChange={() => setActionType('email')}
                          className="mr-2"
                        />
                        <label htmlFor="email" className="text-sm">Email</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="sms"
                          name="actionType"
                          value="sms"
                          checked={actionType === 'sms'}
                          onChange={() => setActionType('sms')}
                          className="mr-2"
                        />
                        <label htmlFor="sms" className="text-sm">SMS</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="waitDuration"
                          name="actionType"
                          value="wait"
                          checked={actionType === 'wait'}
                          onChange={() => setActionType('wait')}
                          className="mr-2"
                        />
                        <label htmlFor="waitDuration" className="text-sm">Wait Duration</label>
                      </div>
                    </div>
                  </div>

                  {/* Phone Number (for SMS) */}
                  {actionType === 'sms' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <select
                        value={selectedPhoneNumber}
                        onChange={(e) => setSelectedPhoneNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        <option value="">Select</option>
                        <option value="1">+1 (555) 123-4567</option>
                        <option value="2">+1 (555) 987-6543</option>
                      </select>
                    </div>
                  )}

                  {/* Follow-Up Message */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Follow-Up Message
                    </label>
                    <textarea
                      value={followUpMessage}
                      onChange={(e) => setFollowUpMessage(e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter message..."
                    />
                  </div>

                  {/* Add Action button */}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={addFollowUpAction}
                      className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      <Plus size={16} className="mr-2" /> Add Action
                    </button>
                  </div>
                </div>
              </div>

              {/* Landing Page Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Landing Page Preview
                </label>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="text-center py-8">
                    <h2 className="text-xl font-bold mb-2">You've been invited by [Promoter Name]!</h2>
                    <div className="max-w-sm mx-auto">
                      <p className="text-sm text-gray-600 mb-4">
                        SnackNation delivers hand-picked, chef-curated snacks — from spicy wasabi nuts to sweet pastry treats — delivered fresh to your door in under 45 minutes.
                      </p>
                      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                        <p className="font-medium">Get 20% off on your first order</p>
                      </div>
                      <div className="space-y-3 max-w-sm mx-auto">
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Full Name"
                          disabled
                        />
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Email Address"
                          disabled
                        />
                      </div>
                      <button
                        type="button"
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
                        disabled
                      >
                        Claim Your Reward
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                >
                  Launch
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateCampaignModal; 