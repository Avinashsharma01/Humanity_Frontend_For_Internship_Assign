import React from 'react';
import { 
  Users, 
  DollarSign, 
  BarChart2, 
  PieChart,
  HelpCircle
} from 'lucide-react';
import {
  StatCard,
  CircleChart,
  ActivityTable,
  LeaderboardTable,
  PerformanceChart,
  ConversionChart,
  TopChannels
} from './components';

const Dashboard = () => {
  // Mock data for the dashboard
  
  // Stats data
  const stats = [
    { 
      title: 'Total Promoters', 
      value: '1,234', 
      change: '+123.4%', 
      period: 'vs last month',
      icon: {
        element: <Users size={20} className="text-gray-500" />,
        bgColor: 'bg-gray-100'
      }
    },
    { 
      title: 'Conversion rate', 
      value: '23.5%', 
      change: '-1.5%', 
      period: 'vs last month',
      icon: {
        element: <PieChart size={20} className="text-red-500" />,
        bgColor: 'bg-red-50'
      }
    },
    { 
      title: 'Revenue Generated', 
      value: '$12,345', 
      change: '+$675.4', 
      period: 'vs last month',
      icon: {
        element: <DollarSign size={20} className="text-purple-500" />,
        bgColor: 'bg-purple-50'
      }
    },
    { 
      title: 'Active Campaigns', 
      value: '3', 
      change: '+1', 
      period: 'vs last month',
      icon: {
        element: <BarChart2 size={20} className="text-blue-500" />,
        bgColor: 'bg-blue-50'
      }
    },
  ];

  // Circle chart data
  const circleCharts = [
    { id: 1, percentage: 42, label: 'Repeat Referral Rate', color: 'green' },
    { id: 2, percentage: 67, label: 'Referral Engagement Rate', color: 'red' },
    { id: 3, percentage: 28, label: 'Churn Rate of Leads', color: 'blue' },
    { id: 4, percentage: 19, label: 'Upsell Rate of Leads', color: 'purple' },
  ];

  // Activities data
  const activities = [
    { description: 'Julian earned $10', date: '28-4-2024', time: '10:30 AM' },
    { description: 'John Doe signed up from your referral link', date: '29-4-2024', time: '9:45 AM' },
    { description: 'You reached 50 referrals milestone!', date: '30-4-2024', time: '8:20 AM' },
    { description: 'You updated your referral campaign', date: '31-4-2024', time: '7:00 AM' },
  ];

  // Top channels data
  const channels = [
    { name: 'Facebook', percentage: 78 },
    { name: 'Twitter', percentage: 45 },
    { name: 'LinkedIn', percentage: 23 },
  ];

  // Leaderboard data
  const promoters = [
    { name: 'Emery Doakis', conversionRate: 150, referralsSent: 80, successRate: 60, revenueGenerated: 1200 },
    { name: 'Kadin Lipshutz', conversionRate: 132, referralsSent: 90, successRate: 65, revenueGenerated: 980 },
    { name: 'Randy Culhane', conversionRate: 110, referralsSent: 60, successRate: 60, revenueGenerated: 880 },
    { name: 'Jaxson Vaccaro', conversionRate: 100, referralsSent: 85, successRate: 75, revenueGenerated: 500 },
    { name: 'Jocelyn Levin', conversionRate: 50, referralsSent: 30, successRate: 63, revenueGenerated: 600 },
    { name: 'Maren Septimus', conversionRate: 80, referralsSent: 35, successRate: 25, revenueGenerated: 200 },
    { name: 'Haylie Saris', conversionRate: 120, referralsSent: 55, successRate: 45, revenueGenerated: 150 },
    { name: 'Randy Herwitz', conversionRate: 110, referralsSent: 90, successRate: 65, revenueGenerated: 880 },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <StatCard 
                key={index}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                period={stat.period}
              />
            ))}
          </div>
          
          {/* Circle Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {circleCharts.map(chart => (
              <div key={chart.id} className="bg-white rounded-lg p-4 shadow border flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-700">{chart.label}</h3>
                  <HelpCircle size={14} className="ml-2 text-gray-400" />
                </div>
                <CircleChart 
                  percentage={chart.percentage} 
                  color={chart.color} 
                />
              </div>
            ))}
          </div>
          
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <PerformanceChart />
            <div className="grid grid-cols-1 gap-6">
              <ConversionChart 
                referralsPercentage={57} 
                conversionsPercentage={42} 
              />
              <TopChannels channels={channels} />
            </div>
          </div>
          
          {/* Activities Table */}
          <div className="mb-8">
            <ActivityTable activities={activities} />
          </div>
          
          {/* Leaderboard Table */}
          <div>
            <LeaderboardTable promoters={promoters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;