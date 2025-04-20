import React from 'react';

const StatCard = ({ icon, title, value, change, period, textColor = 'text-gray-900' }) => {
  const isPositive = !change.startsWith('-');
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className="bg-white rounded-lg p-4 shadow border">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className={`text-xl font-bold mt-1 ${textColor}`}>{value}</p>
        </div>
        <div className={`p-2 rounded-full ${icon.bgColor || 'bg-gray-100'}`}>
          {icon.element}
        </div>
      </div>
      <div className="flex items-center text-xs">
        <span className={`${changeColor} mr-1`}>{change}</span>
        <span className="text-gray-500">{period}</span>
      </div>
    </div>
  );
};

export default StatCard; 