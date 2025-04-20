import React from 'react';
import { Eye, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AllPayoutsTab = ({ payoutsData }) => {
  const navigate = useNavigate();

  const handleViewProfile = (promoterId) => {
    // Navigate to the promoter's profile
    navigate(`/promoters/${promoterId}`);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Payouts</h2>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white">
          <Filter className="h-5 w-5" />
          <span>Filter</span>
        </button>
      </div>
      
      {/* Payouts Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Payout ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Promoter Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Points</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Reward Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Reward Earned For</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payoutsData.map((payout) => (
              <tr key={payout.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payout.promoter}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.points}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.program}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      payout.status === 'Paid' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-orange-100 text-orange-600'
                    }`}
                  >
                    {payout.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end items-center gap-3">
                    <div className="relative group">
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => handleViewProfile(payout.promoterId)}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                        View profile
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      {payout.status === 'Disputed' ? 'Track Dispute' : 'Request Dispute'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllPayoutsTab; 