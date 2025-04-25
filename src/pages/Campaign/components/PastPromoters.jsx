import React from "react";
import { Eye, Trash2 } from "lucide-react";

const PastPromoters = ({ onDelete = () => {} }) => {
    // Sample data for campaigns
    const campaigns = [
        {
            id: 1,
            name: "Summer Referral Program",
            status: "Active",
            dateRange: "5/31/2024 - 8/30/2024",
            referrals: "245",
            conversion: "32%",
            roi: "287%",
            aiSuggestion:
                "Increase reward by 10% to boost conversion rates during peak season",
        },
        {
            id: 2,
            name: "Early Bird Special",
            status: "Inactive",
            dateRange: "8/20/2024 - 9/19/2024",
            referrals: "300",
            conversion: "40%",
            roi: "320%",
            aiSuggestion:
                "Extend your campaign! Strong engagement suggests higher conversions with more time.",
        },
        {
            id: 3,
            name: "Holiday Promotion",
            status: "Active",
            dateRange: "11/20/2024 - 12/31/2024",
            referrals: "127",
            conversion: "28%",
            roi: "215%",
            aiSuggestion:
                "Consider offering a tiered reward structure to incentivize multiple referrals.",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
                <div
                    key={campaign.id}
                    className="bg-white rounded-lg border shadow-sm"
                >
                    <div className="p-5 border-b">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold">
                                    {campaign.name}
                                </h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    {campaign.dateRange}
                                </p>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                    campaign.status === "Active"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                            >
                                {campaign.status}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 divide-x border-b">
                        <div className="p-4 text-center">
                            <p className="text-sm text-gray-600">Referrals</p>
                            <p className="text-2xl font-bold mt-1">
                                {campaign.referrals}
                            </p>
                        </div>
                        <div className="p-4 text-center">
                            <p className="text-sm text-gray-600">Conversion</p>
                            <p className="text-2xl font-bold mt-1">
                                {campaign.conversion}
                            </p>
                        </div>
                        <div className="p-4 text-center">
                            <p className="text-sm text-gray-600">ROI</p>
                            <p className="text-2xl font-bold mt-1">
                                {campaign.roi}
                            </p>
                        </div>
                    </div>

                    {campaign.aiSuggestion && (
                        <div className="p-4 bg-blue-50 border-b flex items-start">
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-white text-xs">AI</span>
                            </div>
                            <p className="text-sm text-gray-700">
                                {campaign.aiSuggestion}
                            </p>
                        </div>
                    )}

                    <div className="p-4 flex justify-between">
                        <button
                            className="text-red-600 hover:text-red-800 flex items-center"
                            onClick={() => onDelete(campaign.id)}
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
            ))}
        </div>
    );
};

export default PastPromoters;
