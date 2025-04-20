import React from 'react';

const LeaderboardTable = ({ promoters }) => {
  return (
    <div className="bg-white rounded-lg shadow border">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">Leaderboard Table View</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Promoter Name</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Referrals Sent</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Successful Conversions</th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Generated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {promoters.map((promoter, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{promoter.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{promoter.conversionRate}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{promoter.referralsSent}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{promoter.successRate}%</td>
                <td className="px-6 py-4 text-sm text-gray-700">${promoter.revenueGenerated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable; 