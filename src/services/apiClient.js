/* eslint-disable no-unused-vars */
import axios from 'axios';

const API_URL = 'http://34.10.166.233';
const TOKEN_KEY = 'userToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptor to include token in requests
apiClient.interceptors.request.use(
  (config) => {
    // Skip adding token for refresh token requests to avoid circular issues
    if (config.url === '/auth/refresh') {
      console.log('Skipping authorization header for refresh token request');
      return config;
    }

    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      // Always include the token in the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`Request to ${config.url}: Auth header set with token`);
    } else {
      console.log(`Request to ${config.url}: No token available!`);

      // For debugging purposes - log what's in localStorage
      console.log('localStorage state:', {
        userToken: !!localStorage.getItem(TOKEN_KEY),
        refreshToken: !!localStorage.getItem(REFRESH_TOKEN_KEY),
        user: !!localStorage.getItem('user')
      });
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Function to refresh token
const refreshAuthToken = async () => {
  try {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    console.log('ApiClient: Attempting to refresh token using refresh token');

    // Add timeout to prevent hanging refresh requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    // Call the refresh endpoint directly to avoid interceptors
    // Use the correct payload format { refresh: refreshToken }
    const response = await axios.post(`${API_URL}/auth/refresh`, {
      refresh: refreshToken
    }, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Clear timeout since request completed
    clearTimeout(timeoutId);

    console.log('ApiClient: Refresh token response received');

    if (response.data && response.data.access) {
      // Store the new access token
      localStorage.setItem(TOKEN_KEY, response.data.access);
      console.log('ApiClient: New access token stored');

      // If a new refresh token is provided, store it too
      if (response.data.refresh) {
        localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);
        console.log('ApiClient: New refresh token stored');
      }

      return response.data.access;
    } else {
      console.error('ApiClient: Invalid response from refresh endpoint:', response.data);
      throw new Error('Failed to refresh token');
    }
  } catch (error) {
    console.error('ApiClient: Token refresh failed:', error);

    // Handle abort/timeout errors
    if (error.name === 'AbortError' || error.code === 'ECONNABORTED') {
      console.error('ApiClient: Token refresh request timed out');
    }

    // Only clear tokens on specific errors, not network issues
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error('ApiClient: Authentication error during refresh, clearing tokens');
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem('user');
    }
    return null;
  }
};

// Track if we're currently refreshing to prevent multiple simultaneous refreshes
let isRefreshing = false;
// Store pending requests to retry after token refresh
let pendingRequests = [];

// Add response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging
    console.log(`Response from ${response.config.url}: Status ${response.status}`);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Network errors or request cancellation
    if (!error.response) {
      console.error('Network error or request cancelled:', error.message);
      return Promise.reject(error);
    }

    console.error(`Error response from ${originalRequest.url}: Status ${error.response.status}`);

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Prevent multiple simultaneous refresh requests
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Try to refresh the token
          const newToken = await refreshAuthToken();
          isRefreshing = false;

          if (newToken) {
            console.log('Retrying request with new token');
            // Update the Authorization header with the new token
            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            // Process any pending requests with the new token
            pendingRequests.forEach(pendingRequest => {
              pendingRequest.headers.Authorization = `Bearer ${newToken}`;
              axios(pendingRequest);
            });
            pendingRequests = [];

            // Retry the original request with the new token
            return axios(originalRequest);
          } else {
            // If refresh failed, handle redirection
            handleAuthFailure();
            return Promise.reject(error);
          }
        } catch (refreshError) {
          isRefreshing = false;
          console.error('Error refreshing token:', refreshError);
          handleAuthFailure();
          return Promise.reject(refreshError);
        }
      } else {
        // If already refreshing, queue this request to retry later
        return new Promise((resolve, reject) => {
          pendingRequests.push(originalRequest);
        });
      }
    }

    return Promise.reject(error);
  }
);

// Helper function to handle authentication failures
const handleAuthFailure = () => {
  // Only redirect to login if we're in a browser context and not already on the login page
  if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
    console.log('Authentication failed, redirecting to login');
    window.location.href = '/login';
  }
};

// Helper function to check if the user is authenticated
const checkAuth = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem('user');
  return !!token && !!user;
};

// Export the helper function along with the API client
export { API_URL, checkAuth };
export default apiClient;