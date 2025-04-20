import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PerformanceChart = () => {
  const [timeFrame, setTimeFrame] = useState('6months');
  
  // Mock data for different time frames
  const chartData = {
    '1month': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      values: [25, 35, 28, 32]
    },
    '3months': {
      labels: ['Jan', 'Feb', 'Mar'],
      values: [22, 30, 35]
    },
    '6months': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [30, 25, 35, 28, 32, 35]
    }
  };
  
  // Highlight point (the +30% tooltip in the original)
  const highlightPointIndex = timeFrame === '6months' ? 2 : 1;

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.parsed.y}%`;
          },
          title: function(context) {
            const dataIndex = context[0].dataIndex;
            if (dataIndex === highlightPointIndex) {
              return '+30% Growth';
            }
            return chartData[timeFrame].labels[dataIndex];
          }
        },
        backgroundColor: '#475569',
        padding: 10,
        cornerRadius: 4,
        titleFont: {
          size: 12
        },
        bodyFont: {
          size: 12
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          stepSize: 10,
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
        borderColor: '#3b82f6',
        fill: false
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 6,
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6'
      }
    }
  };

  // Prepare the data object for Chart.js
  const data = {
    labels: chartData[timeFrame].labels,
    datasets: [
      {
        data: chartData[timeFrame].values,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        pointBackgroundColor: (context) => {
          const index = context.dataIndex;
          return index === highlightPointIndex ? '#3b82f6' : '#3b82f6';
        },
        pointRadius: (context) => {
          const index = context.dataIndex;
          return index === highlightPointIndex ? 6 : 4;
        },
        pointHoverRadius: (context) => {
          const index = context.dataIndex;
          return index === highlightPointIndex ? 8 : 6;
        }
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow border p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Promoter Performance Over Time</h2>
        <div className="relative">
          <select 
            className="bg-gray-50 border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-lg text-sm appearance-none"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
          >
            <option value="6months">Last 6 months</option>
            <option value="3months">Last 3 months</option>
            <option value="1month">Last month</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="h-64 w-full">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default PerformanceChart; 