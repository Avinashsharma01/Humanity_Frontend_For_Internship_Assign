import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Mail } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

function LeadDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState('Completed');
  
  // Mock data for a specific lead
  const leadData = {
    id: 1,
    name: 'Emery Dokidis',
    email: 'emerydokidis@gmail.com',
    contact: '+979970174715',
    coupon: 'SAVE10NOW',
    status: 'Pending',
    profileImage: null, // In a real app, this would be a URL
  };

  const handleBack = () => {
    navigate('/leads');
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-6">
        <button 
          onClick={handleBack}
          className="flex items-center text-gray-600 mb-6 hover:text-gray-800"
        >
          <ArrowLeft className="mr-2" size={16} />
          <span>Back</span>
        </button>

        <h1 className="text-2xl font-bold mb-6">Manage and monitor your leads</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Profile picture */}
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              {leadData.profileImage ? (
                <img 
                  src={leadData.profileImage} 
                  alt={leadData.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-blue-500 text-3xl font-semibold">
                  {leadData.name.charAt(0)}
                </span>
              )}
            </div>
            
            {/* Lead information */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{leadData.name}</h2>
              
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-y-2">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-500" />
                  <span className="text-gray-600">{leadData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="text-gray-600">{leadData.contact}</span>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-3">
              <button className="p-2 rounded-full hover:bg-gray-100" title="Send Message">
                <MessageSquare size={20} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100" title="Send Email">
                <Mail size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Change Status</h3>
            <select 
              value={status} 
              onChange={handleStatusChange}
              className="block w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          {/* Additional sections could be added here based on requirements */}
        </div>
      </div>
    </div>
  );
}

export default LeadDetail; 