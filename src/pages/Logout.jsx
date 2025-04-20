import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        navigate('/login', { replace: true });
      } catch (error) {
        console.error('Error during logout:', error);
        navigate('/login', { replace: true });
      }
    };
    
    performLogout();
  }, [logout, navigate]);
  
  // This component doesn't render anything visible
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl">Logging you out...</p>
        <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    </div>
  );
};

export default Logout; 