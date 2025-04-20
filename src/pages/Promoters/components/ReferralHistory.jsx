import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const ReferralHistory = ({ promoterId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock referral data - in a real app, this would be fetched from an API based on promoterId
  const referrals = [
    { id: 1, person: 'Emery Dokidis', date: '28-4-2024', reward: '$20', status: 'Completed' },
    { id: 2, person: 'Kadin Lipshutz', date: '27-5-2024', reward: '$20', status: 'Completed' },
    { id: 3, person: 'Pending', date: '29-5-2024', reward: '—', status: 'Pending' },
    { id: 4, person: 'Jaxson Vaccaro', date: '30-6-2024', reward: '$20', status: 'Completed' },
    { id: 5, person: 'Pending', date: '01-7-2024', reward: '—', status: 'Pending' },
    { id: 6, person: 'Maren Septimus', date: '03-7-2024', reward: '$20', status: 'Completed' },
    { id: 7, person: 'Haylie Saris', date: '05-7-2024', reward: '$20', status: 'Completed' },
    { id: 8, person: 'Pending', date: '10-7-2024', reward: '—', status: 'Pending' }
  ];

  // Filter referrals based on search term
  const filteredReferrals = searchTerm
    ? referrals.filter(ref => 
        ref.person.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ref.date.includes(searchTerm) ||
        ref.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : referrals;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Referral List</h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md w-64"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Referred Person
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reward Earned
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Referral Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredReferrals.map((referral) => (
              <tr key={referral.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {referral.person}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {referral.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {referral.reward}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    referral.status === 'Completed' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {referral.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredReferrals.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No referrals found matching your search.
        </div>
      )}
    </div>
  );
};

export default ReferralHistory; 