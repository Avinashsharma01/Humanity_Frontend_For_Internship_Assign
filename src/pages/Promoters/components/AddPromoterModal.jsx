import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddPromoterModal = ({ isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('manual');
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailId: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSave = () => {
    // If we're in manual tab, create a promoter from form data
    if (activeTab === 'manual') {
      const [firstName, lastName] = formData.fullName.split(' ');
      const newPromoter = {
        firstName: firstName || '',
        lastName: lastName || '',
        phone: formData.phoneNumber,
        email: formData.emailId
      };
      onSave([newPromoter]);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-20 backdrop-blur-sm ">
      <div className="relative bg-white border qborder-gray-200 rounded-lg shadow-xl w-full max-w-xl mx-4">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h3 className="text-lg font-medium">Choose How You Want to Add Customers</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`py-4 px-6 text-center text-sm font-medium ${
              activeTab === 'manual'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => handleTabChange('manual')}
          >
            Add Manually
          </button>
          <button
            className={`py-4 px-6 text-center text-sm font-medium ${
              activeTab === 'csv'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => handleTabChange('csv')}
          >
            Upload CSV File
          </button>
          <button
            className={`py-4 px-6 text-center text-sm font-medium ${
              activeTab === 'zapier'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => handleTabChange('zapier')}
          >
            Sync with Zapier
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'manual' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter Full Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Phone Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email ID
                </label>
                <input
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  placeholder="Enter Email ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}

          {activeTab === 'csv' && (
            <div className="text-center py-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mx-auto">
                <div className="mx-auto w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-900 mb-1">Drag & drop your file here</p>
                <p className="text-sm text-gray-500 mb-4">or <span className="text-blue-500">browse</span> to upload</p>
                <p className="text-xs text-gray-400">Supported formats: CSV, Excel (XLS, XLSX)</p>
                <p className="text-xs text-gray-400">Maximum file size: 5MB</p>
              </div>
            </div>
          )}

          {activeTab === 'zapier' && (
            <div className="text-center py-8">
              <img 
                src="https://cdn.zapier.com/zapier/images/logos/zapier-logo.svg" 
                alt="Zapier Logo" 
                className="w-16 h-16 mx-auto mb-4 opacity-80"
              />
              <h3 className="text-xl font-medium mb-2">Connect with Zapier</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Sync your contacts from other platforms by connecting your Zapier account. This allows you to import contacts from 3000+ apps.
              </p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition-colors">
                Connect
              </button>
              <div className="mt-6 text-sm text-gray-500">
                <p>Don't have a Zapier account? <a href="#" className="text-indigo-600 hover:underline">Sign up for free</a></p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 border border-transparent rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPromoterModal; 