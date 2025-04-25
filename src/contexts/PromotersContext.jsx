/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-undef */
import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

// Import API_URL from apiClient
import { API_URL } from "../services/apiClient";

// Create context
const PromotersContext = createContext();

// Provider component
export const PromotersProvider = ({ children }) => {
    // State for promoter data
    const [promotersData, setPromotersData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Mock interaction data - in a real app, this would be fetched from an API
    const [interactionsData, setInteractionsData] = useState({
        1: [
            {
                id: 1,
                date: "2024-07-10T14:30:00",
                type: "note",
                content:
                    "Initial onboarding call completed. Very enthusiastic about the program.",
            },
        ],
        2: [
            {
                id: 1,
                date: "2024-07-05T11:00:00",
                type: "note",
                content:
                    "Expressed interest in the premium tier of our referral program.",
            },
            {
                id: 2,
                date: "2024-07-08T13:20:00",
                type: "call",
                content:
                    "Discussed strategy for approaching enterprise clients.",
            },
            {
                id: 3,
                date: "2024-07-14T15:30:00",
                type: "email",
                content:
                    "Sent additional materials on enterprise pricing and benefits.",
            },
        ],
        3: [
            {
                id: 1,
                date: "2024-06-28T10:00:00",
                type: "note",
                content:
                    "Has been inactive for the past month. Need to re-engage.",
            },
            {
                id: 2,
                date: "2024-07-01T09:15:00",
                type: "email",
                content: "Sent re-engagement email with new incentives.",
            },
            {
                id: 3,
                date: "2024-07-07T14:00:00",
                type: "call",
                content:
                    "No answer. Left voicemail about new campaign opportunities.",
            },
        ],
    });

    // Mock promoters data for development and testing
    const mockPromotersData = [
        {
            id: 1,
            name: "Sarah Johnson",
            email: "sarah.j@example.com",
            phone: "(555) 123-4567",
            status: "Active",
            joinDate: "2024-06-15T10:30:00",
            lastActive: "2024-07-22T15:45:00",
            contact: "(555) 123-4567",
            leads: 5,
            conversion: "60%",
            lastFollowUp: "July 20, 2024",
            revenue: "$1,250",
            earnings: { total: 1250, pending: 350, paid: 900 },
            referrals: [
                {
                    id: 101,
                    name: "John Smith",
                    status: "converted",
                    date: "2024-06-20T14:22:00",
                },
                {
                    id: 102,
                    name: "Emma Davis",
                    status: "pending",
                    date: "2024-07-05T09:15:00",
                },
            ],
        },
        {
            id: 2,
            name: "Michael Wong",
            email: "michael.w@example.com",
            phone: "(555) 987-6543",
            status: "Active",
            joinDate: "2024-05-10T13:45:00",
            lastActive: "2024-07-21T10:20:00",
            contact: "(555) 987-6543",
            leads: 8,
            conversion: "75%",
            lastFollowUp: "July 18, 2024",
            revenue: "$2,800",
            earnings: { total: 2800, pending: 500, paid: 2300 },
            referrals: [
                {
                    id: 103,
                    name: "Amanda Lee",
                    status: "converted",
                    date: "2024-05-25T11:30:00",
                },
                {
                    id: 104,
                    name: "David Chen",
                    status: "converted",
                    date: "2024-06-12T16:40:00",
                },
                {
                    id: 105,
                    name: "Lisa Park",
                    status: "pending",
                    date: "2024-07-10T14:05:00",
                },
            ],
        },
        {
            id: 3,
            name: "Jessica Martinez",
            email: "jessica.m@example.com",
            phone: "(555) 234-5678",
            status: "Inactive",
            joinDate: "2024-04-05T09:15:00",
            lastActive: "2024-05-28T16:30:00",
            contact: "(555) 234-5678",
            leads: 2,
            conversion: "50%",
            lastFollowUp: "May 25, 2024",
            revenue: "$750",
            earnings: { total: 750, pending: 0, paid: 750 },
            referrals: [
                {
                    id: 106,
                    name: "Robert Kim",
                    status: "converted",
                    date: "2024-04-20T08:50:00",
                },
            ],
        },
    ];

    // Function to fetch promoters from API
    const fetchPromoters = async () => {
        setLoading(true);
        try {
            console.log("Fetching promoters data...");
            // Get token for authentication
            const token = localStorage.getItem("userToken");
            console.log("Token available:", !!token);

            // Use authService to fetch promoters data
            const promotersData = await authService.getPromoters();
            console.log("Received promoters data:", promotersData);

            if (promotersData && Array.isArray(promotersData)) {
                // Format data for the application according to the new API model
                const formattedData = promotersData.map((promoter) => ({
                    id: promoter.id || promoter._id,
                    name:
                        `${promoter.promoter_first_name || ""} ${
                            promoter.promoter_last_name || ""
                        }`.trim() || "Unknown",
                    email: promoter.promoter_email || "No email",
                    phone: promoter.promoter_phno || "No phone",
                    contact: promoter.promoter_phno || "No phone",
                    status: determineStatus(promoter),
                    joinDate: promoter.created_at || new Date().toISOString(),
                    lastActive:
                        promoter.last_active_at || new Date().toISOString(),
                    leads: promoter.leads_count || 0,
                    conversion: promoter.conversion_rate || "0%",
                    lastFollowUp:
                        formatDate(promoter.last_followup_at) || "N/A",
                    revenue: formatCurrency(promoter.revenue_generated || 0),
                    earnings: {
                        total: promoter.total_earnings || 0,
                        pending: promoter.pending_earnings || 0,
                        paid: promoter.paid_earnings || 0,
                    },
                    referrals: promoter.referrals || [],
                    promoterType: promoter.promoter_type || "past",
                    isLead: promoter.is_lead || false,
                    isOnboarded: promoter.is_onboarded || false,
                    cooldownDays: promoter.cooldown_days || 60,
                }));

                setPromotersData(formattedData);
                setError(null);
            } else {
                console.error(
                    "Invalid promoters data format received:",
                    promotersData
                );
                setPromotersData([]);
                setError("Failed to retrieve valid promoters data");
            }
        } catch (error) {
            console.error("Error fetching promoters:", error);

            // Provide user-friendly error messages
            if (error.response) {
                console.error(
                    "API response error:",
                    error.response.status,
                    error.response.data
                );
                setError(
                    `Server error: ${error.response.status} - ${
                        error.response.data.message || "Unknown error"
                    }`
                );
            } else if (error.request) {
                console.error("No response received from server");
                setError(
                    "No response received from server. Please check your internet connection."
                );
            } else {
                console.error("Error setting up request:", error.message);
                setError(`Error: ${error.message}`);
            }

            // In development mode, provide mock data
            if (process.env.NODE_ENV === "development") {
                console.log("Using mock data in development mode");
                setPromotersData(mockPromotersData);
            } else {
                setPromotersData([]);
            }
        } finally {
            setLoading(false);
        }
    };

    // Helper functions for formatting data
    const formatDate = (dateString) => {
        if (!dateString) return null;
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch (error) {
            console.error("Error formatting date:", error);
            return dateString;
        }
    };

    const formatCurrency = (amount) => {
        if (amount === undefined || amount === null) return "$0";
        try {
            return `$${parseFloat(amount).toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            })}`;
        } catch (error) {
            console.error("Error formatting currency:", error);
            return `$${amount}`;
        }
    };

    const determineStatus = (promoter) => {
        // Logic to determine the promoter status based on API data
        if (promoter.status) return promoter.status;
        if (promoter.is_onboarded === false) return "Pending";
        if (promoter.is_active === false) return "Inactive";
        if (promoter.promoter_type === "past") return "Completed";
        return "Active";
    };

    const addPromoter = async (newPromoters) => {
        const formattedPromoters = newPromoters.map((promoter, index) => {
            const newId =
                promotersData.length > 0
                    ? Math.max(...promotersData.map((p) => p.id)) + index + 1
                    : index + 1;
            return {
                id: promoter.id || newId,
                name: `${promoter.firstName} ${promoter.lastName}`,
                contact: promoter.phone || "N/A",
                email: promoter.email,
                phone: promoter.phone || "N/A",
                leads: 0,
                conversion: "0%",
                lastFollowUp: "N/A",
                revenue: "$0",
                status: determineStatusFromNew(promoter),
                contactInfo: {
                    memberSince: new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }),
                    location: "Not specified",
                    timeZone: "Not specified",
                },
                isLead: promoter.isLead || false,
                isOnboarded: promoter.isOnboarded || false,
                promoterType: promoter.promoterType || "past",
                cooldownDays: promoter.cooldownDays || 60,
            };
        });

        setPromotersData((prevData) => [...prevData, ...formattedPromoters]);

        // Optionally trigger a refresh after short delay to get full data from API
        setTimeout(() => {
            fetchPromoters();
        }, 2000);
    };

    const determineStatusFromNew = (promoter) => {
        if (!promoter.isOnboarded) return "Pending";
        if (promoter.promoterType === "past") return "Completed";
        return "Active";
    };

    const getPromoterById = (id) => {
        return (
            promotersData.find((promoter) => promoter.id === parseInt(id)) ||
            null
        );
    };

    const getPromoterInteractions = (id) => {
        return interactionsData[id] || [];
    };

    const addInteraction = (promoterId, interaction) => {
        const newId = interactionsData[promoterId]
            ? Math.max(...interactionsData[promoterId].map((i) => i.id)) + 1
            : 1;

        const newInteraction = {
            id: newId,
            date: new Date().toISOString(),
            type: interaction.type,
            content: interaction.content,
        };

        setInteractionsData((prev) => ({
            ...prev,
            [promoterId]: [...(prev[promoterId] || []), newInteraction],
        }));

        return newInteraction;
    };

    // Initialize data when component mounts
    useEffect(() => {
        fetchPromoters();
    }, []);

    // Value to be provided by the context
    const value = {
        promotersData,
        loading,
        error,
        fetchPromoters,
        setPromotersData,
        addPromoter,
        getPromoterById,
        getPromoterInteractions,
        addInteraction,
    };

    return (
        <PromotersContext.Provider value={value}>
            {children}
        </PromotersContext.Provider>
    );
};

// Custom hook for using the context
export const usePromoters = () => {
    const context = useContext(PromotersContext);
    if (!context) {
        throw new Error("usePromoters must be used within a PromotersProvider");
    }
    return context;
};

export default PromotersContext;
