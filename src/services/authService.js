/* eslint-disable no-unused-vars */
import apiClient, { API_URL } from './apiClient';

const TOKEN_KEY = 'userToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user';

// Helper to parse token
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

// Helper to validate token expiration
const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decodedToken = parseJwt(token);
    if (!decodedToken) return false;

    // Check if token is expired
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};

// Helper to store user data
const storeUserData = (userData, formData = {}) => {
  // Store tokens
  if (userData.access) {
    localStorage.setItem(TOKEN_KEY, userData.access);
  } else if (userData.token) {
    localStorage.setItem(TOKEN_KEY, userData.token);
  }

  // Store refresh token if available
  if (userData.refresh) {
    localStorage.setItem(REFRESH_TOKEN_KEY, userData.refresh);
  }

  // If user data provided directly, store it
  if (userData.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(userData.user));
    return userData.user;
  }

  // Try to extract user info from token
  const token = userData.access || userData.token;
  if (token) {
    // Try JWT token parsing
    const tokenData = parseJwt(token);
    if (tokenData) {
      const user = {
        id: tokenData.sub || tokenData.id || tokenData._id,
        email: tokenData.email || formData.email,
        role: tokenData.role || formData.role,
        full_name: tokenData.full_name || formData.full_name || formData.name
      };
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    }

    // Fallback to form data
    const user = {
      email: formData.email,
      full_name: formData.full_name,
      name: formData.name,
      role: formData.role,
      phone: formData.phone
    };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return user;
  }

  return null;
};

