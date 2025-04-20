import React, { useState } from 'react';
import { X } from 'lucide-react';

const EmailPhoneSetup = () => {
  const [emailOption, setEmailOption] = useState('system');
  const [smsOption, setSmsOption] = useState('system');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [emailDomain, setEmailDomain] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const handleEmailOptionChange = (option) => {
    setEmailOption(option);
  };

  const handleSmsOptionChange = (option) => {
    setSmsOption(option);
  };

  const openEmailModal = () => {
    setShowEmailModal(true);
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
  };

  const openPhoneModal = () => {
    setShowPhoneModal(true);
  };

  const closePhoneModal = () => {
    setShowPhoneModal(false);
  };

  const handleEmailDomainChange = (e) => {
    setEmailDomain(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const connectEmailDomain = () => {
    // Logic to connect email domain would go here
    closeEmailModal();
  };

  const sendVerificationCode = () => {
    // Logic to send verification code would go here
    setIsVerificationSent(true);
  };

  const verifyPhoneNumber = () => {
    // Logic to verify phone number would go here
    closePhoneModal();
  };

  return (
    <div className="mt-8 overflow-auto max-h-[calc(100vh-200px)] pr-1">
      <div className="space-y-12">
        {/* Email Sending Settings */}
        <div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">Global Email Sending Address</h2>
          <p className="text-gray-500 mb-6">Choose how your outgoing emails (referral links, follow-ups, etc.) are sent from the platform.</p>
          
          <div className="space-y-6">
            {/* System Email Option */}
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-1">
                <input
                  id="system-email"
                  type="radio"
                  name="email-option"
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  checked={emailOption === 'system'}
                  onChange={() => handleEmailOptionChange('system')}
                />
              </div>
              <div className="ml-3">
                <label htmlFor="system-email" className="text-base font-medium text-gray-800">Use System Email</label>
                <p className="text-gray-500 text-sm mt-1">
                  Emails will be sent using ReferralHub's default system address (e.g., notify@ReferralHub.app).
                </p>
              </div>
            </div>
            
            {/* Custom Email Domain Option */}
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-1">
                <input
                  id="custom-email"
                  type="radio"
                  name="email-option"
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  checked={emailOption === 'custom'}
                  onChange={() => handleEmailOptionChange('custom')}
                />
              </div>
              <div className="ml-3">
                <label htmlFor="custom-email" className="text-base font-medium text-gray-800">Connect Your Custom Email Domain</label>
                <p className="text-gray-500 text-sm mt-1">
                  Improve deliverability and brand recognition by sending from your own domain (e.g., you@yourcompany.com).
                </p>
              </div>
            </div>
        
          </div>
          
          {emailOption === 'custom' && (
            <div className="mt-4 ml-8">
              <button 
                className="px-5 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={openEmailModal}
              >
                Connect Email Domain
              </button>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          {/* SMS Sending Settings */}
          <h2 className="text-xl font-medium text-gray-900 mb-2">Global SMS Sending Number</h2>
          <p className="text-gray-500 mb-6">Choose how SMS messages (referral links, updates, rewards) are sent to your customers.</p>
          
          <div className="space-y-6">
            {/* System Phone Option */}
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-1">
                <input
                  id="system-phone"
                  type="radio"
                  name="sms-option"
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  checked={smsOption === 'system'}
                  onChange={() => handleSmsOptionChange('system')}
                />
              </div>
              <div className="ml-3">
                <label htmlFor="system-phone" className="text-base font-medium text-gray-800">Use System Phone Number</label>
                <p className="text-gray-500 text-sm mt-1">
                  Messages will be sent from a standard number owned by ReferralHub.
                </p>
              </div>
            </div>
            
            {/* Custom Phone Number Option */}
            <div className="flex items-start">
              <div className="flex items-center h-5 mt-1">
                <input
                  id="custom-phone"
                  type="radio"
                  name="sms-option"
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  checked={smsOption === 'custom'}
                  onChange={() => handleSmsOptionChange('custom')}
                />
              </div>
              <div className="ml-3">
                <label htmlFor="custom-phone" className="text-base font-medium text-gray-800">Connect Your Own Phone Number</label>
                <p className="text-gray-500 text-sm mt-1">
                  Use a verified number for better brand trust and consistency.
                </p>
              </div>
            </div>
          </div>
          
          {smsOption === 'custom' && (
            <div className="mt-4 ml-8">
              <button 
                className="px-5 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={openPhoneModal}
              >
                Connect Phone Number
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Email Domain Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Connect Email Domain</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={closeEmailModal}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-4">
                Enter your domain name to set up custom email sending. You'll need to verify domain ownership by adding DNS records.
              </p>
              
              <label htmlFor="email-domain" className="block text-sm font-medium text-gray-700 mb-1">
                Domain Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="email-domain"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="yourdomain.com"
                  value={emailDomain}
                  onChange={handleEmailDomainChange}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={closeEmailModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={connectEmailDomain}
              >
                Connect Domain
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phone Number Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Connect Phone Number</h3>
              <button 
                className="text-gray-400 hover:text-gray-500"
                onClick={closePhoneModal}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-4">
                Enter your phone number to use for sending SMS messages. We'll send a verification code to confirm ownership.
              </p>
              
              <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="phone-number"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="+1 (555) 123-4567"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              
              {isVerificationSent && (
                <div className="mt-4">
                  <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 mb-1">
                    Verification Code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="verification-code"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="123456"
                      value={verificationCode}
                      onChange={handleVerificationCodeChange}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={closePhoneModal}
              >
                Cancel
              </button>
              {!isVerificationSent ? (
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={sendVerificationCode}
                >
                  Send Code
                </button>
              ) : (
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={verifyPhoneNumber}
                >
                  Verify
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailPhoneSetup;