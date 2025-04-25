import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';

/**
 * Custom hook to verify authentication state and maintain persistence
 * @returns {Object} Authentication state information
 */
export const useAuthCheck = () => {
  const { isAuthenticated, currentUser, login } = useAuth();
  const [checking, setChecking] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setChecking(true);
        console.log("useAuthCheck - Starting auth verification");
        
        // Check localStorage directly
        const token = localStorage.getItem('userToken');
        const userString = localStorage.getItem('user');
        
        console.log("useAuthCheck - Token exists:", !!token);
        console.log("useAuthCheck - User data exists:", !!userString);
        console.log("useAuthCheck - Context auth state:", isAuthenticated);
        console.log("useAuthCheck - Context user exists:", !!currentUser);
        
        // Token exists but context doesn't show authenticated
        if (token && !isAuthenticated) {
          console.log("useAuthCheck - Found token but not authenticated in context");
          
          // Check if token is valid
          const isValid = authService.isAuthenticated();
          setTokenValid(isValid);
          
          if (isValid) {
            console.log("useAuthCheck - Token is valid, syncing user state");
            
            // Get user from localStorage
            if (userString) {
              const userData = JSON.parse(userString);
              console.log("useAuthCheck - Restoring user from localStorage:", userData);
              await login(userData);
            } else {
              // Try to fetch user profile from API
              try {
                console.log("useAuthCheck - Fetching user profile from API");
                const userData = await authService.getUserProfile();
                if (userData) {
                  console.log("useAuthCheck - Setting user from API:", userData);
                  await login(userData);
                }
              } catch (error) {
                console.error("useAuthCheck - Error fetching profile:", error);
              }
            }
          } else {
            // Token invalid, try to refresh
            console.log("useAuthCheck - Token invalid, attempting refresh");
            const refreshed = await authService.refreshToken();
            setTokenValid(refreshed);
            
            if (refreshed) {
              console.log("useAuthCheck - Token refreshed successfully");
              if (userString) {
                // Restore user from localStorage
                const userData = JSON.parse(userString);
                await login(userData);
              }
            } else {
              console.log("useAuthCheck - Token refresh failed, logging out");
              authService.logout();
            }
          }
        } else if (!token && isAuthenticated) {
          // No token but still authenticated in context
          console.log("useAuthCheck - No token but authenticated in context, fixing state");
          authService.logout();
        } else if (token && isAuthenticated) {
          // Both token and authenticated state exist
          console.log("useAuthCheck - Token and auth state match, verifying token");
          const isValid = authService.isAuthenticated();
          setTokenValid(isValid);
          
          if (!isValid) {
            console.log("useAuthCheck - Token invalid despite authenticated state");
            authService.logout();
          }
        }
        
        console.log("useAuthCheck - Verification complete");
      } catch (error) {
        console.error("useAuthCheck - Error during verification:", error);
      } finally {
        setChecking(false);
      }
    };
    
    verifyAuth();
  }, [isAuthenticated, currentUser, login]);
  
  return { checking, tokenValid };
};

export default useAuthCheck; 