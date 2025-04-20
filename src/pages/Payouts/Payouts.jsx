import React, { useState } from 'react';
import { Filter, Eye, Settings, AlertCircle, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Component for All Payouts tab
const AllPayoutsTab = ({ payoutsData, handleViewProfile }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Payouts</h2>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white">
          <Filter className="h-5 w-5" />
          <span>Filter</span>
        </button>
      </div>
      
      {/* Payouts Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Payout ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Promoter Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Points</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Reward Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Reward Earned For</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payoutsData.map((payout) => (
              <tr key={payout.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payout.promoter}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.points}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payout.program}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      payout.status === 'Paid' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-orange-100 text-orange-600'
                    }`}
                  >
                    {payout.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end items-center gap-3">
                    <div className="relative group">
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => handleViewProfile(payout.promoterId)}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                        View profile
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      {payout.status === 'Disputed' ? 'Track Dispute' : 'Request Dispute'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Component for Disputes tab
const DisputesTab = ({ payoutsData }) => {
  // Create dispute data based on the screenshot
  const disputeData = [
    { id: 'D-3012', promoter: 'Emery Dokidis', promoterId: 1, points: '500 pts', date: '28-4-2024', program: 'Spring Boost', status: 'Resolved' },
    { id: 'D-3013', promoter: 'Kadin Lipshutz', promoterId: 2, points: '250 pts', date: '27-5-2024', program: 'Summer Referral Program', status: 'Resolved' },
    { id: 'D-3014', promoter: 'Randy Culhane', promoterId: 3, points: '300 pts', date: '29-5-2024', program: 'Early Bird Special', status: 'Under Review' },
    { id: 'D-3015', promoter: 'Jaxson Vaccaro', promoterId: 4, points: '100 pts', date: '30-6-2024', program: 'Early Bird Special', status: 'Resolved' },
    { id: 'D-3016', promoter: 'Jocelyn Levin', promoterId: 5, points: '200 pts', date: '01-7-2024', program: 'Summer Referral Program', status: 'Under Review' },
    { id: 'D-3017', promoter: 'Maren Septimus', promoterId: 6, points: '300 pts', date: '03-7-2024', program: 'Summer Referral Program', status: 'Resolved' },
    { id: 'D-3018', promoter: 'Haylie Saris', promoterId: 7, points: '220 pts', date: '05-7-2024', program: 'Spring Boost', status: 'Resolved' },
    { id: 'D-3019', promoter: 'Randy Herwitz', promoterId: 8, points: '400 pts', date: '10-7-2024', program: 'Spring Boost', status: 'Under Review' },
  ];
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Disputes</h2>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white">
          <Filter className="h-5 w-5" />
          <span>Filter</span>
        </button>
      </div>
      
      {/* Disputes Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Dispute ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Promoter Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Points</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Submitted On</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Reward Earned For</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {disputeData.map((dispute) => (
              <tr key={dispute.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dispute.promoter}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.points}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dispute.program}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      dispute.status === 'Resolved' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-orange-100 text-orange-600'
                    }`}
                  >
                    {dispute.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center items-center gap-3">
                    <button className="text-gray-500 hover:text-gray-700">
                      <Eye className="h-5 w-5" />
                    </button>
                    {dispute.status === 'Under Review' && (
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        Resolve
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Component for Payout Settings tab
const PayoutSettingsTab = () => {
  const [preloadEnabled, setPreloadEnabled] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [amount, setAmount] = useState('');
  
  const currentBalance = '1,250';
  
  const handleToggleChange = () => {
    setPreloadEnabled(!preloadEnabled);
  };
  
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };
  
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  
  const handleBuyPoints = () => {
    // In a real app, this would process the payment
    alert(`Processing payment of $${amount} using ${paymentMethod}`);
  };
  
  return (
    <>
      <div className="max-w-3xl">
        {/* Preload Money Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold">Preload Money</h2>
            <p className="text-gray-500 mt-1">Use Points to Reward Promoters Instantly</p>
          </div>
          <div>
            <button 
              className={`relative inline-flex items-center h-6 rounded-full w-11 ${preloadEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}
              onClick={handleToggleChange}
              role="switch"
              aria-checked={preloadEnabled}
            >
              <span 
                className={`inline-block w-4 h-4 transform transition rounded-full bg-white ${preloadEnabled ? 'translate-x-6' : 'translate-x-1'}`} 
              />
            </button>
          </div>
        </div>
        
        {/* Current Point Balance */}
        <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-8">
          <div className="flex items-center">
            <div>
              <span className="text-gray-700">Current Point Balance: </span>
              <span className="text-blue-600 font-bold text-xl">{currentBalance}</span>
              <span className="text-gray-700"> Points</span>
            </div>
          </div>
        </div>
        
        {/* Enter Amount */}
        <div className="mb-8">
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">Enter Amount</label>
          <input
            id="amount"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter amount..."
            value={amount}
            onChange={handleAmountChange}
          />
          <p className="text-gray-500 text-sm mt-2">You'll receive 10 points per $1</p>
        </div>
        
        {/* Payment Methods */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">Payment Methods</label>
          <div className="grid gap-4">
            <div className="flex items-center">
              <input 
                id="card" 
                type="radio" 
                name="payment-method" 
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={paymentMethod === 'card'}
                onChange={() => handlePaymentMethodChange('card')}
              />
              <label htmlFor="card" className="ml-3 block text-gray-700">
                Credit/Debit/ATM Card
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                id="paypal" 
                type="radio" 
                name="payment-method" 
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={paymentMethod === 'paypal'}
                onChange={() => handlePaymentMethodChange('paypal')}
              />
              <label htmlFor="paypal" className="ml-3 block text-gray-700">
                Paypal account
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                id="bank" 
                type="radio" 
                name="payment-method" 
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={paymentMethod === 'bank'}
                onChange={() => handlePaymentMethodChange('bank')}
              />
              <label htmlFor="bank" className="ml-3 block text-gray-700">
                Bank Transfer
              </label>
            </div>
            
            <div className="flex items-center">
              <input 
                id="upi" 
                type="radio" 
                name="payment-method" 
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={paymentMethod === 'upi'}
                onChange={() => handlePaymentMethodChange('upi')}
              />
              <label htmlFor="upi" className="ml-3 block text-gray-700">
                UPI
              </label>
            </div>
          </div>
        </div>
        
        {/* Buy Points Button */}
        <button
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          onClick={handleBuyPoints}
        >
          Buy Points
        </button>
      </div>
    </>
  );
};

const Payouts = () => {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  // Mock data
  const summaryData = {
    totalPoints: '12,500',
    currentBalance: '1,250',
    lastTransfer: 'April 9, 2025'
  };

  const payoutsData = [
    { id: '#P-1048', promoter: 'Avinash Sharma', promoterId: 1, points: '5000 pts', date: '28-4-2024', program: 'Spring Boost', status: 'Paid' },
    { id: '#P-1047', promoter: 'Kadin Lipshutz', promoterId: 2, points: '250 pts', date: '27-5-2024', program: 'Summer Referral Program', status: 'Paid' },
    { id: '#P-1046', promoter: 'Randy Culhane', promoterId: 3, points: '300 pts', date: '29-5-2024', program: 'Early Bird Special', status: 'Disputed' },
    { id: '#P-1045', promoter: 'Jaxson Vaccaro', promoterId: 4, points: '100 pts', date: '30-6-2024', program: 'Early Bird Special', status: 'Paid' },
    { id: '#P-1044', promoter: 'Jocelyn Levin', promoterId: 5, points: '200 pts', date: '01-7-2024', program: 'Summer Referral Program', status: 'Disputed' },
    { id: '#P-1043', promoter: 'Maren Septimus', promoterId: 6, points: '300 pts', date: '03-7-2024', program: 'Summer Referral Program', status: 'Paid' },
    { id: '#P-1042', promoter: 'Haylie Saris', promoterId: 7, points: '220 pts', date: '05-7-2024', program: 'Spring Boost', status: 'Paid' },
    { id: '#P-1041', promoter: 'Randy Herwitz', promoterId: 8, points: '400 pts', date: '10-7-2024', program: 'Spring Boost', status: 'Disputed' },
  ];

  const handleViewProfile = (promoterId) => {
    // Navigate to the promoter's profile
    navigate(`/promoters/${promoterId}`);
  };

  // Render the appropriate tab content based on activeTab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'all':
        return <AllPayoutsTab payoutsData={payoutsData} handleViewProfile={handleViewProfile} />;
      case 'disputes':
        return <DisputesTab payoutsData={payoutsData} />;
      case 'settings':
        return <PayoutSettingsTab />;
      default:
        return <AllPayoutsTab payoutsData={payoutsData} handleViewProfile={handleViewProfile} />;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Manage and monitor your payouts</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Points Given</p>
              <p className="text-xl font-semibold">{summaryData.totalPoints}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Point Balance</p>
              <p className="text-xl font-semibold">{summaryData.currentBalance}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Points Transfer</p>
              <p className="text-xl font-semibold">{summaryData.lastTransfer}</p>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex mb-6 bg-white rounded-lg shadow-sm">
          <button 
            className={`flex-1 py-3 ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('all')}
          >
            All Payouts
          </button>
          <button 
            className={`flex-1 py-3 ${activeTab === 'disputes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('disputes')}
          >
            Disputes
          </button>
          <button 
            className={`flex-1 py-3 ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('settings')}
          >
            Payout Settings
          </button>
        </div>
        
        {/* Render the content for the active tab */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Payouts;