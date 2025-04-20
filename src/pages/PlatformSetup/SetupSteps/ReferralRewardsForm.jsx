import React, { useState } from 'react';
import { Gift, Info, ArrowLeft, ArrowRight, DollarSign, Percent, Check, Award } from 'lucide-react';

function ReferralRewardsForm({ onSubmit, initialData = {} }) {
  const [formValues, setFormValues] = useState(initialData || {
    rewardType: 'cash',
    rewardAmount: '',
    rewardDescription: '',
    referrerRewardType: 'cash',
    referrerRewardAmount: '',
    referrerRewardDescription: '',
    minimumPurchase: '',
    referralExpiration: '30'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ referralRewards: { ...formValues, completed: true } });
  };

  const handleBack = (e) => {
    e.preventDefault();
    onSubmit({ referralRewards: { ...formValues, goBack: true } });
  };

  return (
    <div>
      <p className="text-gray-600 mb-6">
        Set up attractive rewards for both the referrer and their connections
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Rewards Section */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Gift className="mr-2 text-blue-500" size={20} />
            Rewards for New Customers
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Reward Type</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className={`p-3 border rounded-md flex flex-col items-center justify-center ${formValues.rewardType === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                onClick={() => setFormValues(prev => ({ ...prev, rewardType: 'cash' }))}
              >
                <DollarSign size={20} className={formValues.rewardType === 'cash' ? 'text-blue-500' : 'text-gray-500'} />
                <span className={formValues.rewardType === 'cash' ? 'text-blue-700' : 'text-gray-700'}>Cash</span>
              </button>
              <button
                type="button"
                className={`p-3 border rounded-md flex flex-col items-center justify-center ${formValues.rewardType === 'discount' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                onClick={() => setFormValues(prev => ({ ...prev, rewardType: 'discount' }))}
              >
                <Percent size={20} className={formValues.rewardType === 'discount' ? 'text-blue-500' : 'text-gray-500'} />
                <span className={formValues.rewardType === 'discount' ? 'text-blue-700' : 'text-gray-700'}>Discount</span>
              </button>
              <button
                type="button"
                className={`p-3 border rounded-md flex flex-col items-center justify-center ${formValues.rewardType === 'product' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                onClick={() => setFormValues(prev => ({ ...prev, rewardType: 'product' }))}
              >
                <Gift size={20} className={formValues.rewardType === 'product' ? 'text-blue-500' : 'text-gray-500'} />
                <span className={formValues.rewardType === 'product' ? 'text-blue-700' : 'text-gray-700'}>Free Product</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formValues.rewardType === 'cash' ? 'Cash Amount ($)' : 
                 formValues.rewardType === 'discount' ? 'Discount Percentage (%)' : 'Product Value ($)'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {formValues.rewardType === 'discount' ? 
                    <Percent size={16} className="text-gray-500" /> : 
                    <DollarSign size={16} className="text-gray-500" />
                  }
                </div>
                <input
                  type="number"
                  name="rewardAmount"
                  className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder={formValues.rewardType === 'discount' ? "e.g., 15" : "e.g., 25"}
                  value={formValues.rewardAmount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reward Description
              </label>
              <input
                type="text"
                name="rewardDescription"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., $25 off your first purchase"
                value={formValues.rewardDescription}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Referrer Rewards Section */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Award className="mr-2 text-blue-500" size={20} />
            Rewards for Referrers
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Reward Type</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className={`p-3 border rounded-md flex flex-col items-center justify-center ${formValues.referrerRewardType === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                onClick={() => setFormValues(prev => ({ ...prev, referrerRewardType: 'cash' }))}
              >
                <DollarSign size={20} className={formValues.referrerRewardType === 'cash' ? 'text-blue-500' : 'text-gray-500'} />
                <span className={formValues.referrerRewardType === 'cash' ? 'text-blue-700' : 'text-gray-700'}>Cash</span>
              </button>
              <button
                type="button"
                className={`p-3 border rounded-md flex flex-col items-center justify-center ${formValues.referrerRewardType === 'discount' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                onClick={() => setFormValues(prev => ({ ...prev, referrerRewardType: 'discount' }))}
              >
                <Percent size={20} className={formValues.referrerRewardType === 'discount' ? 'text-blue-500' : 'text-gray-500'} />
                <span className={formValues.referrerRewardType === 'discount' ? 'text-blue-700' : 'text-gray-700'}>Discount</span>
              </button>
              <button
                type="button"
                className={`p-3 border rounded-md flex flex-col items-center justify-center ${formValues.referrerRewardType === 'product' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                onClick={() => setFormValues(prev => ({ ...prev, referrerRewardType: 'product' }))}
              >
                <Gift size={20} className={formValues.referrerRewardType === 'product' ? 'text-blue-500' : 'text-gray-500'} />
                <span className={formValues.referrerRewardType === 'product' ? 'text-blue-700' : 'text-gray-700'}>Free Product</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formValues.referrerRewardType === 'cash' ? 'Cash Amount ($)' : 
                 formValues.referrerRewardType === 'discount' ? 'Discount Percentage (%)' : 'Product Value ($)'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {formValues.referrerRewardType === 'discount' ? 
                    <Percent size={16} className="text-gray-500" /> : 
                    <DollarSign size={16} className="text-gray-500" />
                  }
                </div>
                <input
                  type="number"
                  name="referrerRewardAmount"
                  className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder={formValues.referrerRewardType === 'discount' ? "e.g., 15" : "e.g., 25"}
                  value={formValues.referrerRewardAmount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reward Description
              </label>
              <input
                type="text"
                name="referrerRewardDescription"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., $25 for each successful referral"
                value={formValues.referrerRewardDescription}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Additional Settings */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Info className="mr-2 text-blue-500" size={20} />
            Additional Settings
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Purchase Amount ($)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign size={16} className="text-gray-500" />
                </div>
                <input
                  type="number"
                  name="minimumPurchase"
                  className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 50"
                  value={formValues.minimumPurchase}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Referral Expiration (days)
              </label>
              <input
                type="number"
                name="referralExpiration"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 30"
                value={formValues.referralExpiration}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button 
            type="button"
            onClick={handleBack}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-medium flex items-center"
          >
            <ArrowLeft size={18} className="mr-2" /> Back
          </button>
          <button 
            type="submit"
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium flex items-center"
          >
            Next <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReferralRewardsForm; 