import apiClient from './apiClient';

// Campaign service methods
const campaignService = {
  // Assign promoter to campaign
  assignPromoter: async (assignmentData) => {
    try {
      // Verify token exists before making request
      const token = localStorage.getItem('userToken');
      if (!token) {
        console.error('No authentication token available for assignPromoter request');
        throw new Error('Authentication required. Please log in.');
      }

      console.log('Attempting to assign promoter with data:', assignmentData);
      const response = await apiClient.post('/campaigns/assign-promoter', assignmentData);
      return response.data;
    } catch (error) {
      console.error('Error assigning promoter:', error);
      throw error.response?.data || error.message || 'Failed to assign promoter to campaign';
    }
  },

  // Create a new campaign
  createCampaign: async (campaignData) => {
    try {
      // Verify token exists before making request
      const token = localStorage.getItem('userToken');
      if (!token) {
        console.error('No authentication token available for createCampaign request');
        throw new Error('Authentication required. Please log in.');
      }

      console.log('Attempting to create campaign with data:', campaignData);

      // Make request with explicit authorization header to ensure it's included
      const response = await apiClient.post('/campaigns/create-campaign', campaignData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Campaign creation successful:', response.status);
      return response.data;
    } catch (error) {
      console.error('Error creating campaign:', error);

      // Enhanced error handling
      if (error.response) {
        console.error('Server response:', error.response.status, error.response.data);
        if (error.response.status === 401) {
          throw new Error('Authentication failed. Please log in again.');
        } else {
          throw error.response.data || new Error(`Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('No response from server. Please check your internet connection.');
      } else {
        throw error;
      }
    }
  },

  // Get all campaigns
  getAllCampaigns: async () => {
    try {
      // Verify token exists before making request
      const token = localStorage.getItem('userToken');
      if (!token) {
        console.error('No authentication token available for getAllCampaigns request');
        throw new Error('Authentication required. Please log in.');
      }

      console.log('Attempting to fetch all campaigns');
      const response = await apiClient.get('/campaigns/get-all-campaigns');
      return response.data;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error.response?.data || error.message || 'Failed to get campaigns';
    }
  },

  // Get campaign by ID
  getCampaignById: async (campaignId) => {
    try {
      const response = await apiClient.get(`/campaigns/get-campaign/${campaignId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Failed to get campaign details';
    }
  },

  // Update campaign
  updateCampaign: async (campaignId, campaignData) => {
    try {
      const response = await apiClient.put(`/campaigns/update-campaign/${campaignId}`, campaignData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Failed to update campaign';
    }
  },

  // Delete campaign
  deleteCampaign: async (campaignId) => {
    try {
      const response = await apiClient.delete(`/campaigns/delete-campaign/${campaignId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Failed to delete campaign';
    }
  }
};

export default campaignService;