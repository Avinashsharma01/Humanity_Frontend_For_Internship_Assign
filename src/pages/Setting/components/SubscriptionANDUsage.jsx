import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, CreditCard, HelpCircle } from 'lucide-react';

const SubscriptionANDUsage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [saveCard, setSaveCard] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for billing history
  const billingHistory = [
    { id: 1, plan: 'Standard Plan', amount: '$25', date: '28/09/2024', status: 'pending' },
    { id: 2, plan: 'Standard Plan', amount: '$25', date: '28/09/2024', status: 'failed' },
    { id: 3, plan: 'Standard Plan', amount: '$25', date: '28/09/2024', status: 'paid' },
    { id: 4, plan: 'Standard Plan', amount: '$25', date: '28/09/2024', status: 'paid' },
    { id: 5, plan: 'Standard Plan', amount: '$25', date: '28/09/2024', status: 'paid' },
  ];

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSaveCardToggle = () => {
    setSaveCard(!saveCard);
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    return (
      <>
        <button 
          className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
          onClick={() => changePage(Math.max(1, currentPage - 1))}
        >
          <ChevronLeft size={16} />
        </button>
        
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white"
          onClick={() => changePage(1)}
        >
          1
        </button>
        
        <button
          className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          onClick={() => changePage(2)}
        >
          2
        </button>
        
        <button
          className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          onClick={() => changePage(3)}
        >
          3
        </button>
        
        <button
          className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          onClick={() => changePage(4)}
        >
          4
        </button>
        
        <button
          className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          onClick={() => changePage(5)}
        >
          5
        </button>
        
        <span className="px-2 py-1 text-gray-500">
          ...
        </span>
        
        <button
          className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          onClick={() => changePage(20)}
        >
          20
        </button>
        
        <button 
          className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
          onClick={() => changePage(Math.min(20, currentPage + 1))}
        >
          <ChevronRight size={16} />
        </button>
      </>
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">Pending</span>;
      case 'failed':
        return <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">Failed</span>;
      case 'paid':
        return <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">Paid</span>;
      default:
        return null;
    }
  };

  return (
    <div className="mt-8 overflow-auto max-h-[calc(100vh-200px)] pr-1">
      <div className="space-y-8">
        {/* Current Plan */}
        <div>
          <h2 className="text-xl font-medium text-gray-900 mb-4">Current Plan</h2>
          
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-base font-medium text-gray-800">Your Current Plan is Basic</h3>
              <p className="text-sm text-gray-600 mt-1">A simple start for everyone</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-600">Days</div>
              <div className="text-base font-medium text-gray-800">12 of 30 Days</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mb-4">18 days remaining until your plan requires update</p>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600">Active until May 09, 2025</p>
            <p className="text-sm text-gray-600">We will send you a notification upon Subscription expiration</p>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-gray-800 mr-2">$25 Per Month</h3>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-xs font-medium">Popular</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Standard plan for small to medium businesses</p>
          </div>
          
          <div className="flex space-x-4">
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Upgrade Plan
            </button>
            <button className="px-6 py-2.5 bg-red-50 text-red-600 rounded border border-red-200 hover:bg-red-100 transition-colors">
              Cancel Subscription
            </button>
          </div>
        </div>
        
        {/* Payment Methods */}
          <h2 className="text-xl font-medium text-gray-900 mb-4">Payment Methods</h2>
        <div className="border-t border-gray-200 pt-8 flex gap-4">
          <div className="mainPayment">

          
          <div className="flex items-start space-x-4 mb-6">
            <div className="flex items-center h-5 mt-1">
              <input
                id="card-payment"
                type="radio"
                name="payment-method"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={paymentMethod === 'card'}
                onChange={() => handlePaymentMethodChange('card')}
              />
            </div>
            <div>
              <label htmlFor="card-payment" className="block text-base font-medium text-gray-800">
                Credit/Debit/ATM Card
              </label>
            </div>
            
            <div className="flex items-center h-5 mt-1 ml-8">
              <input
                id="paypal-payment"
                type="radio"
                name="payment-method"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={paymentMethod === 'paypal'}
                onChange={() => handlePaymentMethodChange('paypal')}
              />
            </div>
            <div>
              <label htmlFor="paypal-payment" className="block text-base font-medium text-gray-800">
                Paypal account
              </label>
            </div>
          </div>
          
 
            <div className="space-y-4 mb-8 ">
              <div>
                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="card-number"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1356 3215 6548 7898"
                />
              </div>
              
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="card-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div className="w-1/4">
                  <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="card-expiry"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="w-1/4">
                  <label htmlFor="card-cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    Card number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="card-cvv"
                      className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="654"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center mt-4">
                <input
                  id="save-card"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={saveCard}
                  onChange={handleSaveCardToggle}
                />
                <label htmlFor="save-card" className="ml-2 block text-sm text-gray-600">
                  Save card for future billing?
                </label>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
                <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
            </div>
        
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">My Cards</h3>
            
            <div className="space-y-4">
              <div className="bg-[#F5F5F5] p-4 rounded-lg flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-8 bg-gradient-to-r from-yellow-500 to-red-500 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full mr-0.5"></div>
                      <div className="w-4 h-4 bg-white rounded-full ml-0.5 opacity-70"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Tom McBride</p>
                    <p className="text-xs text-gray-500">**** **** 9856</p>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-xs font-medium">Primary</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-xs text-gray-500 mr-4">Card expires at 12/26</p>
                  <button className="text-blue-600 text-sm font-medium hover:underline mr-4">Edit</button>
                  <button className="text-red-600 text-sm font-medium hover:underline">Delete</button>
                </div>
              </div>
              
              <div className="bg-[#F5F5F5] p-4 rounded-lg flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-8 bg-blue-800 rounded flex items-center justify-center text-white">
                      <span className="text-white font-bold tracking-widest text-xs">VISA</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Mildred Wagner</p>
                    <p className="text-xs text-gray-500">**** **** 5896</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-xs text-gray-500 mr-4">Card expires at 10/27</p>
                  <button className="text-blue-600 text-sm font-medium hover:underline mr-4">Edit</button>
                  <button className="text-red-600 text-sm font-medium hover:underline">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Billing History */}
        <div className="border-t border-gray-200 pt-8 pb-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Billing History</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="border-b border-gray-200">
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issued Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {item.plan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-500 hover:text-gray-700">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              Showing 1 to 5 of 200 entries
            </div>
            <div className="flex space-x-1">
              {renderPagination()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionANDUsage;