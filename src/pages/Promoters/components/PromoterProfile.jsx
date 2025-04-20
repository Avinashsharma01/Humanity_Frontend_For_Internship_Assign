import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Phone, MessageSquare, ChevronDown, Users, BarChart, DollarSign, Calendar } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePromoters } from '../../../contexts/PromotersContext';
import ReferralHistory from './ReferralHistory';
import InteractionsNotes from './InteractionsNotes';
import RewardsIncentives from './RewardsIncentives';

const PromoterProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  
  // Use the context to get promoter data
  const { getPromoterById } = usePromoters();
  const [promoterData, setPromoterData] = useState(null);

  useEffect(() => {
    // Get the promoter data from context
    setLoading(true);
    const promoter = getPromoterById(id);
    
    // Simulate a small delay for loading state
    setTimeout(() => {
      setPromoterData(promoter);
      setLoading(false);
    }, 300);
  }, [id, getPromoterById]);
  
  const handleBack = () => {
    navigate('/promoters');
  };

  const mockChartData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [30, 29, 35, 38, 42, 45]
  };

  // Format data for display
  const formatPromoterData = (promoter) => {
    if (!promoter) return null;
    
    // Create a stats object if it doesn't exist
    const stats = {
      totalReferrals: promoter.leads || 0,
      conversionRate: promoter.conversion || '0%',
      revenue: promoter.revenue || '$0',
      lastFollowUp: promoter.lastFollowUp || 'N/A'
    };
    
    // Create contactInfo if it doesn't exist
    const contactInfo = promoter.contactInfo || {
      memberSince: 'N/A',
      location: 'N/A',
      timeZone: 'N/A'
    };
    
    return {
      ...promoter,
      stats,
      contactInfo,
      phone: promoter.contact,
    };
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-auto bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Format the promoter data
  const formattedPromoterData = formatPromoterData(promoterData);

  if (!formattedPromoterData) {
    return (
      <div className="flex-1 overflow-auto bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-gray-600 mb-4">Promoter not found</div>
        <button 
          onClick={handleBack}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Back to Promoters
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50 pb-8">
      <div className="p-6">
        {/* Back button */}
        <button 
          onClick={handleBack}
          className="flex items-center text-gray-600 mb-6 hover:text-gray-800"
        >
          <ArrowLeft className="mr-2" size={16} />
          <span>Back</span>
        </button>

        {/* Promoter header */}
        <div className="bg-white rounded-lg p-6 mb-6 flex flex-wrap items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Users className="text-blue-500" size={24} />
            </div>
            <div>
              <div className="flex items-center">
                <h2 className="text-xl font-semibold mr-3">{formattedPromoterData.name}</h2>
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                  {formattedPromoterData.status}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center mt-1 text-gray-600 text-sm">
                <div className="flex items-center mr-4">
                  <Mail size={14} className="mr-1" />
                  <span>{formattedPromoterData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={14} className="mr-1" />
                  <span>{formattedPromoterData.phone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100" title="Send Message">
              <MessageSquare size={20} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100" title="Send Email">
              <Mail size={20} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100" title="Call">
              <Phone size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Statistics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-center">
            <div className="rounded-full bg-blue-50 p-3 mr-3">
              <Users className="text-blue-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Referrals</p>
              <p className="text-2xl font-bold">{formattedPromoterData.stats.totalReferrals}</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-center">
            <div className="rounded-full bg-green-50 p-3 mr-3">
              <BarChart className="text-green-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold">{formattedPromoterData.stats.conversionRate}</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-center">
            <div className="rounded-full bg-purple-50 p-3 mr-3">
              <DollarSign className="text-purple-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Revenue Generated</p>
              <p className="text-2xl font-bold">{formattedPromoterData.stats.revenue}</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-center">
            <div className="rounded-full bg-orange-50 p-3 mr-3">
              <Calendar className="text-orange-500" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Last follow-up</p>
              <p className="text-xl font-bold">{formattedPromoterData.stats.lastFollowUp}</p>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="bg-white rounded-lg mb-6 border border-gray-100">
          <div className="flex border-b overflow-x-auto">
            <button 
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                activeTab === 'overview' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                activeTab === 'referralHistory' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('referralHistory')}
            >
              Referral History
            </button>
            <button 
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                activeTab === 'interactions' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('interactions')}
            >
              Interactions & Notes
            </button>
            <button 
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                activeTab === 'rewards' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('rewards')}
            >
              Rewards & Incentives
            </button>
            <button 
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                activeTab === 'engagement' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('engagement')}
            >
              Engagement Strategies
            </button>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Referrals Over Time</h3>
                      <div className="relative">
                        <button className="px-3 py-1 text-sm border rounded-md flex items-center text-gray-600">
                          Last 6 months
                          <ChevronDown size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Chart - in a real app, you'd use a chart library like Recharts */}
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border">
                      <div className="w-full h-full p-4 relative">
                        {/* Simple SVG line chart for demonstration */}
                        <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
                          <path 
                            d="M0,150 C50,120 100,140 150,100 C200,60 250,80 300,70 C350,60 400,30 450,40 C500,50 550,20 600,10" 
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="3"
                          />
                        </svg>
                        
                        {/* X-axis labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
                          {mockChartData.months.map((month, i) => (
                            <div key={i} className="text-xs text-gray-500">{month}</div>
                          ))}
                        </div>
                        
                        {/* Y-axis lines and labels for visualization */}
                        <div className="absolute top-0 bottom-0 left-0 flex flex-col justify-between">
                          <div className="text-xs text-gray-400">50%</div>
                          <div className="text-xs text-gray-400">40%</div>
                          <div className="text-xs text-gray-400">30%</div>
                          <div className="text-xs text-gray-400">20%</div>
                          <div className="text-xs text-gray-400">10%</div>
                          <div className="text-xs text-gray-400">0%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <h3 className="font-medium mb-4">Contact Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Member since:</p>
                        <p className="font-medium">{formattedPromoterData.contactInfo.memberSince}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Location:</p>
                        <p className="font-medium">{formattedPromoterData.contactInfo.location}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Phone:</p>
                        <p className="font-medium">{formattedPromoterData.phone}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Email:</p>
                        <p className="font-medium">{formattedPromoterData.email}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Time zone:</p>
                        <p className="font-medium">{formattedPromoterData.contactInfo.timeZone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'referralHistory' && (
              <ReferralHistory promoterId={id} />
            )}

            {activeTab === 'interactions' && (
              <InteractionsNotes promoterId={id} />
            )}

            {activeTab === 'rewards' && (
              <RewardsIncentives promoterId={id} />
            )}

            {activeTab === 'engagement' && (
              <div className="text-gray-600">
                <p>Engagement strategies content will be displayed here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoterProfile; 