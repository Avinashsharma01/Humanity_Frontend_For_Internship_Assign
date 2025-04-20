import React, { useState } from 'react';
import { Search, Filter, Eye, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Leads() {
  const [selectedLeads, setSelectedLeads] = useState([1, 2]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);
  const navigate = useNavigate();
  
  // Mock data for leads matching the screenshot
  const leadsData = [
    { id: 1, name: 'Emery Dokidis', email: 'emerydoki@gmail.com', contact: '+979970174715', coupon: 'SAVE10NOW', status: 'Pending', action: 'View Profile' },
    { id: 2, name: 'Kadin Lipshutz', email: 'kadinlipshutz@gmail.com', contact: '+971501948279', coupon: 'WELCOME15', status: 'Pending', action: 'Send follow-up message' },
    { id: 3, name: 'Randy Culhane', email: 'randyculhane@gmail.com', contact: '+971501598978', coupon: 'EXCLUSIVE20', status: 'Pending', action: 'View Profile' },
    { id: 4, name: 'Jaxson Vaccaro', email: 'jaxonvaccaro@gmail.com', contact: '+971522503635', coupon: 'GETDEAL25', status: 'Completed', action: 'Send follow-up message' },
    { id: 5, name: 'Jocelyn Levin', email: 'jocelynlevin@gmail.com', contact: '+971554315300', coupon: 'FIRSTORDER10', status: 'Pending', action: 'View Profile' },
    { id: 6, name: 'Maren Septimus', email: 'marenseptimus@gmail.com', contact: '+971525620832', coupon: 'SPECIALSAVE15', status: 'Completed', action: 'Send follow-up message' },
    { id: 7, name: 'Haylie Saris', email: 'hayliesaris@gmail.com', contact: '+971503328228', coupon: 'LIMITED20', status: 'Completed', action: 'View Profile' },
    { id: 8, name: 'Randy Herwitz', email: 'randyherwitz@gmail.com', contact: '+971554231522', coupon: 'TRYUS10', status: 'Pending', action: 'Send follow-up message' },
  ];
  
  // Filter leads by search term
  const filteredLeads = leadsData.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.coupon.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectLead = (id) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter(leadId => leadId !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    }
  };

  const handleViewProfile = (leadId) => {
    navigate(`/leads/${leadId}`);
  };

  const handleSendMessage = (leadId) => {
    // In a real app, this would open a message dialog or navigate to a messaging page
    console.log('Send message to lead:', leadId);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Manage and monitor your leads</h1>
        
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Leads</h2>
            
            <div className="flex gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border rounded-md w-72"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="relative">
                <select className="pl-4 pr-10 py-2 border rounded-md appearance-none w-44">
                  <option>Change Status</option>
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 border rounded-md">
                <Filter className="h-5 w-5" />
                <span>Filter</span>
              </button>
            </div>
          </div>
          
          {/* Leads Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th className="py-3 pl-6 pr-3 text-left">
                    <input 
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Lead Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Email ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Contact No.
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Coupon Code
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    className="hover:bg-gray-50"
                    onMouseEnter={() => setHoveredRow(lead.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="py-4 pl-6 pr-3 whitespace-nowrap">
                      <input 
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => toggleSelectLead(lead.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.contact}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.coupon}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lead.status === 'Pending' 
                          ? 'bg-amber-100 text-amber-600' 
                          : 'bg-green-100 text-green-600'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3 items-center">
                        <div className="relative group">
                          <button 
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => handleViewProfile(lead.id)}
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                            View profile
                          </div>
                        </div>
                        <div className="relative group">
                          <button 
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => handleSendMessage(lead.id)}
                          >
                            <MessageSquare className="h-5 w-5" />
                          </button>
                          <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                            Send follow-up message
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leads; 