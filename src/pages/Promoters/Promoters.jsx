import React, { useState } from 'react';
import { Search, Filter, Eye, MessageSquare, ChevronDown, Plus, Users, BarChart, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddPromoterModal from './components/AddPromoterModal';
import { usePromoters } from '../../contexts/PromotersContext';

function Promoters() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Use the promoter context instead of local state
  const { promotersData, addPromoter } = usePromoters();

  // Stats cards data
  const statsCards = [
    {
      title: "Total Customers",
      value: promotersData.length.toString(),
      change: "+12%",
      period: "vs last month",
      icon: <Users className="text-gray-600" size={20} />
    },
    {
      title: "New Customers",
      value: "94",
      change: "+8%",
      period: "vs last month",
      icon: <Users className="text-gray-600" size={20} />
    },
    {
      title: "Average Conversion rate",
      value: "64%",
      change: "-3%",
      period: "vs last month",
      icon: <BarChart className="text-gray-600" size={20} />
    },
    {
      title: "Total Revenue Generated",
      value: "$23,900",
      change: "+15%",
      period: "vs last month",
      icon: <DollarSign className="text-gray-600" size={20} />
    }
  ];

  const handleToggleSelectAll = () => {
    if (selectedRows.length === promotersData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(promotersData.map(promoter => promoter.id));
    }
  };

  const handleToggleSelectRow = (id) => {
    setSelectedRows(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(rowId => rowId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSavePromoter = (promoters) => {
    // Use the addPromoter function from context
    addPromoter(promoters);
    setIsModalOpen(false);
  };

  const handleViewProfile = (promoterId) => {
    navigate(`/promoters/${promoterId}`);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-6">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Manage and monitor your promoter referral activities</h1>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-4 mb-8">
          <button 
            className="bg-blue-500 text-white flex items-center gap-2 px-4 py-2 rounded"
            onClick={handleOpenModal}
          >
            <Plus size={16} />
            New Promoter
          </button>
          <button className="border border-blue-500 text-blue-500 px-5 py-2 rounded">
            Ask Past Customers For Referrals
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-5 flex items-start shadow-sm">
              <div className="p-2 rounded-full bg-gray-100 mr-3">
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-sm text-green-500">
                  {stat.change} <span className="text-gray-400">{stat.period}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Promoters Section */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-medium">Promoters</h2>
          <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-md"
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700">
            <Filter size={16} />
            Filter
          </button>
          </div>
        </div>

        {/* Promoters Table */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3.5 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === promotersData.length}
                        onChange={handleToggleSelectAll}
                        className="mr-2"
                      />
                      <span className="text-xs font-medium text-gray-500 uppercase">Promoter Name</span>
                    </div>
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">Contact No.</th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">Leads</th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">Conversion Rate</th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">Last Follow-Up</th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">Revenue Generated</th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">Referrer Status</th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {promotersData.map((promoter) => (
                  <tr key={promoter.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(promoter.id)}
                          onChange={() => handleToggleSelectRow(promoter.id)}
                          className="mr-2"
                        />
                        <span className="font-medium text-gray-900">{promoter.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{promoter.contact}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{promoter.leads}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{promoter.conversion}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{promoter.lastFollowUp}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{promoter.revenue}</td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        promoter.status === 'Active' ? 'bg-blue-50 text-blue-600' : 
                        promoter.status === 'Completed' ? 'bg-green-50 text-green-600' : 
                        'bg-orange-50 text-orange-600'
                      }`}>
                        {promoter.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex items-center space-x-3">
                        <button 
                          className="text-gray-500 hover:text-gray-700 relative group"
                          onClick={() => handleViewProfile(promoter.id)}
                        >
                          <Eye size={16} />
                          <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                            View profile
                          </div>
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 relative group">
                          <MessageSquare size={16} />
                          <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                            Send follow-up message
                          </div>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Promoter Modal */}
      <AddPromoterModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePromoter}
      />
    </div>
  );
}

export default Promoters; 