// Auth service methods
const authService = {
  // Login user
  login: async (credentials) => {
    try {
      // First, check if we're running on Vercel (production)
      const isVercel = typeof window !== 'undefined' &&
        window.location.hostname.includes('vercel.app');

      // For Vercel deployments, use the proxied API route
      const loginEndpoint = isVercel ? '/api/auth/login' : '/auth/login';

      console.log('Auth service: Using login endpoint:', loginEndpoint);
      console.log('Auth service: Credentials:', { email: credentials.email, hasPassword: !!credentials.password });

      const response = await apiClient.post(loginEndpoint, credentials);
      console.log('Auth service login response:', response.data);

      // Check for token format and store correctly
      if (response.data) {
        // If tokens are provided directly in the response
        if (response.data.access) {
          localStorage.setItem(TOKEN_KEY, response.data.access);
          console.log('Auth service: Stored access token');
        } else if (response.data.token) {
          localStorage.setItem(TOKEN_KEY, response.data.token);
          console.log('Auth service: Stored token');
        }

        if (response.data.refresh) {
          localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);
          console.log('Auth service: Stored refresh token');
        }
      }

      storeUserData(response.data, credentials);
      return response.data;
    } catch (error) {
      console.error('Login error in authService:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
      throw error.response?.data || error.message || 'Login failed';
    }
  },

  // Register user
  register: async (userData) => {
    try {
      // First, check if we're running on Vercel (production)
      const isVercel = typeof window !== 'undefined' &&
        window.location.hostname.includes('vercel.app');

      // For Vercel deployments, use the proxied API route
      const registerEndpoint = isVercel ? '/api/auth/register' : '/auth/register';

      console.log('Auth service: Using register endpoint:', registerEndpoint);
      const response = await apiClient.post(registerEndpoint, userData);
      storeUserData(response.data, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Registration failed';
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    // For debugging
    console.log("Logged out. Token removed:", !localStorage.getItem(TOKEN_KEY));
    console.log("Logged out. Refresh token removed:", !localStorage.getItem(REFRESH_TOKEN_KEY));
    console.log("Logged out. User removed:", !localStorage.getItem(USER_KEY));
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;

    // For debugging
    console.log("Auth check - Token exists:", !!token);
    console.log("Auth check - Token valid:", isTokenValid(token));

    return isTokenValid(token);
  },

  // Get current user
  getCurrentUser: () => {
    try {
      // Only return user if token is valid
      if (!authService.isAuthenticated()) {
        return null;
      }

      const userString = localStorage.getItem(USER_KEY);
      if (userString) {
        return JSON.parse(userString);
      }
      return null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },

  // Get user profile from API
  getUserProfile: async () => {
    try {
      // Ensure we have a valid token
      if (!authService.isAuthenticated()) {
        throw new Error("Not authenticated");
      }

      const response = await apiClient.get('/auth/profile');

      // Update stored user data
      if (response.data) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Failed to fetch profile';
    }
  },

  // Refresh token if needed
  refreshToken: async () => {
    try {
      // Check if refresh token exists
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        console.error("No refresh token available");
        return false;
      }

      console.log("Attempting to refresh token using refresh token");

      // Set up timeout to avoid hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      // Call refresh token endpoint with the correct payload format
      const response = await apiClient.post('/auth/refresh', {
        refresh: refreshToken
      }, {
        signal: controller.signal,
        // Skip auth interceptor for this request to avoid circular dependency
        headers: {
          'Content-Type': 'application/json'
          // No Authorization header here
        }
      });

      // Clear the timeout since the request completed
      clearTimeout(timeoutId);

      console.log("Refresh token response:", response.data);

      // Store new tokens
      if (response.data && response.data.access) {
        // Store the new access token
        localStorage.setItem(TOKEN_KEY, response.data.access);
        console.log("New access token stored");

        // If a new refresh token is provided, store it too
        if (response.data.refresh) {
          localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);
          console.log("New refresh token stored");
        }

        return true;
      } else {
        console.error("Invalid response from refresh endpoint:", response.data);
        return false;
      }
    } catch (error) {
      console.error("Token refresh error:", error);

      // Check if the request was aborted due to timeout
      if (error.name === 'AbortError') {
        console.error('Refresh token request timed out');
        return false;
      }

      if (error.response) {
        console.error("Refresh error response:", error.response.data);
        console.error("Refresh error status:", error.response.status);

        // If the refresh token itself is invalid, clear everything
        if (error.response.status === 401 || error.response.status === 403) {
          console.error("Invalid refresh token, clearing auth data");
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(REFRESH_TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
        }
      }

      // Don't automatically logout on refresh failure
      // This allows the UI to show a message to the user
      return false;
    }
  },

  // New endpoints from the screenshot

  // Bulk upload promoters
  bulkUploadPromoters: async (promotersData) => {
    try {
      const response = await apiClient.post('/auth/bulk-upload-promoters', promotersData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Failed to bulk upload promoters';
    }
  },

  // Get business owner info
  getBusinessOwner: async () => {
    try {
      const response = await apiClient.get('/auth/create-business-owner');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Failed to get business owner info';
    }
  },

  // Create business owner
  createBusinessOwner: async (ownerData) => {
    try {
      const response = await apiClient.post('/auth/create-business-owner', ownerData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Failed to create business owner';
    }
  },

  // Create promoter
  createPromoter: async (promoterData) => {
    try {
      // Check if token exists
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        console.error('No authentication token available for createPromoter request');
        throw new Error('Authentication required. Please log in first.');
      }

      console.log('authService.createPromoter: Creating promoter with data:', promoterData);
      console.log('authService.createPromoter: Using token:', token.substring(0, 15) + '...');

      // Make the API call with explicit authentication header
      const response = await apiClient.post('/auth/create-promoter', promoterData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('authService.createPromoter: Success response:', response.status);
      return response.data;
    } catch (error) {
      console.error('Error creating promoter in authService:', error);

      // Enhanced error handling with detailed information
      if (error.response) {
        console.error('Server response:', error.response.status, error.response.data);

        // Handle specific error codes
        if (error.response.status === 401) {
          // Try to refresh token automatically and retry
          try {
            console.log('Attempting to refresh token and retry createPromoter request');
            const refreshed = await authService.refreshToken();
            if (refreshed) {
              // Retry the request with the new token
              const newToken = localStorage.getItem(TOKEN_KEY);
              const retryResponse = await apiClient.post('/auth/create-promoter', promoterData, {
                headers: {
                  'Authorization': `Bearer ${newToken}`,
                  'Content-Type': 'application/json'
                }
              });
              return retryResponse.data;
            } else {
              throw new Error('Authentication failed. Please log in again.');
            }
          } catch (refreshError) {
            console.error('Token refresh failed during createPromoter:', refreshError);
            throw new Error('Authentication failed. Please log in again.');
          }
        } else if (error.response.status === 400) {
          // Bad request - likely validation error
          const errorMessage = error.response.data.detail ||
            error.response.data.message ||
            'Invalid promoter data. Please check all fields.';
          throw new Error(errorMessage);
        } else {
          throw new Error(error.response.data.detail ||
            error.response.data.message ||
            `Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        // Request made but no response received
        console.error('No response received from server:', error.request);
        throw new Error('Server did not respond. Please check your internet connection and try again.');
      } else {
        // Error setting up the request
        console.error('Request setup error:', error.message);
        throw error;
      }
    }
  },

  // Get all promoters
  getPromoters: async () => {
    try {
      // Check if there's a token available
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        throw new Error('Authentication required to fetch promoters');
      }

      console.log('authService.getPromoters: Fetching promoters data');

      // Make the authenticated request to fetch promoters
      // Note: Using the same endpoint since it's designed to handle both GET and POST
      const response = await apiClient.get('/auth/create-promoter', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('authService.getPromoters: Response status:', response.status);

      // If successful, return the data
      return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
      console.error('Error fetching promoters in authService:', error);

      // Enhanced error reporting
      if (error.response) {
        console.error('Server response:', error.response.status, error.response.data);
        if (error.response.status === 401) {
          throw new Error('Authentication failed. Please log in again.');
        }
        throw error.response.data || new Error(`Server error: ${error.response.status}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('No response from server. Please check your internet connection.');
      } else {
        throw error;
      }
    }
  },

  // Verify token
  verifyToken: async (token) => {
    try {
      const response = await apiClient.get('/auth/verify-token', {
        params: { token: token || localStorage.getItem(TOKEN_KEY) }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message || 'Failed to verify token';
    }
  }
};

export default authService;