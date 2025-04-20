import React from 'react';

const ConversionChart = ({ referralsPercentage, conversionsPercentage }) => {
  // Calculate the circumference of the circle
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the dash offset for both segments
  const referralsDash = circumference * (1 - referralsPercentage / 100);
  const conversionsDash = circumference * (1 - conversionsPercentage / 100);
  
  return (
    <div className="bg-white rounded-lg shadow border p-4">
      <h2 className="text-lg font-semibold mb-4">Conversion Success Rate</h2>
      
      <div className="flex items-center justify-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle 
              cx="60" 
              cy="60" 
              r={radius} 
              className="fill-purple-50" 
            />
            
            {/* Donut hole */}
            <circle 
              cx="60" 
              cy="60" 
              r="30" 
              className="fill-white" 
            />
            
            {/* Referrals arc (outer) */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke="#3b82f6"
              strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset={referralsDash}
              transform="rotate(-90 60 60)"
            />
            
            {/* Conversions arc (inner) */}
            <circle
              cx="60"
              cy="60"
              r={radius - 10}
              fill="transparent"
              stroke="#93c5fd"
              strokeWidth="10"
              strokeDasharray={circumference * 0.8}
              strokeDashoffset={conversionsDash * 0.8}
              transform="rotate(-90 60 60)"
            />
          </svg>
        </div>
        
        <div className="ml-6">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm text-gray-700">Referrals sent {referralsPercentage}%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
            <span className="text-sm text-gray-700">Converted {conversionsPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionChart; 