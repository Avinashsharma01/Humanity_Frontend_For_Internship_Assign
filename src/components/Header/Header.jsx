import React, { useState, useRef, useEffect } from 'react';
import { Bell, RefreshCw, LogOut, User, Settings } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import authService from '../../services/authService';

const Header = ({ title = 'Dashboard' }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Format title to be more readable
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, ' ');

  // Load user profile on component mount and whenever currentUser changes
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setIsLoading(true);
        console.log("Current user from context:", currentUser);
        
        // First try to get user from localStorage via service
        const storedUser = authService.getCurrentUser();
        console.log("User from localStorage:", storedUser);
        
        if (storedUser) {
          console.log("Setting user profile from storage");
          setUserProfile(storedUser);
        } else if (authService.isAuthenticated()) {
          // If we have a token but no user data, try to fetch profile
          console.log("No user in storage but token exists, fetching profile");
          try {
            const profileData = await authService.getUserProfile();
            console.log("Profile data from API:", profileData);
            setUserProfile(profileData);
          } catch (error) {
            console.error("Error fetching profile:", error);
            // If we can't get the profile but have the current user from context, use that
            if (currentUser) {
              setUserProfile(currentUser);
            }
          }
        } else if (currentUser) {
          // Fallback to context user if available
          console.log("Using user from context");
          setUserProfile(currentUser);
        } else {
          console.log("No user data available");
          // If we're logged in but somehow don't have user data, create minimal profile
          const token = localStorage.getItem('userToken');
          if (token) {
            console.log("Creating minimal user profile from token");
            setUserProfile({
              name: "User",
              email: "user@example.com",
              role: "User"
            });
          }
        }
      } catch (error) {
        console.error("Error in loadUserProfile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [currentUser]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Use auth service for logout
    authService.logout();
    // Call logout from context
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  // For debugging - log user state
  console.log("Header render - Current user:", currentUser);
  console.log("Header render - User profile:", userProfile);

  // Determine user display name - try multiple sources
  const effectiveUser = userProfile || currentUser || {};
  const displayName = effectiveUser.full_name || effectiveUser.name || 'User';
  const userEmail = effectiveUser.email || 'user@example.com';
  const userRole = effectiveUser.role || 'Guest';

  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">{formattedTitle}</h1>
      
      <div className="flex items-center gap-4">
        <button 
          className="text-gray-600 hover:text-gray-900"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={18} />
        </button>
        
        <div className="relative">
          <button className="text-gray-600 hover:text-gray-900">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              3
            </span>
          </button>
        </div>
        
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="h-8 w-8 bg-gray-200 rounded-full overflow-hidden">
              <img 
                src={`https://ui-avatars.com/api/?name=${displayName}&background=random`}
                alt="User avatar" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{displayName}</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
            </div>
          </div>

          {/* User dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                <p className="font-medium">{displayName}</p>
                <p className="text-gray-500">{userEmail}</p>
                <p className="text-gray-500 text-xs mt-1">{userRole}</p>
              </div>
              <Link
                to="/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Settings className="mr-3 h-4 w-4" aria-hidden="true" />
                Settings
              </Link>
              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                <User className="mr-3 h-4 w-4" aria-hidden="true" />
                Your Profile
              </Link>
              <button
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-4 w-4" aria-hidden="true" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;