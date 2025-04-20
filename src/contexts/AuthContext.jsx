import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('userToken');
    if (storedUser && token) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (userData) => {
    try {
      // Store the received user data
      const user = {
        id: userData._id || 'user-123',
        email: userData.email,
        name: userData.name || 'User',
        token: userData.token
      };
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      // Token is already stored in localStorage by the login component
      
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // For a real implementation with backend logout endpoint:
      // const response = await fetch('http://localhost:5000/api/user/logout', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      //   }
      // });
      
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('userToken');
      
      // Clear user state
      setCurrentUser(null);
      
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      // Store the received user data
      const user = {
        id: userData._id || 'user-' + Date.now(),
        email: userData.email,
        name: userData.name || 'New User',
        token: userData.token
      };
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      // Token is already stored in localStorage by the signup component
      
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    signup,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 