import React, { useState } from 'react';
import { Settings, HelpCircle, Layout, Cpu, BarChart2, Users, FileText, CreditCard, ArrowLeft, ArrowRight } from 'lucide-react';

// Business Identity Form Component (Right side of content)
function BusinessIdentityForm({ onSubmit, initialData = {} }) {
    const [formValues, setFormValues] = useState(initialData || {});
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }));
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Submit the form data
      onSubmit({ businessIdentity: { ...formValues, completed: true } });
    };
    
    const handleBack = (e) => {
      e.preventDefault();
      // Submit with goBack flag
      onSubmit({ businessIdentity: { ...formValues, goBack: true } });
    };

    return (
      <div>
        <p className="text-gray-600 mb-6">
          Help us tailor the referral experience by adding key details about your business
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Logo</label>
            <button 
              type="button"
              className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
            >
              Choose Image
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
            <textarea 
              name="description"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Enter business description..."
              rows="4"
              value={formValues.description || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input 
                type="text" 
                name="name"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter business name" 
                value={formValues.name || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Email</label>
              <input 
                type="email" 
                name="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., robert.fox@myemail.com" 
                value={formValues.email || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Phone No.</label>
              <input 
                type="text" 
                name="phone"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter phone no." 
                value={formValues.phone || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <select 
                name="industry"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                value={formValues.industry || ''}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="technology">Technology</option>
                <option value="ecommerce">E-commerce</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="finance">Finance</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
              <input 
                type="text" 
                name="services"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter services..." 
                value={formValues.services || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Products</label>
              <input 
                type="text" 
                name="products"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter products..." 
                value={formValues.products || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Size <span className="text-gray-400">(Optional)</span></label>
              <select 
                name="companySize"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                value={formValues.companySize || ''}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501+">501+ employees</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select
                name="city"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                value={formValues.city || ''}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="new-york">New York</option>
                <option value="los-angeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
                <option value="houston">Houston</option>
                <option value="miami">Miami</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <select
                name="state"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                value={formValues.state || ''}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="ca">California</option>
                <option value="ny">New York</option>
                <option value="tx">Texas</option>
                <option value="fl">Florida</option>
                <option value="il">Illinois</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
              <input 
                type="text" 
                name="zipCode"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter zip code" 
                value={formValues.zipCode || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="flex justify-between">
            <button 
              type="button"
              onClick={handleBack}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-medium flex items-center"
              disabled={true} // Disabled on first step
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

export default BusinessIdentityForm;