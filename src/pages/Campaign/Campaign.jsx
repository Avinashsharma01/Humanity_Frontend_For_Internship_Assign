import React, { useState, useEffect } from "react";
import { Eye, Trash2, Plus, Search, Filter } from "lucide-react";
import CreateCampaignModal from "./components/CreateCampaignModal";
import { PastPromoters, NewPromoters, NewLeads } from "./components";
import { campaignService } from "../../services";

function Campaign() {
    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch campaigns on component mount
    useEffect(() => {
        fetchCampaigns();
    }, []);

    // Fetch all campaigns from API
    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await campaignService.getAllCampaigns();
            setCampaigns(data || []);
        } catch (err) {
            console.error("Error fetching campaigns:", err);
            setError("Failed to load campaigns. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Filter campaigns based on search term
    const filteredCampaigns = campaigns.filter((campaign) =>
        campaign.campaign_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Count active campaigns
    const activeCampaignsCount = campaigns.filter((campaign) => {
        const today = new Date();
        const endDate = new Date(campaign.campaign_end_date);
        return endDate >= today;
    }).length;

    const handleCreateCampaign = async (campaignData) => {
        try {
            setLoading(true);
            await campaignService.createCampaign(campaignData);
            // After successful creation, fetch the updated list of campaigns
            await fetchCampaigns();
            // Close the modal
            setIsCreateModalOpen(false);
        } catch (err) {
            console.error("Error creating campaign:", err);
            alert("Failed to create campaign. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCampaign = async (campaignId) => {
        if (window.confirm("Are you sure you want to delete this campaign?")) {
            try {
                setLoading(true);
                await campaignService.deleteCampaign(campaignId);
                await fetchCampaigns();
            } catch (err) {
                console.error("Error deleting campaign:", err);
                alert("Failed to delete campaign. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Render the appropriate tab content
    const renderTabContent = () => {
        switch (activeTab) {
            case "past":
                return <PastPromoters onDelete={handleDeleteCampaign} />;
            case "new":
                return <NewPromoters />;
            case "leads":
                return <NewLeads />;
            case "all":
                return renderCampaignList();
            default:
                return renderCampaignList();
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    // Check if campaign is active
    const isCampaignActive = (endDate) => {
        if (!endDate) return false;
        const today = new Date();
        const campaignEndDate = new Date(endDate);
        return campaignEndDate >= today;
    };

    // Render the main campaign list
    const renderCampaignList = () => {
        if (loading && campaigns.length === 0) {
            return (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <p className="text-gray-500">Loading campaigns...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <p className="text-red-500">{error}</p>
                    <button
                        onClick={fetchCampaigns}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCampaigns.map((campaign) => {
                        const isActive = isCampaignActive(
                            campaign.campaign_end_date
                        );
                        const dateRange = `${formatDate(
                            campaign.campaign_start_date
                        )} - ${formatDate(campaign.campaign_end_date)}`;

                        return (
                            <div
                                key={campaign._id || campaign.id}
                                className="bg-white rounded-lg border shadow-sm"
                            >
                                <div className="p-5 border-b">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1 pr-3">
                                            <h3 className="text-xl font-semibold truncate">
                                                {campaign.campaign_name}
                                            </h3>
                                            <p className="text-gray-600 text-sm mt-1">
                                                {dateRange}
                                            </p>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                                                isActive
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {isActive ? "Active" : "Inactive"}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 divide-x border-b">
                                    <div className="p-4 text-center">
                                        <p className="text-sm text-gray-600">
                                            Promoters
                                        </p>
                                        <p className="text-2xl font-bold mt-1">
                                            {campaign.promoterCount || "0"}
                                        </p>
                                    </div>
                                    <div className="p-4 text-center">
                                        <p className="text-sm text-gray-600">
                                            Reward Points
                                        </p>
                                        <p className="text-2xl font-bold mt-1">
                                            {campaign.promoter_reward_points ||
                                                "0"}
                                        </p>
                                    </div>
                                    <div className="p-4 text-center">
                                        <p className="text-sm text-gray-600">
                                            Lead Discount
                                        </p>
                                        <p className="text-2xl font-bold mt-1">
                                            {campaign.lead_reward_discount ||
                                                "0"}
                                        </p>
                                    </div>
                                </div>

                                {campaign.campaign_description && (
                                    <div className="p-4 bg-blue-50 border-b">
                                        <p className="text-sm text-gray-700">
                                            {campaign.campaign_description}
                                        </p>
                                    </div>
                                )}

                                <div className="p-4 flex justify-between">
                                    <button
                                        className="text-red-600 hover:text-red-800 flex items-center"
                                        onClick={() =>
                                            handleDeleteCampaign(
                                                campaign._id || campaign.id
                                            )
                                        }
                                    >
                                        <Trash2 size={18} className="mr-1" />
                                        <span>Delete</span>
                                    </button>
                                    <button className="text-gray-600 hover:text-gray-900 flex items-center">
                                        <Eye size={18} className="mr-1" />
                                        <span>View</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredCampaigns.length === 0 && !loading && !error && (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                            No campaigns found
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Create your first campaign to get started
                        </p>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Create Campaign
                        </button>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="flex-1 overflow-auto bg-gray-50">
            <div className="p-6">
                {/* Header with title */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">
                        Create & Manage Referral Campaigns
                    </h1>
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 mb-6">
                    <button
                        className={`px-4 py-2 rounded text-sm font-medium ${
                            activeTab === "all"
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveTab("all")}
                    >
                        All Campaigns
                    </button>
                    <button
                        className={`px-4 py-2 rounded text-sm font-medium ${
                            activeTab === "past"
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveTab("past")}
                    >
                        Past Promoters
                    </button>
                    <button
                        className={`px-4 py-2 rounded text-sm font-medium ${
                            activeTab === "new"
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveTab("new")}
                    >
                        New Promoters
                    </button>
                    <button
                        className={`px-4 py-2 rounded text-sm font-medium ${
                            activeTab === "leads"
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveTab("leads")}
                    >
                        New Leads
                    </button>
                </div>

                {/* Action and filter bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm text-gray-500 mb-1">
                            Active Campaigns
                        </p>
                        <p className="text-2xl font-bold">
                            {activeCampaignsCount}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search campaigns"
                                className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-auto"
                                value={searchTerm}
                                onChange={handleSearch}
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

                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => setIsCreateModalOpen(true)}
                            disabled={loading}
                        >
                            <Plus size={16} />
                            Create Campaign
                        </button>
                    </div>
                </div>

                {/* Main content area */}
                {renderTabContent()}
            </div>

            {/* Create Campaign Modal */}
            <CreateCampaignModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreateCampaign={handleCreateCampaign}
            />
        </div>
    );
}

export default Campaign;
