import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import authService from '../services/authService';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, currentUser, login } = useAuth();
  const location = useLocation();
  const [localLoading, setLocalLoading] = useState(true);

  // Double-check authentication on route access
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists in localStorage (direct access)
        const token = localStorage.getItem('userToken');
        const storedUser = localStorage.getItem('user');
        
        console.log("ProtectedRoute - Token:", !!token);
        console.log("ProtectedRoute - Stored user:", !!storedUser);
        console.log("ProtectedRoute - Context authenticated:", isAuthenticated);
        console.log("ProtectedRoute - Context user:", !!currentUser);
        
        // If we have a token but no authenticated user in context
        if (token && storedUser && !currentUser) {
          console.log("ProtectedRoute - Restoring user session from localStorage");
          // Parse user data and set in context
          const userData = JSON.parse(storedUser);
          await login(userData);
        }
      } catch (error) {
        console.error("ProtectedRoute auth check error:", error);
      } finally {
        setLocalLoading(false);
      }
    };
    
    checkAuth();
  }, [currentUser, isAuthenticated, login]);

  // Show loading state if still checking authentication
  if (loading || localLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Direct check with localStorage as backup
  const hasToken = localStorage.getItem('userToken');
  
  // Redirect to login if not authenticated
  if (!isAuthenticated && !hasToken) {
    console.log("ProtectedRoute - Redirecting to login");
    // Save the location they were trying to go to for later redirection
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute; 