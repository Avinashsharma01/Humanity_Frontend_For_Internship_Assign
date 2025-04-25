/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
    Search,
    Filter,
    Eye,
    MessageSquare,
    ChevronDown,
    Plus,
    Users,
    BarChart,
    DollarSign,
    RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddPromoterModal from "./components/AddPromoterModal";
import { usePromoters } from "../../contexts/PromotersContext";
import authService from "../../services/authService";

function Promoters() {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [tokenChecked, setTokenChecked] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    // Use the promoter context with loading and error states
    const { promotersData, loading, error, fetchPromoters, addPromoter } =
        usePromoters();

    // Check for authentication token
    const isAuthenticated = localStorage.getItem("userToken") !== null;

    // Check token validity and try to refresh if needed
    useEffect(() => {
        const verifyAuthentication = async () => {
            try {
                const token = localStorage.getItem("userToken");
                const refreshToken = localStorage.getItem("refreshToken");

                if (!token && !refreshToken) {
                    console.log("No authentication tokens found");
                    setTokenChecked(true);
                    return;
                }

                if (!token && refreshToken) {
                    // Try to refresh the token
                    console.log("Access token missing, trying to refresh");
                    const success = await authService.refreshToken();

                    if (success) {
                        console.log("Token refreshed successfully");
                        // This will trigger the promoters fetch via the dependency array
                        setTokenChecked(true);
                    } else {
                        console.log("Token refresh failed");
                        setTokenChecked(true);
                    }
                } else {
                    // We have a token, verify it
                    try {
                        await authService.verifyToken();
                        console.log("Token verified successfully");
                        setTokenChecked(true);
                    } catch (err) {
                        console.log(
                            "Token verification failed, trying to refresh"
                        );
                        const success = await authService.refreshToken();
                        if (!success) {
                            console.log(
                                "Token refresh also failed, user needs to re-login"
                            );
                        }
                        setTokenChecked(true);
                    }
                }
            } catch (err) {
                console.error("Authentication verification error:", err);
                setTokenChecked(true);
            }
        };

        verifyAuthentication();
    }, []);

    // Fetch promoters once token is checked
    useEffect(() => {
        let isMounted = true;

        const loadPromoters = async () => {
            if (tokenChecked && isAuthenticated && isMounted && !loading) {
                console.log(
                    "[DEBUG Promoters.jsx] Initial promoters fetch triggered"
                );
                try {
                    await fetchPromoters();
                    console.log(
                        "[DEBUG Promoters.jsx] After fetchPromoters call, data length:",
                        promotersData.length
                    );
                } catch (err) {
                    console.error(
                        "[DEBUG Promoters.jsx] Error in loadPromoters:",
                        err
                    );
                }
            }
        };

        loadPromoters();

        // Cleanup function to prevent state updates after unmount
        return () => {
            isMounted = false;
        };
    }, [tokenChecked, isAuthenticated, fetchPromoters, retryCount]);

    // Filter promoters based on search query
    const filteredPromoters = searchQuery
        ? promotersData.filter((promoter) => {
              const searchLower = searchQuery.toLowerCase();
              return (
                  promoter.name.toLowerCase().includes(searchLower) ||
                  promoter.email.toLowerCase().includes(searchLower) ||
                  (promoter.contact &&
                      promoter.contact.toLowerCase().includes(searchLower))
              );
          })
        : promotersData;

    // Debug promoters data
    useEffect(() => {
        console.log("[DEBUG Promoters.jsx] promotersData changed:", {
            count: promotersData.length,
            loading,
            error,
        });
    }, [promotersData, loading, error]);

    // Stats cards data
    const statsCards = [
        {
            title: "Total Customers",
            value: promotersData.length.toString(),
            change: "+12%",
            period: "vs last month",
            icon: <Users className="text-gray-600" size={20} />,
        },
        {
            title: "New Customers",
            value: "94",
            change: "+8%",
            period: "vs last month",
            icon: <Users className="text-gray-600" size={20} />,
        },
        {
            title: "Average Conversion rate",
            value: "64%",
            change: "-3%",
            period: "vs last month",
            icon: <BarChart className="text-gray-600" size={20} />,
        },
        {
            title: "Total Revenue Generated",
            value: "$23,900",
            change: "+15%",
            period: "vs last month",
            icon: <DollarSign className="text-gray-600" size={20} />,
        },
    ];

    // Reset selected rows when promoters data changes
    useEffect(() => {
        setSelectedRows([]);
    }, [promotersData]);

    const handleToggleSelectAll = () => {
        if (selectedRows.length === filteredPromoters.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(filteredPromoters.map((promoter) => promoter.id));
        }
    };

    const handleToggleSelectRow = (id) => {
        setSelectedRows((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((rowId) => rowId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSavePromoter = (promoters) => {
        // Use the addPromoter function from context
        addPromoter(promoters);
        setIsModalOpen(false);
    };

    const handleViewProfile = (promoterId) => {
        navigate(`/promoters/${promoterId}`);
    };

    const handleRefresh = () => {
        if (!loading) {
            console.log("Manual refresh triggered");
            fetchPromoters();
        } else {
            console.log("Refresh button clicked while loading, ignoring");
        }
    };

    const handleRetry = () => {
        // Increment retry count to trigger useEffect
        setRetryCount((prev) => prev + 1);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="flex-1 overflow-auto bg-gray-50">
            <div className="p-6">
                {/* Title */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">
                        Manage and monitor your promoter referral activities
                    </h1>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-4 mb-8">
                    <button
                        className="bg-blue-500 text-white flex items-center gap-2 px-4 py-2 rounded"
                        onClick={handleOpenModal}
                    >
                        <Plus size={16} />
                        New Promoter
                    </button>
                    <button className="border border-blue-500 text-blue-500 px-5 py-2 rounded">
                        Ask Past Customers For Referrals
                    </button>
                    <button
                        className={`border border-gray-300 text-gray-600 flex items-center gap-2 px-4 py-2 rounded ${
                            loading
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-100"
                        }`}
                        onClick={handleRefresh}
                        disabled={loading}
                    >
                        <RefreshCw
                            size={16}
                            className={loading ? "animate-spin" : ""}
                        />
                        Refresh
                    </button>
                </div>

                {/* Error message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
                        {error}
                        {error.includes("Authentication") && (
                            <div className="mt-2">
                                <p className="text-sm">
                                    You need to log in before accessing
                                    promoters.
                                </p>
                                <button
                                    className="mt-1 text-blue-600 font-medium hover:underline"
                                    onClick={() => navigate("/login")}
                                >
                                    Go to login page
                                </button>
                            </div>
                        )}
                        {!error.includes("Authentication") && (
                            <button
                                className="ml-2 text-red-700 font-medium hover:underline"
                                onClick={handleRetry}
                                disabled={loading}
                            >
                                Try again
                            </button>
                        )}
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    {statsCards.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-5 flex items-start shadow-sm"
                        >
                            <div className="p-2 rounded-full bg-gray-100 mr-3">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">
                                    {stat.title}
                                </p>
                                <h3 className="text-2xl font-bold">
                                    {stat.value}
                                </h3>
                                <p className="text-sm text-green-500">
                                    {stat.change}{" "}
                                    <span className="text-gray-400">
                                        {stat.period}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Promoters Section */}
                <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-xl font-medium">Promoters</h2>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={handleSearch}
                                className="pl-10 pr-4 py-2 border rounded-md"
                            />
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-gray-700">
                            <Filter size={16} />
                            Filter
                        </button>
                    </div>
                </div>

                {/* Promoters Table */}
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                    {!isAuthenticated ? (
                        <div className="py-20 text-center">
                            <div className="inline-block p-3 rounded-full bg-yellow-100">
                                <Users size={30} className="text-yellow-500" />
                            </div>
                            <h3 className="mt-3 text-lg font-medium text-gray-900">
                                Authentication Required
                            </h3>
                            <p className="mt-2 text-gray-600">
                                You need to log in to view and manage promoters
                            </p>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                onClick={() => navigate("/login")}
                            >
                                Go to Login
                            </button>
                        </div>
                    ) : loading && promotersData.length === 0 ? (
                        <div className="py-20 text-center">
                            <div className="inline-block p-3 rounded-full bg-blue-50">
                                <RefreshCw
                                    size={30}
                                    className="animate-spin text-blue-500"
                                />
                            </div>
                            <p className="mt-3 text-gray-600">
                                Loading promoters...
                            </p>
                            <p className="mt-1 text-sm text-gray-400">
                                Debug info: Data length {promotersData.length}
                            </p>
                        </div>
                    ) : promotersData.length === 0 && !error ? (
                        <div className="py-20 text-center">
                            <div className="inline-block p-3 rounded-full bg-gray-100">
                                <Users size={30} className="text-gray-400" />
                            </div>
                            <p className="mt-3 text-gray-600">
                                No promoters found
                            </p>
                            <button
                                className="mt-2 text-blue-500 hover:underline"
                                onClick={handleOpenModal}
                            >
                                Add your first promoter
                            </button>
                        </div>
                    ) : promotersData.length > 0 ? (
                        <div className="overflow-x-auto">
                            <p className="p-2 text-xs text-gray-500 bg-gray-50">
                                Showing {filteredPromoters.length} promoters{" "}
                                {loading && " (Refreshing...)"}
                            </p>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-3.5 text-left">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        selectedRows.length ===
                                                            filteredPromoters.length &&
                                                        filteredPromoters.length >
                                                            0
                                                    }
                                                    onChange={
                                                        handleToggleSelectAll
                                                    }
                                                    className="mr-2"
                                                />
                                                <span className="text-xs font-medium text-gray-500 uppercase">
                                                    Promoter Name
                                                </span>
                                            </div>
                                        </th>
                                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                            Contact No.
                                        </th>
                                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                            Leads
                                        </th>
                                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                            Conversion Rate
                                        </th>
                                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                            Last Follow-Up
                                        </th>
                                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                            Revenue Generated
                                        </th>
                                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                            Referrer Status
                                        </th>
                                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredPromoters.map((promoter) => (
                                        <tr
                                            key={promoter.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-4">
                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(
                                                            promoter.id
                                                        )}
                                                        onChange={() =>
                                                            handleToggleSelectRow(
                                                                promoter.id
                                                            )
                                                        }
                                                        className="mr-2"
                                                    />
                                                    <span className="font-medium text-gray-900">
                                                        {promoter.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500">
                                                {promoter.contact}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500">
                                                {promoter.leads}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500">
                                                {promoter.conversion}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500">
                                                {promoter.lastFollowUp}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500">
                                                {promoter.revenue}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs ${
                                                        promoter.status ===
                                                        "Active"
                                                            ? "bg-blue-50 text-blue-600"
                                                            : promoter.status ===
                                                              "Completed"
                                                            ? "bg-green-50 text-green-600"
                                                            : "bg-orange-50 text-orange-600"
                                                    }`}
                                                >
                                                    {promoter.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        className="text-gray-500 hover:text-gray-700 relative group"
                                                        onClick={() =>
                                                            handleViewProfile(
                                                                promoter.id
                                                            )
                                                        }
                                                    >
                                                        <Eye size={16} />
                                                        <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                                                            View profile
                                                        </div>
                                                    </button>
                                                    <button className="text-gray-500 hover:text-gray-700 relative group">
                                                        <MessageSquare
                                                            size={16}
                                                        />
                                                        <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                                                            Send follow-up
                                                            message
                                                        </div>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Add Promoter Modal */}
            <AddPromoterModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSavePromoter}
            />
        </div>
    );
}

export default Promoters;
