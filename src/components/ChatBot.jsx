import React, { useState, useRef } from 'react';
import { X, Send, Star, ArrowRight } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Focus the input when opening
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message to the AI
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  const suggestions = [
    "Would you like to see today's insights for boosting referrals?",
    "Check out today's AI Insights",
    "Optimize your referral strategy",
    "View performance metrics",
    "Schedule a strategy call"
  ];

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {/* Chatbot button */}
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          className="flex items-center justify-center w-14 h-14 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          <div className="text-white">
            <Star className="w-6 h-6" />
          </div>
        </button>
      )}

      {/* Chatbot panel */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 max-w-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 flex items-center border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Star className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">AI Assistant</h3>
                <p className="text-xs text-gray-500">Dashboard Support</p>
              </div>
            </div>
            <button 
              onClick={toggleChatbot} 
              className="ml-auto text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 flex-1 overflow-y-auto max-h-80 space-y-3">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-center p-4 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors text-gray-700"
                onClick={() => {
                  // In a real app, this would trigger a specific AI response
                  console.log('Suggestion clicked:', suggestion);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t flex">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="ml-2 text-blue-500 hover:bg-blue-50 p-2 rounded-full"
              disabled={!message.trim()}
            >
              {message.trim() ? <Send className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 