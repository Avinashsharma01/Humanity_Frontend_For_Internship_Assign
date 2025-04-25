import React from "react";
import { Eye, Trash2 } from "lucide-react";

const CampaignCard = ({ campaign, onDelete }) => {
    // Extract campaign data with appropriate fallbacks
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    // Format large numbers for better readability
    const formatNumber = (number) => {
        if (!number) return "0";
        return new Intl.NumberFormat().format(number);
    };

    // Format percentage values
    const formatPercentage = (value) => {
        if (!value) return "0%";
        return `${value}%`;
    };

    // Check if campaign is active
    const isCampaignActive = (endDate) => {
        if (!endDate) return false;
        const today = new Date();
        const campaignEndDate = new Date(endDate);
        return campaignEndDate >= today;
    };

    const isActive = isCampaignActive(campaign.campaign_end_date);
    const status = isActive ? "Active" : "Inactive";
    const statusColor = isActive
        ? "bg-green-100 text-green-800"
        : "bg-gray-100 text-gray-800";
    const dateRange = `${formatDate(
        campaign.campaign_start_date
    )} - ${formatDate(campaign.campaign_end_date)}`;

    return (
        <div className="bg-white rounded-lg border shadow-sm mb-6">
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
                        className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${statusColor}`}
                    >
                        {status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-3 divide-x border-b">
                <div className="p-4 text-center">
                    <p className="text-sm text-gray-600">Promoters</p>
                    <p className="text-2xl font-bold mt-1">
                        {formatNumber(campaign.promoterCount || 0)}
                    </p>
                </div>
                <div className="p-4 text-center">
                    <p className="text-sm text-gray-600">Reward Points</p>
                    <p className="text-2xl font-bold mt-1">
                        {formatNumber(campaign.promoter_reward_points || 0)}
                    </p>
                </div>
                <div className="p-4 text-center">
                    <p className="text-sm text-gray-600">Lead Discount</p>
                    <p className="text-2xl font-bold mt-1">
                        {formatPercentage(campaign.lead_reward_discount || 0)}
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
                    onClick={() => onDelete(campaign._id || campaign.id)}
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
};

export default CampaignCard;
