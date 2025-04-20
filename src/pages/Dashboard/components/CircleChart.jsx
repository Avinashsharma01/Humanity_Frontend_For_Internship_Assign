import React from 'react';

const CircleChart = ({ percentage, label, color }) => {
  // Calculate the circumference and the offset
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  // Define color styles based on the color prop
  const colorStyles = {
    blue: {
      textColor: 'text-blue-500',
      strokeColor: 'stroke-blue-500',
      trailColor: 'stroke-blue-100'
    },
    green: {
      textColor: 'text-green-500',
      strokeColor: 'stroke-green-500',
      trailColor: 'stroke-green-100'
    },
    red: {
      textColor: 'text-red-400',
      strokeColor: 'stroke-red-400',
      trailColor: 'stroke-red-100'
    },
    purple: {
      textColor: 'text-purple-500',
      strokeColor: 'stroke-purple-500',
      trailColor: 'stroke-purple-100'
    }
  };
  
  const style = colorStyles[color] || colorStyles.blue;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className={`${style.trailColor} fill-none`}
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="6"
          />
          {/* Progress circle */}
          <circle
            className={`${style.strokeColor} fill-none transition-all duration-500 ease-in-out`}
            cx="50"
            cy="50"
            r={radius}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 50 50)"
          />
          {/* Percentage text */}
          <text
            x="50"
            y="50"
            dy=".35em"
            textAnchor="middle"
            className={`${style.textColor} font-bold text-lg fill-current`}
          >
            {percentage}%
          </text>
        </svg>
      </div>
      <span className="text-gray-600 text-sm mt-2 font-medium">{label}</span>
    </div>
  );
};

export default CircleChart; 