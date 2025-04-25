import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import Sidebar from "./pages/PlatformSetup/Sidebar";
import MainContent from "./pages/PlatformSetup/MainContent";
import Dashboard from "./pages/Dashboard/Dashboard";
import Campaign from "./pages/Campaign/Campaign";
import CampaignDetail from "./pages/CampaignDetail";
import Promoters from "./pages/Promoters/Promoters";
import { PromoterProfile } from "./pages/Promoters/components";
import Leads from "./pages/Leads/Leads";
import LeadDetail from "./pages/Leads/LeadDetail";
import AIAgent from "./pages/AIAgent/AIAgent";
import Payouts from "./pages/Payouts/Payouts";
import Help from "./pages/Help/Help";
import Setting from "./pages/Setting/Setting";
import ChatBot from "./components/ChatBot";
import { PromotersProvider } from "./contexts/PromotersContext";
import { PlatformSetupProvider } from "./contexts/PlatformSetupContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import LandingPage from "./pages/LandingPage/LandingPage";
import Header from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import authService from "./services/authService";
import useAuthCheck from "./hooks/useAuthCheck";
import "./App.css";

// Layout component to conditionally render Sidebar and Header
const AppLayout = ({ children }) => {
    const location = useLocation();
    const publicPaths = ["/", "/login", "/signup", "/logout"];
    const isPublicPath = publicPaths.includes(location.pathname);
    const { checking } = useAuthCheck();

    // Show loading indicator while checking auth
    if (!isPublicPath && checking) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div
            className={`${isPublicPath ? "" : "flex h-screen overflow-hidden"}`}
        >
            {!isPublicPath && (
                <>
                    <Sidebar />
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <Header
                            title={
                                location.pathname.substring(1) || "Dashboard"
                            }
                        />
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

// Auth state verification component
const AuthVerify = () => {
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                // Check if we have a token
                if (authService.isAuthenticated()) {
                    console.log("App - Auth verified, token is valid");
                } else {
                    // Try to refresh the token if it exists but might be invalid
                    const token = localStorage.getItem("userToken");
                    if (token) {
                        console.log(
                            "App - Token exists but may be invalid, attempting refresh"
                        );
                        const refreshed = await authService.refreshToken();
                        console.log("App - Token refresh result:", refreshed);
                    }
                }
            } catch (error) {
                console.error("Auth verification error:", error);
            }
        };

        verifyAuth();
    }, []);

    return null;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <PromotersProvider>
                    <PlatformSetupProvider>
                        <AuthVerify />
                        <AppLayout>
                            <Routes>
                                {/* Public routes */}
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/logout" element={<Logout />} />

                                {/* Protected routes */}
                                <Route
                                    path="/dashboard"
                                    element={
                                        <ProtectedRoute>
                                            <Dashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/platform-setup"
                                    element={
                                        <ProtectedRoute>
                                            <MainContent />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/campaign"
                                    element={
                                        <ProtectedRoute>
                                            <Campaign />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/campaigns/:id"
                                    element={
                                        <ProtectedRoute>
                                            <CampaignDetail />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/promoters"
                                    element={
                                        <ProtectedRoute>
                                            <Promoters />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/promoters/:id"
                                    element={
                                        <ProtectedRoute>
                                            <PromoterProfile />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/leads"
                                    element={
                                        <ProtectedRoute>
                                            <Leads />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/leads/:id"
                                    element={
                                        <ProtectedRoute>
                                            <LeadDetail />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/ai-agent"
                                    element={
                                        <ProtectedRoute>
                                            <AIAgent />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/settings"
                                    element={
                                        <ProtectedRoute>
                                            <Setting />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/help"
                                    element={
                                        <ProtectedRoute>
                                            <Help />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/payouts"
                                    element={
                                        <ProtectedRoute>
                                            <Payouts />
                                        </ProtectedRoute>
                                    }
                                />
                            </Routes>
                        </AppLayout>
                    </PlatformSetupProvider>
                </PromotersProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
