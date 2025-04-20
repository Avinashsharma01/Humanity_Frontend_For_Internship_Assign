import React, { useState, useRef, useEffect } from 'react';
import { BiSend } from 'react-icons/bi';
import { RiRobot2Line } from 'react-icons/ri';
import { FiRefreshCw } from 'react-icons/fi';

// Example AI responses for demo purposes
const aiResponses = {
  'create campaign': `Absolutely! I'll help you create a high-converting referral campaign step by step. Let's start by defining your main objective. What's the primary goal of this campaign?`,
  
  'increase sales': `That's a great goal! Referral campaigns work best when there's a strong incentive. What kind of reward would you like to offer referrers?`,
  
  'discount': `Smart choice! Discounts are a great way to encourage both referrals and repeat purchases. How much discount would you like to offer per successful referral?`,

  'reward timing': `That's a great way to ensure that your campaign drives real revenue! Now, how long do you want this referral campaign to run?`,

  'summary': `Got it! Here's a quick summary of your campaign:

• Goal: Increase sales
• Reward: 15% discount on the next purchase
• Condition: Reward is given when the referred person makes a purchase
• Duration: 3 months`,

  'default': "Welcome Back, Kadin! How can I help you today?"
};

// Quick link actions
const quickLinks = [
  { icon: "send-referral", text: "SEND REFERRAL" },
  { icon: "create-campaign", text: "CREATE CAMPAIGN" },
  { icon: "follow-up", text: "FOLLOW-UP" },
  { icon: "view-referral", text: "VIEW REFERRAL" }
];

const AIAgent = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Welcome Back, Kadin! How can I help you today?", 
      sender: 'ai' 
    },
    {
      id: 2,
      text: "Hey, I want to create a new referral campaign, but I'd like some help from AI to make sure it's set up correctly and performs well. Can you guide me through it?",
      sender: 'user'
    },
    {
      id: 3,
      text: "Absolutely! I'll help you create a high-converting referral campaign step by step. Let's start by defining your main objective. What's the primary goal of this campaign?",
      sender: 'ai'
    },
    {
      id: 4,
      text: "My main goal is to increase sales through referrals. I want existing customers to bring in new paying customers, and I'd like to reward them for it.",
      sender: 'user'
    },
    {
      id: 5,
      text: "That's a great goal! Referral campaigns work best when there's a strong incentive. What kind of reward would you like to offer referrers?",
      sender: 'ai'
    },
    {
      id: 6,
      text: "Discount on next purchase",
      sender: 'user'
    },
    {
      id: 7,
      text: "Smart choice! Discounts are a great way to encourage both referrals and repeat purchases. How much discount would you like to offer per successful referral?",
      sender: 'ai'
    },
    {
      id: 8,
      text: "15%",
      sender: 'user'
    },
    {
      id: 9,
      text: "15% sounds like a strong incentive! Now, let's define when a referral is considered valid. When should the referrer receive their reward?",
      sender: 'ai'
    },
    {
      id: 10,
      text: "When the referred person signs up",
      sender: 'user'
    },
    {
      id: 11,
      text: "That's a great way to ensure that your campaign drives real revenue! Now, how long do you want this referral campaign to run?",
      sender: 'ai'
    },
    {
      id: 12,
      text: "I want to test this campaign for a while before making any long-term decisions, so I think 3 months would be ideal. If it works well, I can always extend it later.",
      sender: 'user'
    },
    {
      id: 13,
      text: "Got it! Here's a quick summary of your campaign:\n\n• Goal: Increase sales\n• Reward: 15% discount on the next purchase\n• Condition: Reward is given when the referred person makes a purchase\n• Duration: 3 months",
      sender: 'ai'
    },
    {
      id: 14,
      text: "Launch",
      sender: 'user'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input field when component mounts
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newUserMessage = { id: messages.length + 1, text: input, sender: 'user' };
    setMessages([...messages, newUserMessage]);
    
    // Simulate AI processing
    setTimeout(() => {
      let response;
      const lowercaseInput = input.toLowerCase();
      
      if (lowercaseInput.includes('create campaign') || lowercaseInput.includes('new campaign')) {
        response = aiResponses['create campaign'];
      } else if (lowercaseInput.includes('increase sales') || lowercaseInput.includes('main goal')) {
        response = aiResponses['increase sales'];
      } else if (lowercaseInput.includes('discount') || lowercaseInput.includes('next purchase')) {
        response = aiResponses['discount'];
      } else if (lowercaseInput.includes('when') || lowercaseInput.includes('signs up')) {
        response = aiResponses['reward timing'];
      } else if (lowercaseInput.includes('3 month') || lowercaseInput.includes('test')) {
        response = aiResponses['summary'];
      } else {
        response = aiResponses['default'];
      }
      
      const newAiMessage = { id: messages.length + 2, text: response, sender: 'ai' };
      setMessages(prevMessages => [...prevMessages, newAiMessage]);
    }, 600);
    
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetConversation = () => {
    setMessages([
      { 
        id: 1, 
        text: "Welcome Back, Kadin! How can I help you today?", 
        sender: 'ai' 
      }
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-auto p-6">
        {/* Messages container */}
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex items-start ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'ai' && (
              <div className="bg-blue-500 p-2 rounded-full mr-2 flex-shrink-0">
                <RiRobot2Line className="text-white" size={16} />
              </div>
            )}
            
            <div 
              className={`rounded-lg p-3 max-w-[80%] ${
                message.sender === 'user' 
                  ? 'bg-gray-100 text-gray-800 ml-auto' 
                  : 'bg-blue-50 text-gray-800'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">
                {message.text}
              </div>
            </div>
            
            {message.sender === 'user' && (
              <div className="bg-gray-400 p-2 rounded-full ml-2 flex-shrink-0">
                <img src="/avatar.png" alt="User" className="w-4 h-4" onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAxMmMtMS42NTUgMC0zLTEuMzQ1LTMtM3MxLjM0NS0zIDMtMyAzIDEuMzQ1IDMgMyAtMS4zNDUgMy0zIDN6bTAtOS44NzVDNi40OSAyLjEyNSAyLjEyNSA2LjQ5IDIuMTI1IDEyUzYuNDkgMjEuODc1IDEyIDIxLjg3NSAxMi4xMjUgMTcuNTEgMjEuODc1IDEyIDIxLjg3NSA2LjQ5IDEyIDYuNDkgMi4xMjV6bTAgMTguMzc1YTYuMDA0IDYuMDA0IDAgMCAxLTYtNmMwLTEuMTA2LjMxNS0yLjA4My44MDgtMi45MTcgMS4zMDgtLjYwOSAyLjc0Ny0uOTU4IDQuMjkyLS45NTggMi42NDggMCA1LjAyMyAxLjA1MSA2LjcyNSAyLjc1YTEwLjQ2IDEwLjQ2IDAgMCAxLTUuODI1IDIuNzI1eiI+PC9wYXRoPjwvc3ZnPg==';
                }} />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Quick links */}
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="flex justify-between mb-3">
          {quickLinks.map((link, i) => (
            <button key={i} className="text-blue-600 text-xs border border-blue-200 rounded-md px-3 py-2 hover:bg-blue-50">
              {link.text}
            </button>
          ))}
        </div>
        
        {/* Input area */}
        <div className="flex items-center border rounded-full pl-4 pr-2 py-1">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-grow bg-transparent border-none focus:ring-0 text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()} 
            className="p-1 bg-blue-600 rounded-full text-white"
          >
            <BiSend size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAgent;