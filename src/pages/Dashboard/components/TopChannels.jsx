import React from 'react';

const TopChannels = ({ channels }) => {
  // Define colors for different channels
  const channelColors = {
    Facebook: 'bg-red-50 text-red-800',
    Twitter: 'bg-purple-50 text-purple-800',
    LinkedIn: 'bg-blue-50 text-blue-800',
    Email: 'bg-green-50 text-green-800',
    WhatsApp: 'bg-emerald-50 text-emerald-800',
    Instagram: 'bg-pink-50 text-pink-800'
  };

  return (
    <div className="bg-white rounded-lg shadow border p-4">
      <h2 className="text-lg font-semibold mb-4">Top Performing Channel</h2>
      
      <div className="grid grid-cols-3 gap-3">
        {channels.map((channel, index) => (
          <div 
            key={index} 
            className={`${channelColors[channel.name] || 'bg-gray-50 text-gray-800'} p-3 rounded-lg`}
          >
            <div className="text-sm mb-1">{channel.name}</div>
            <div className="text-xl font-bold">{channel.percentage}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopChannels; 