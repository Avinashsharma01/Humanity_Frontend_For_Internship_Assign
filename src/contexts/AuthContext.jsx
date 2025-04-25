import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    useRef,
    useCallback,
} from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

// Constants for localStorage keys to ensure consistency
const TOKEN_KEY = "userToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Ref to store interval ID for token refresh
    const tokenRefreshInterval = useRef(null);

    // Logout function (defined as useCallback to use in dependency array)
    const logout = useCallback(async () => {
        try {
            // Clear localStorage
            authService.logout();

            // Clear user state
            setCurrentUser(null);
            setIsAuthenticated(false);

            return true;
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    }, []);

    // Setup token refresh on initial load and when auth state changes
    useEffect(() => {
        const setupTokenRefresh = () => {
            // Clear any existing interval
            if (tokenRefreshInterval.current) {
                clearInterval(tokenRefreshInterval.current);
            }

            // Only setup refresh interval if the user is authenticated
            if (isAuthenticated) {
                // Check token validity every 4 minutes (access tokens typically expire in 5 minutes)
                tokenRefreshInterval.current = setInterval(async () => {
                    try {
                        // Use the authService to refresh token if needed
                        await authService.refreshToken();
                    } catch (error) {
                        console.error("Auto token refresh failed:", error);
                        // If refresh failed, log the user out
                        logout();
                    }
                }, 4 * 60 * 1000); // 4 minutes
            }
        };

        setupTokenRefresh();

        // Cleanup interval on unmount or auth state change
        return () => {
            if (tokenRefreshInterval.current) {
                clearInterval(tokenRefreshInterval.current);
            }
        };
    }, [isAuthenticated, logout]);

    // Check for existing auth on mount and initialize state
    useEffect(() => {
        const initAuth = async () => {
            try {
                // Check if token exists
                const hasToken = authService.isAuthenticated();

                if (hasToken) {
                    // Get user from localStorage
                    const storedUser = authService.getCurrentUser();

                    if (storedUser) {
                        setCurrentUser(storedUser);
                        setIsAuthenticated(true);
                        console.log(
                            "Auth initialized with user:",
                            storedUser.email
                        );
                        console.log(
                            "Token exists:",
                            !!localStorage.getItem(TOKEN_KEY)
                        );
                    } else {
                        // Try to fetch user profile if we have token but no stored user
                        try {
                            const userProfile =
                                await authService.getUserProfile();
                            if (userProfile) {
                                setCurrentUser(userProfile);
                                setIsAuthenticated(true);
                                console.log(
                                    "Auth initialized with fetched profile:",
                                    userProfile.email
                                );
                            } else {
                                // If we still can't get user data, remove token
                                authService.logout();
                                setIsAuthenticated(false);
                                console.log(
                                    "Auth init failed: No user profile found"
                                );
                            }
                        } catch (error) {
                            console.error(
                                "Error fetching user profile:",
                                error
                            );
                            // Invalid token, clear it
                            authService.logout();
                            setIsAuthenticated(false);
                            console.log(
                                "Auth init failed: Profile fetch error"
                            );
                        }
                    }
                } else {
                    setIsAuthenticated(false);
                    console.log("Auth init: No valid token found");
                }
            } catch (error) {
                console.error("Auth initialization error:", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    // Helper function to consistently store tokens across the app
    const storeTokens = (userData) => {
        if (!userData) return;

        // Store access token (handling different API response formats)
        if (userData.access) {
            localStorage.setItem(TOKEN_KEY, userData.access);
            console.log("Stored access token");
        } else if (userData.token) {
            localStorage.setItem(TOKEN_KEY, userData.token);
            console.log("Stored token");
        }

        // Store refresh token if available
        if (userData.refresh) {
            localStorage.setItem(REFRESH_TOKEN_KEY, userData.refresh);
            console.log("Stored refresh token");
        }
    };

    // Login function
    const login = async (userData) => {
        try {
            // Store tokens from the response consistently
            storeTokens(userData);

            // Store the received user data
            const user = {
                id:
                    userData._id ||
                    userData.id ||
                    userData.user?.id ||
                    "user-123",
                email: userData.email || userData.user?.email,
                full_name:
                    userData.full_name ||
                    userData.name ||
                    userData.user?.full_name ||
                    "User",
                name:
                    userData.name ||
                    userData.full_name ||
                    userData.user?.name ||
                    "User",
                role: userData.role || userData.user?.role || "User",
                phone: userData.phone || userData.user?.phone || "",
            };

            // Store user data in localStorage
            localStorage.setItem(USER_KEY, JSON.stringify(user));

            console.log("Auth context: Login successful for", user.email);
            console.log("Auth tokens after login:");
            console.log(
                "- Access token:",
                localStorage.getItem(TOKEN_KEY) ? "Set" : "Not set"
            );
            console.log(
                "- Refresh token:",
                localStorage.getItem(REFRESH_TOKEN_KEY) ? "Set" : "Not set"
            );

            setCurrentUser(user);
            setIsAuthenticated(true);
            return user;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    // Signup function
    const signup = async (userData) => {
        try {
            // Store tokens from the response consistently
            storeTokens(userData);

            // Store the received user data
            const user = {
                id:
                    userData._id ||
                    userData.id ||
                    userData.user?.id ||
                    "user-" + Date.now(),
                email: userData.email || userData.user?.email,
                full_name:
                    userData.full_name ||
                    userData.name ||
                    userData.user?.full_name ||
                    "New User",
                name:
                    userData.name ||
                    userData.full_name ||
                    userData.user?.name ||
                    "New User",
                role: userData.role || userData.user?.role || "BusinessOwner",
                phone: userData.phone || userData.user?.phone || "",
            };

            // Store user data in localStorage
            localStorage.setItem(USER_KEY, JSON.stringify(user));

            console.log("Auth context: Signup successful for", user.email);
            console.log("Auth tokens after signup:");
            console.log(
                "- Access token:",
                localStorage.getItem(TOKEN_KEY) ? "Set" : "Not set"
            );
            console.log(
                "- Refresh token:",
                localStorage.getItem(REFRESH_TOKEN_KEY) ? "Set" : "Not set"
            );

            setCurrentUser(user);
            setIsAuthenticated(true);
            return user;
        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        }
    };

    // Context value
    const value = {
        currentUser,
        isAuthenticated,
        loading,
        login,
        logout,
        signup,
        // Expose helper function to allow explicit token updates from other components
        updateTokens: storeTokens,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;
