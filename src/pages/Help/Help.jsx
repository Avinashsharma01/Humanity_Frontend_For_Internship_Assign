import React from 'react';

const Help = () => {
  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Help & Support</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Getting Started</h2>
            <ul className="space-y-3">
              <li className="text-blue-600 hover:underline cursor-pointer">How to set up your first campaign</li>
              <li className="text-blue-600 hover:underline cursor-pointer">Creating effective referral incentives</li>
              <li className="text-blue-600 hover:underline cursor-pointer">Inviting your first promoters</li>
              <li className="text-blue-600 hover:underline cursor-pointer">Understanding the dashboard</li>
              <li className="text-blue-600 hover:underline cursor-pointer">Campaign best practices</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Account Management</h2>
            <ul className="space-y-3">
              <li className="text-blue-600 hover:underline cursor-pointer">Managing your subscription</li>
              <li className="text-blue-600 hover:underline cursor-pointer">Adding team members</li>
              <li className="text-blue-600 hover:underline cursor-pointer">Updating billing information</li>
              <li className="text-blue-600 hover:underline cursor-pointer">Setting up notifications</li>
              <li className="text-blue-600 hover:underline cursor-pointer">Security best practices</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-10">
          <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">How do I track referral conversions?</h3>
              <p className="text-gray-600">
                Our platform automatically tracks conversions using unique referral links and cookies. You can view detailed analytics in the Dashboard section, including conversion rates, revenue generated, and individual promoter performance.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Can I customize the referral rewards?</h3>
              <p className="text-gray-600">
                Yes, you can fully customize your referral rewards. You can offer percentage discounts, fixed amounts, free products, or even custom rewards. Set different rewards for referrers and referred customers to optimize your campaign.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">How do I pay my promoters?</h3>
              <p className="text-gray-600">
                You can process payments to your promoters through our built-in payment system. We support various payment methods including bank transfers, PayPal, and store credits. You can schedule automatic payments or process them manually.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Is there a limit to how many promoters I can have?</h3>
              <p className="text-gray-600">
                The number of promoters you can have depends on your subscription plan. Our Basic plan supports up to 50 active promoters, while our Pro and Enterprise plans offer higher limits. You can upgrade your plan at any time as your program grows.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">How do I integrate with my existing systems?</h3>
              <p className="text-gray-600">
                We offer seamless integration with popular e-commerce platforms, CRM systems, and marketing tools through our API. Our documentation provides detailed guidance, and our support team is available to assist with custom integrations.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-lg font-semibold mb-4">Need more help?</h2>
          <p className="mb-4">Our support team is available to assist you with any questions or issues.</p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Contact Support
            </button>
            <button className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;