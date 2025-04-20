import React, { useState } from 'react';
import { Search, Filter, Check, X, FileText, ArrowDown, ArrowUp } from 'lucide-react';

const DisputesTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // Mock data for disputes
  const mockDisputes = [
    {
      id: 'DSP-001',
      promoter: 'John Smith',
      email: 'john.smith@example.com',
      amount: 230.00,
      date: '2023-05-15',
      reason: 'Payment amount incorrect',
      status: 'pending',
      campaign: 'Summer Sale 2023'
    },
    {
      id: 'DSP-002',
      promoter: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      amount: 150.00,
      date: '2023-05-10',
      reason: 'Missing referral credit',
      status: 'resolved',
      campaign: 'Spring Collection'
    },
    {
      id: 'DSP-003',
      promoter: 'Michael Brown',
      email: 'michael.b@example.com',
      amount: 410.00,
      date: '2023-05-08',
      reason: 'Double charge issue',
      status: 'rejected',
      campaign: 'Holiday Special'
    },
    {
      id: 'DSP-004',
      promoter: 'Emma Wilson',
      email: 'emma.w@example.com',
      amount: 320.00,
      date: '2023-05-05',
      reason: 'Commission calculation error',
      status: 'pending',
      campaign: 'Flash Sale'
    },
    {
      id: 'DSP-005',
      promoter: 'David Lee',
      email: 'david.l@example.com',
      amount: 195.00,
      date: '2023-05-01',
      reason: 'Referral tracking issue',
      status: 'resolved',
      campaign: 'Summer Sale 2023'
    }
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const viewDisputeDetails = (id) => {
    console.log(`View dispute details for ${id}`);
    // Add implementation for viewing dispute details
  };

  // Filter disputes based on search term and status
  const filteredDisputes = mockDisputes.filter(dispute => {
    const matchesSearch = 
      dispute.promoter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispute.campaign.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || dispute.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort disputes
  const sortedDisputes = [...filteredDisputes].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'promoter':
        comparison = a.promoter.localeCompare(b.promoter);
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Count disputes by status
  const pendingCount = mockDisputes.filter(d => d.status === 'pending').length;
  const resolvedCount = mockDisputes.filter(d => d.status === 'resolved').length;
  const rejectedCount = mockDisputes.filter(d => d.status === 'rejected').length;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Search disputes by name, email, ID, reason..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-100"
            onClick={toggleFilters}
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="mb-3 font-medium">Filter by status</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleStatusFilterChange('all')}
              className={`px-3 py-1 text-sm rounded-full ${
                statusFilter === 'all'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleStatusFilterChange('pending')}
              className={`px-3 py-1 text-sm rounded-full ${
                statusFilter === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => handleStatusFilterChange('resolved')}
              className={`px-3 py-1 text-sm rounded-full ${
                statusFilter === 'resolved'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              Resolved
            </button>
            <button
              onClick={() => handleStatusFilterChange('rejected')}
              className={`px-3 py-1 text-sm rounded-full ${
                statusFilter === 'rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              Rejected
            </button>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500 mb-1">Total Disputes</div>
          <div className="text-3xl font-bold">{mockDisputes.length}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500 mb-1">Pending Disputes</div>
          <div className="text-3xl font-bold text-yellow-600">{pendingCount}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm font-medium text-gray-500 mb-1">Resolved Disputes</div>
          <div className="text-3xl font-bold text-green-600">{resolvedCount}</div>
        </div>
      </div>

      {/* Disputes Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Dispute ID</th>
              <th 
                scope="col" 
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort('promoter')}
              >
                <div className="flex items-center">
                  Promoter
                  {sortField === 'promoter' && (
                    sortDirection === 'asc' ? <ArrowUp className="w-4 h-4 ml-1" /> : <ArrowDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">Campaign</th>
              <th 
                scope="col" 
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center">
                  Amount
                  {sortField === 'amount' && (
                    sortDirection === 'asc' ? <ArrowUp className="w-4 h-4 ml-1" /> : <ArrowDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center">
                  Date
                  {sortField === 'date' && (
                    sortDirection === 'asc' ? <ArrowUp className="w-4 h-4 ml-1" /> : <ArrowDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">Reason</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedDisputes.length > 0 ? (
              sortedDisputes.map((dispute) => (
                <tr key={dispute.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {dispute.id}
                  </td>
                  <td className="px-6 py-4">
                    <div>{dispute.promoter}</div>
                    <div className="text-xs text-gray-500">{dispute.email}</div>
                  </td>
                  <td className="px-6 py-4">{dispute.campaign}</td>
                  <td className="px-6 py-4 font-medium">${dispute.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">{formatDate(dispute.date)}</td>
                  <td className="px-6 py-4 max-w-xs truncate" title={dispute.reason}>
                    {dispute.reason}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(dispute.status)}`}>
                      {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => viewDisputeDetails(dispute.id)}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b">
                <td colSpan="8" className="px-6 py-10 text-center text-gray-500">
                  No disputes found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisputesTab; 