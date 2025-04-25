import React, { useState } from 'react';
import { authService } from '../../services';

const PromoterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    commission: ''
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear messages
    setError(null);
    setSuccess('');
  };
  
  // Handle form submission to create promoter
  const handleCreatePromoter = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setSuccess('');
      
      // Create promoter via API
      const response = await authService.createPromoter({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        commission_rate: formData.commission
      });
      
      // Show success message
      setSuccess('Promoter created successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        commission: ''
      });
      
    } catch (error) {
      console.error('Error creating promoter:', error);
      setError(error.message || 'Failed to create promoter');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle bulk upload of promoters
  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Only accept CSV files
    if (file.type !== 'text/csv') {
      setError('Please upload a CSV file');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      setSuccess('');
      
      // Read file content
      const content = await readFileAsText(file);
      
      // Parse CSV to array of promoters
      const promoters = parseCSV(content);
      
      // Send to API
      const response = await authService.bulkUploadPromoters({ promoters });
      
      // Show success message
      setSuccess(`Successfully uploaded ${promoters.length} promoters!`);
      
    } catch (error) {
      console.error('Error uploading promoters:', error);
      setError(error.message || 'Failed to upload promoters');
    } finally {
      setLoading(false);
      // Reset file input
      e.target.value = null;
    }
  };
  
  // Helper function to read file content
  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };
  
  // Helper function to parse CSV
  const parseCSV = (text) => {
    // Split by lines and skip header
    const lines = text.split('\n').slice(1);
    
    return lines
      .filter(line => line.trim() !== '')
      .map(line => {
        const [name, email, phone, address, commission] = line.split(',');
        return {
          full_name: name.trim(),
          email: email.trim(),
          phone: phone ? phone.trim() : '',
          address: address ? address.trim() : '',
          commission_rate: commission ? commission.trim() : '0'
        };
      });
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-medium mb-4">Promoter Management</h2>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Success message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      {/* Create Promoter Form */}
      <form onSubmit={handleCreatePromoter} className="mb-6">
        <h3 className="text-lg font-medium mb-3">Create New Promoter</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Commission Rate (%)</label>
            <input
              type="number"
              name="commission"
              value={formData.commission}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              min="0"
              max="100"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows="2"
            ></textarea>
          </div>
        </div>
        
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Promoter'}
        </button>
      </form>
      
      {/* Bulk Upload Section */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-3">Bulk Upload Promoters</h3>
        <p className="text-sm text-gray-600 mb-4">
          Upload a CSV file with promoter data. The file should have these columns:
          <span className="font-medium"> name, email, phone, address, commission</span>
        </p>
        
        <div className="flex items-center">
          <label className="block">
            <span className="sr-only">Choose CSV file</span>
            <input 
              type="file" 
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
              accept=".csv"
              onChange={handleBulkUpload}
              disabled={loading}
            />
          </label>
          {loading && <p className="ml-3 text-sm text-gray-600">Uploading...</p>}
        </div>
      </div>
    </div>
  );
};

export default PromoterForm; 