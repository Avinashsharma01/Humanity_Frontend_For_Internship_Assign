import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const PromotersContext = createContext();

// Provider component
export const PromotersProvider = ({ children }) => {
  // Initial promoter data - in a real app, this would be fetched from an API
  const [promotersData, setPromotersData] = useState([
    { 
      id: 1, 
      name: 'Avinash Sharma', 
      email: 'avinashsharma31384@gmail.com', 
      contact: '+916201693634', 
      leads: 12, 
      conversion: '50%', 
      lastFollowUp: '28-4-2024', 
      revenue: '$5000', 
      status: 'Active',
      contactInfo: {
        memberSince: 'February 15, 2024',
        location: 'San Francisco, CA',
        timeZone: 'Pacific Time (PT)'
      }
    },
    { 
      id: 2, 
      name: 'Kadin Lipshutz', 
      email: 'kadin.lipshutz@example.com', 
      contact: '+971501948279', 
      leads: 8, 
      conversion: '30%', 
      lastFollowUp: '27-5-2024', 
      revenue: '$900', 
      status: 'Active',
      contactInfo: {
        memberSince: 'March 10, 2024',
        location: 'New York, NY',
        timeZone: 'Eastern Time (ET)'
      }
    },
    { 
      id: 3, 
      name: 'Randy Culhane', 
      email: 'randy.culhane@example.com', 
      contact: '+971501598978', 
      leads: 15, 
      conversion: '60%', 
      lastFollowUp: '29-5-2024', 
      revenue: '$1000', 
      status: 'Inactive',
      contactInfo: {
        memberSince: 'January 5, 2024',
        location: 'Chicago, IL',
        timeZone: 'Central Time (CT)'
      }
    },
    { 
      id: 4, 
      name: 'Jaxson Vaccaro', 
      email: 'jaxson.vaccaro@example.com', 
      contact: '+971522503635', 
      leads: 10, 
      conversion: '45%', 
      lastFollowUp: '30-6-2024', 
      revenue: '$500', 
      status: 'Completed',
      contactInfo: {
        memberSince: 'April 2, 2024',
        location: 'Los Angeles, CA',
        timeZone: 'Pacific Time (PT)'
      }
    },
    { 
      id: 5, 
      name: 'Jocelyn Levin', 
      email: 'jocelyn.levin@example.com', 
      contact: '+971554315300', 
      leads: 6, 
      conversion: '28%', 
      lastFollowUp: '01-7-2024', 
      revenue: '$1,500', 
      status: 'Inactive',
      contactInfo: {
        memberSince: 'December 12, 2023',
        location: 'Boston, MA',
        timeZone: 'Eastern Time (ET)'
      }
    },
    { 
      id: 6, 
      name: 'Maren Septimus', 
      email: 'maren.septimus@example.com', 
      contact: '+971525620832', 
      leads: 18, 
      conversion: '65%', 
      lastFollowUp: '03-7-2024', 
      revenue: '$2,000', 
      status: 'Completed',
      contactInfo: {
        memberSince: 'February 28, 2024',
        location: 'Seattle, WA',
        timeZone: 'Pacific Time (PT)'
      }
    },
    { 
      id: 7, 
      name: 'Haylie Saris', 
      email: 'haylie.saris@example.com', 
      contact: '+971503328228', 
      leads: 13, 
      conversion: '58%', 
      lastFollowUp: '05-7-2024', 
      revenue: '$300', 
      status: 'Active',
      contactInfo: {
        memberSince: 'March 15, 2024',
        location: 'Austin, TX',
        timeZone: 'Central Time (CT)'
      }
    },
    { 
      id: 8, 
      name: 'Randy Herwitz', 
      email: 'randy.herwitz@example.com', 
      contact: '+971554231522', 
      leads: 12, 
      conversion: '50%', 
      lastFollowUp: '10-7-2024', 
      revenue: '$600', 
      status: 'Inactive',
      contactInfo: {
        memberSince: 'January 20, 2024',
        location: 'Miami, FL',
        timeZone: 'Eastern Time (ET)'
      }
    }
  ]);

  // Mock interaction data - in a real app, this would be fetched from an API
  const [interactionsData, setInteractionsData] = useState({
    1: [
      { id: 1, date: '2024-07-10T14:30:00', type: 'note', content: 'Initial onboarding call completed. Very enthusiastic about the program.' },
      { id: 2, date: '2024-07-12T10:15:00', type: 'email', content: 'Sent follow-up email with resources and campaign details.' },
      { id: 3, date: '2024-07-15T16:45:00', type: 'call', content: 'Called to check on progress. Has already reached out to 5 potential leads.' },
      { id: 4, date: '2024-07-20T09:00:00', type: 'sms', content: 'Sent SMS reminder about the upcoming webinar.' }
    ],
    2: [
      { id: 1, date: '2024-07-05T11:00:00', type: 'note', content: 'Expressed interest in the premium tier of our referral program.' },
      { id: 2, date: '2024-07-08T13:20:00', type: 'call', content: 'Discussed strategy for approaching enterprise clients.' },
      { id: 3, date: '2024-07-14T15:30:00', type: 'email', content: 'Sent additional materials on enterprise pricing and benefits.' }
    ],
    3: [
      { id: 1, date: '2024-06-28T10:00:00', type: 'note', content: 'Has been inactive for the past month. Need to re-engage.' },
      { id: 2, date: '2024-07-01T09:15:00', type: 'email', content: 'Sent re-engagement email with new incentives.' },
      { id: 3, date: '2024-07-07T14:00:00', type: 'call', content: 'No answer. Left voicemail about new campaign opportunities.' }
    ]
  });

  const addPromoter = (newPromoters) => {
    // Format the new promoters to match existing data structure
    const formattedPromoters = newPromoters.map((promoter, index) => {
      const newId = Math.max(...promotersData.map(p => p.id)) + index + 1;
      return {
        id: newId,
        name: `${promoter.firstName} ${promoter.lastName}`,
        contact: promoter.phone || 'N/A',
        email: promoter.email,
        leads: 0,
        conversion: '0%',
        lastFollowUp: 'N/A',
        revenue: '$0',
        status: 'Active',
        contactInfo: {
          memberSince: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          location: 'Not specified',
          timeZone: 'Not specified'
        }
      };
    });

    setPromotersData([...promotersData, ...formattedPromoters]);
  };

  const getPromoterById = (id) => {
    return promotersData.find(promoter => promoter.id === parseInt(id)) || null;
  };

  const getPromoterInteractions = (id) => {
    return interactionsData[id] || [];
  };

  const addInteraction = (promoterId, interaction) => {
    const newId = interactionsData[promoterId] ? 
      Math.max(...interactionsData[promoterId].map(i => i.id)) + 1 : 1;
    
    const newInteraction = {
      id: newId,
      date: new Date().toISOString(),
      type: interaction.type,
      content: interaction.content
    };

    setInteractionsData(prev => ({
      ...prev,
      [promoterId]: [...(prev[promoterId] || []), newInteraction]
    }));

    return newInteraction;
  };

  // Value to be provided by the context
  const value = {
    promotersData,
    setPromotersData,
    addPromoter,
    getPromoterById,
    getPromoterInteractions,
    addInteraction
  };

  return (
    <PromotersContext.Provider value={value}>
      {children}
    </PromotersContext.Provider>
  );
};

// Custom hook for using the context
export const usePromoters = () => {
  const context = useContext(PromotersContext);
  if (!context) {
    throw new Error('usePromoters must be used within a PromotersProvider');
  }
  return context;
};

export default PromotersContext; 