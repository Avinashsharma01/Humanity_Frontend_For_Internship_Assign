import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './pages/PlatformSetup/Sidebar';
import MainContent from './pages/PlatformSetup/MainContent';
import Dashboard from './pages/Dashboard/Dashboard';
import Campaign from './pages/Campaign/Campaign';
import CampaignDetail from './pages/CampaignDetail';
import Promoters from './pages/Promoters/Promoters';
import { PromoterProfile } from './pages/Promoters/components';
import Leads from './pages/Leads/Leads';
import LeadDetail from './pages/Leads/LeadDetail';
import AIAgent from './pages/AIAgent/AIAgent';
import Payouts from './pages/Payouts/Payouts';
import Help from './pages/Help/Help';
import Setting from './pages/Setting/Setting';
import ChatBot from './components/ChatBot';
import { PromotersProvider } from './contexts/PromotersContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import LandingPage from './pages/LandingPage/LandingPage';
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

// Layout component to conditionally render Sidebar and Header
const AppLayout = ({ children }) => {
  const location = useLocation();
  const publicPaths = ['/', '/login', '/signup', '/logout'];
  const isPublicPath = publicPaths.includes(location.pathname);

  return (
    <div className={`${isPublicPath ? '' : 'flex h-screen overflow-hidden'}`}>
      {!isPublicPath && (
        <>
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header title={location.pathname.substring(1) || 'Dashboard'} />
            <main className="flex-1 relative overflow-y-auto focus:outline-none">
              {children}
            </main>
          </div>
          <ChatBot />
        </>
      )}
      {isPublicPath && children}
    </div>
  ); 
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <PromotersProvider>
          <AppLayout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/platform-setup" element={
                <ProtectedRoute>
                  <MainContent />
                </ProtectedRoute>
              } />
              <Route path="/campaign" element={
                <ProtectedRoute>
                  <Campaign />
                </ProtectedRoute>
              } />
              <Route path="/campaigns/:id" element={
                <ProtectedRoute>
                  <CampaignDetail />
                </ProtectedRoute>
              } />
              <Route path="/promoters" element={
                <ProtectedRoute>
                  <Promoters />
                </ProtectedRoute>
              } />
              <Route path="/promoters/:id" element={
                <ProtectedRoute>
                  <PromoterProfile />
                </ProtectedRoute>
              } />
              <Route path="/leads" element={
                <ProtectedRoute>
                  <Leads />
                </ProtectedRoute>
              } />
              <Route path="/leads/:id" element={
                <ProtectedRoute>
                  <LeadDetail />
                </ProtectedRoute>
              } />
              <Route path="/ai-agent" element={
                <ProtectedRoute>
                  <AIAgent />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Setting />
                </ProtectedRoute>
              } />
              <Route path="/help" element={
                <ProtectedRoute>
                  <Help />
                </ProtectedRoute>
              } />
              <Route path="/payouts" element={
                <ProtectedRoute>
                  <Payouts />
                </ProtectedRoute>
              } />
            </Routes>
          </AppLayout>
        </PromotersProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;