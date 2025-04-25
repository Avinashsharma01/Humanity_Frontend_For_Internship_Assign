import React, { useState } from "react";
import { Calendar, X, Plus } from "lucide-react";

const CreateCampaignModal = ({ isOpen, onClose, onCreateCampaign }) => {
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    const [campaignData, setCampaignData] = useState({
        campaign_name: "",
        campaign_description: "",
        campaign_start_date: today,
        campaign_end_date: today,
        promoter_reward_points: 100,
        lead_reward_discount: "10",
        target_promoter_type: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaignData({
            ...campaignData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert reward points to number
        const formattedData = {
            ...campaignData,
            promoter_reward_points: Number(campaignData.promoter_reward_points),
        };

        onCreateCampaign(formattedData);

        // Reset form
        setCampaignData({
            campaign_name: "",
            campaign_description: "",
            campaign_start_date: today,
            campaign_end_date: today,
            promoter_reward_points: 100,
            lead_reward_discount: "10",
            target_promoter_type: "",
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white border border-gray-200 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <div>
                        <h2 className="text-xl font-semibold">
                            Create New Campaign
                        </h2>
                        <p className="text-sm text-gray-500">
                            Create a new referral campaign in just a few steps.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Campaign Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Campaign Name*
                        </label>
                        <input
                            type="text"
                            name="campaign_name"
                            value={campaignData.campaign_name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="e.g., Summer Referral Special"
                            required
                        />
                    </div>

                    {/* Campaign Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Campaign Description
                        </label>
                        <textarea
                            name="campaign_description"
                            value={campaignData.campaign_description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Describe the purpose and goals of this campaign"
                        />
                    </div>

                    {/* Campaign Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date*
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="campaign_start_date"
                                    value={campaignData.campaign_start_date}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    required
                                />
                                <Calendar
                                    size={18}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Date*
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="campaign_end_date"
                                    value={campaignData.campaign_end_date}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    required
                                />
                                <Calendar
                                    size={18}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Reward Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Promoter Reward Points*
                            </label>
                            <input
                                type="number"
                                name="promoter_reward_points"
                                value={campaignData.promoter_reward_points}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="e.g., 100"
                                required
                                min="1"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Points rewarded to promoters for successful
                                referrals
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lead Reward Discount*
                            </label>
                            <input
                                type="text"
                                name="lead_reward_discount"
                                value={campaignData.lead_reward_discount}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                placeholder="e.g., 10%"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Discount offered to new leads who sign up
                            </p>
                        </div>
                    </div>

                    {/* Target Promoter Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Target Promoter Type
                        </label>
                        <input
                            type="text"
                            name="target_promoter_type"
                            value={campaignData.target_promoter_type}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="e.g., Influencer, Customer, Partner"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Type of promoters you want to target
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md flex items-center"
                        >
                            <Plus size={16} className="mr-1" />
                            Create Campaign
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCampaignModal;
