import React from 'react';
import { Eye, Trash2 } from 'lucide-react';

const CampaignCard = ({ campaign, onDelete }) => {
  const { 
    name, 
    status, 
    dateRange, 
    referrals, 
    conversion, 
    roi, 
    aiSuggestion 
  } = campaign;

  const statusColor = status === 'Active' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white rounded-lg border shadow-sm mb-6">
      <div className="p-5 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-gray-600 text-sm mt-1">{dateRange}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${statusColor}`}>
            {status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x border-b">
        <div className="p-4 text-center">
          <p className="text-sm text-gray-600">Referrals</p>
          <p className="text-2xl font-bold mt-1">{referrals}</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-sm text-gray-600">Conversion</p>
          <p className="text-2xl font-bold mt-1">{conversion}</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-sm text-gray-600">ROI</p>
          <p className="text-2xl font-bold mt-1">{roi}</p>
        </div>
      </div>

      {aiSuggestion && (
        <div className="p-4 bg-blue-50 border-b flex items-start">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
            <span className="text-white text-xs">AI</span>
          </div>
          <p className="text-sm text-gray-700">{aiSuggestion}</p>
        </div>
      )}

      <div className="p-4 flex justify-between">
        <button className="text-gray-600 hover:text-gray-900 flex items-center">
          <Eye size={18} className="mr-1" />
          <span>View</span>
        </button>
        <button 
          className="text-red-600 hover:text-red-800 flex items-center"
          onClick={() => onDelete(campaign.id)}
        >
          <Trash2 size={18} className="mr-1" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default CampaignCard; 