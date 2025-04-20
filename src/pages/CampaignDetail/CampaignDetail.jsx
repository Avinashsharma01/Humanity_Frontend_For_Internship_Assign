import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock, FiDollarSign, FiHeart, FiShare2, FiUser } from 'react-icons/fi';
import { FaLink, FaEnvelope, FaCalendarAlt, FaUser, FaUsers, FaChartLine, FaDollarSign as FaDollarSignIcon, FaRocket, FaEllipsisH } from 'react-icons/fa';

const CampaignDetail = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Simulate fetching campaign data
  useEffect(() => {
    // This would be an API call in a real application
    setTimeout(() => {
      const mockCampaign = {
        id: parseInt(id),
        title: "Clean Water Initiative",
        description: "Providing clean water solutions to underserved communities across Africa. This initiative aims to build sustainable water infrastructure and provide safe drinking water to thousands of people who currently lack access. Our projects include well drilling, rainwater harvesting systems, and community-led water management training.",
        fullDescription: `
          <p>Access to clean water is a fundamental human right, yet millions of people across Africa still lack access to safe drinking water. The Clean Water Initiative aims to address this critical need by implementing sustainable water solutions in communities most affected by water scarcity and contamination.</p>
          
          <p>Our comprehensive approach includes:</p>
          <ul>
            <li>Drilling new wells and rehabilitating existing ones</li>
            <li>Installing rainwater harvesting systems in schools and community centers</li>
            <li>Providing water filtration and purification technologies</li>
            <li>Training community members in water management and maintenance</li>
            <li>Educating communities about hygiene and sanitation practices</li>
          </ul>
          
          <p>With your support, we can help transform lives and build healthier communities. Every donation brings us closer to our goal of providing clean water to 50,000 people by the end of this campaign.</p>
          
          <p>Join us in making a difference!</p>
        `,
        startDate: "2023-11-01",
        endDate: "2024-02-28",
        target: 50000,
        raised: 28500,
        creator: "Water For All Foundation",
        status: "active",
        category: "environment",
        donors: 145,
        images: [
          "/images/campaign1.jpg",
          "/images/campaign2.jpg",
          "/images/campaign3.jpg"
        ],
        updates: [
          {
            id: 1,
            date: "2023-12-15",
            title: "First Well Completed!",
            content: "We're excited to announce that the first well has been completed in the Mbale village, providing clean water to over 200 people. Thank you for your support!"
          },
          {
            id: 2,
            date: "2024-01-10",
            title: "Halfway to Our Goal",
            content: "We've reached the halfway mark in our fundraising goal! With your continued support, we can expand our efforts to two additional communities."
          }
        ]
      };
      
      setCampaign(mockCampaign);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleDonation = (e) => {
    e.preventDefault();
    // This would handle payment processing in a real application
    alert(`Thank you for your donation of $${donationAmount}!`);
    setDonationAmount('');
  };

  const predefinedAmounts = [10, 25, 50, 100];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (isLoading) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-6 flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Campaign Not Found</h2>
          <p className="text-gray-600 mb-6">The campaign you're looking for doesn't exist or has been removed.</p>
          <Link to="/campaign" className="text-blue-600 hover:underline flex items-center justify-center">
            <FiArrowLeft className="mr-2" /> Return to Campaigns
          </Link>
        </div>
      </div>
    );
  }

  // Calculate progress percentage
  const progress = Math.min(Math.round((campaign.raised / campaign.target) * 100), 100);
  
  // Format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days left
  const today = new Date();
  const endDate = new Date(campaign.endDate);
  const daysLeft = Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));

  // Sample data for charts
  const performanceData = [
    { name: 'Jan 1', referrals: 4, conversions: 1 },
    { name: 'Jan 2', referrals: 3, conversions: 2 },
    { name: 'Jan 3', referrals: 5, conversions: 3 },
    { name: 'Jan 4', referrals: 7, conversions: 4 },
    { name: 'Jan 5', referrals: 5, conversions: 2 },
    { name: 'Jan 6', referrals: 8, conversions: 5 },
    { name: 'Jan 7', referrals: 9, conversions: 6 }
  ];

  // Sample referrers data
  const referrersData = [
    { id: 1, name: 'Emma Wilson', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', referrals: 12, conversions: 8, revenue: 960 },
    { id: 2, name: 'James Miller', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', referrals: 9, conversions: 7, revenue: 840 },
    { id: 3, name: 'Sofia Garcia', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', referrals: 8, conversions: 5, revenue: 600 },
    { id: 4, name: 'Liam Johnson', avatar: 'https://randomuser.me/api/portraits/men/36.jpg', referrals: 6, conversions: 3, revenue: 360 },
    { id: 5, name: 'Olivia Brown', avatar: 'https://randomuser.me/api/portraits/women/90.jpg', referrals: 5, conversions: 3, revenue: 360 }
  ];

  // Sample AI suggestions
  const aiSuggestions = [
    { id: 1, text: "Increase your reward value by 10% to boost participation - our data shows this could increase conversions by ~15%", impact: "High", difficulty: "Low" },
    { id: 2, text: "Send personalized follow-up emails to customers who haven't referred yet", impact: "Medium", difficulty: "Medium" },
    { id: 3, text: "Add social sharing options to increase reach - currently only email is being used", impact: "High", difficulty: "Medium" }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{campaign.title}</h1>
          <div className="flex items-center mt-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
            </span>
            <span className="ml-3 text-sm text-gray-500 flex items-center">
              <FaCalendarAlt className="mr-1" />
              {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
            </span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50">
            Edit Campaign
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-md text-white text-sm font-medium hover:bg-blue-700">
            Share Campaign
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <FaEllipsisH />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-4 px-6 py-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-full">
              <FaUser className="text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Referrals</p>
              <p className="text-2xl font-semibold text-gray-900">{campaign.donors}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-full">
              <FaUsers className="text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Days Left</p>
              <p className="text-2xl font-semibold text-gray-900">{daysLeft}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-full">
              <FaChartLine className="text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{progress}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 rounded-full">
              <FaDollarSignIcon className="text-amber-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Revenue Generated</p>
              <p className="text-2xl font-semibold text-gray-900">${campaign.raised.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-rose-100 rounded-full">
              <FaRocket className="text-rose-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">ROI</p>
              <p className="text-2xl font-semibold text-gray-900">{Math.round((campaign.raised / campaign.target) * 100)}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-b border-gray-200 px-6 mb-4">
        <nav className="-mb-px flex space-x-6">
          <button
            onClick={() => handleTabChange('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleTabChange('promoters')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'promoters'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Top Promoters
          </button>
          <button
            onClick={() => handleTabChange('messaging')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'messaging'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Messaging
          </button>
          <button
            onClick={() => handleTabChange('ai')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'ai'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            AI Suggestions
          </button>
          <button
            onClick={() => handleTabChange('settings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Settings
          </button>
        </nav>
      </div>
      
      <div className="px-6 flex-1 overflow-auto">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-4 rounded-lg shadow border">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Over Time</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Chart visualization requires recharts library</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow border">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Reward</p>
                  <p className="mt-1">20% discount on next purchase</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Sharing Options</p>
                  <div className="mt-1 flex space-x-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <FaEnvelope className="mr-1" /> Email
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <FaLink className="mr-1" /> Direct Link
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Landing Page</p>
                  <a href="#" className="mt-1 text-blue-600 hover:text-blue-800 text-sm flex items-center">
                    <FaLink className="mr-1" /> View Landing Page
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-span-2 bg-white p-4 rounded-lg shadow border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Top Promoters</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promoter</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrals</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {referrersData.slice(0, 3).map((referrer) => (
                      <tr key={referrer.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img src={referrer.avatar} alt={referrer.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{referrer.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{referrer.referrals}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{referrer.conversions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${referrer.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">AI Insights</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
              </div>
              <div className="space-y-3">
                {aiSuggestions.slice(0, 2).map((suggestion) => (
                  <div key={suggestion.id} className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">{suggestion.text}</p>
                    <div className="mt-2 flex space-x-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Impact: {suggestion.impact}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Difficulty: {suggestion.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'promoters' && (
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Promoters</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promoter</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrals</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {referrersData.map((referrer) => (
                    <tr key={referrer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            <img src={referrer.avatar} alt={referrer.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{referrer.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{referrer.referrals}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{referrer.conversions}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${referrer.revenue}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">View Profile</button>
                        <button className="text-blue-600 hover:text-blue-800">Send Message</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'ai' && (
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-lg font-medium text-gray-900 mb-4">AI Suggestions to Improve Campaign</h3>
            <div className="space-y-4">
              {aiSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-800">{suggestion.text}</p>
                  <div className="mt-3 flex space-x-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Impact: {suggestion.impact}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Difficulty: {suggestion.difficulty}
                    </span>
                    <button className="ml-auto text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                      Apply Suggestion
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignDetail; 