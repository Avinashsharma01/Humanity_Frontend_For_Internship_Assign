import React, { useState } from 'react';
import { Search, Filter, Clock } from 'lucide-react';

const InteractionsNotes = ({ promoterId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Static data matching the screenshot
  const interactionHistory = [
    { id: 1, date: 'Mar 30, 2025', time: '2:45 PM', type: 'Call', notes: 'Spoke about new referral bonuses' },
    { id: 2, date: 'Mar 25, 2025', time: '11:30 AM', type: 'Email', notes: 'Sent program details & signup link' },
    { id: 3, date: 'Mar 20, 2025', time: '1:15 PM', type: 'SMS', notes: 'Reminder about referral program rewards' },
    { id: 4, date: 'Mar 19, 2025', time: '1:15 PM', type: 'SMS', notes: 'Reminder about referral program rewards' },
    { id: 5, date: 'Mar 15, 2025', time: '1:15 PM', type: 'SMS', notes: 'Reminder about referral program rewards' },
    { id: 6, date: 'Mar 10, 2025', time: '1:15 PM', type: 'Email', notes: 'Sent program details & signup link' },
    { id: 7, date: 'Mar 08, 2025', time: '1:15 PM', type: 'Email', notes: 'Sent program details & signup link' },
    { id: 8, date: 'Mar 05, 2025', time: '1:15 PM', type: 'Call', notes: 'Spoke about new referral bonuses' },
  ];
  
  // Filter interactions based on search term
  const filteredInteractions = interactionHistory.filter(
    (interaction) => 
      interaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interaction.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interaction.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Interaction History</h3>
      
      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-md">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>
      
      {/* Interactions table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInteractions.map((interaction) => (
              <tr key={interaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {interaction.date} - {interaction.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {interaction.type}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {interaction.notes}
                </td>
              </tr>
            ))}
            
            {filteredInteractions.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No interactions found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InteractionsNotes; 