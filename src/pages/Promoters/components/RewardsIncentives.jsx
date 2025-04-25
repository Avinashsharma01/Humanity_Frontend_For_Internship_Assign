/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Search, Filter } from "lucide-react";

const RewardsIncentives = ({ promoterId }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Static data matching the screenshot
    const rewardsHistory = [
        {
            id: 1,
            earnedOn: "Mar 30, 2025",
            rewardType: "Discount Coupon",
            value: "20% Off",
            status: "Claimed",
            redeemedOn: "Mar 31, 2025",
        },
        {
            id: 2,
            earnedOn: "Mar 25, 2025",
            rewardType: "Cash Bonus",
            value: "$50",
            status: "Claimed",
            redeemedOn: "Mar 26, 2025",
        },
        {
            id: 3,
            earnedOn: "Mar 20, 2025",
            rewardType: "Cash Bonus",
            value: "$25",
            status: "Pending",
            redeemedOn: "—",
        },
        {
            id: 4,
            earnedOn: "Mar 19, 2025",
            rewardType: "Cash Bonus",
            value: "$25",
            status: "Claimed",
            redeemedOn: "Mar 19, 2025",
        },
        {
            id: 5,
            earnedOn: "Mar 15, 2025",
            rewardType: "Cash Bonus",
            value: "$25",
            status: "Pending",
            redeemedOn: "—",
        },
        {
            id: 6,
            earnedOn: "Mar 10, 2025",
            rewardType: "Cash Bonus",
            value: "$50",
            status: "Claimed",
            redeemedOn: "Mar 12, 2025",
        },
        {
            id: 7,
            earnedOn: "Mar 08, 2025",
            rewardType: "Discount Coupon",
            value: "20% Off",
            status: "Claimed",
            redeemedOn: "Mar 09, 2025",
        },
        {
            id: 8,
            earnedOn: "Mar 05, 2025",
            rewardType: "Discount Coupon",
            value: "20% Off",
            status: "Pending",
            redeemedOn: "—",
        },
    ];

    // Filter rewards based on search term
    const filteredRewards = rewardsHistory.filter(
        (reward) =>
            reward.rewardType
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            reward.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reward.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reward.earnedOn.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">
                Rewards & Incentives History
            </h3>

            {/* Search and filter bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search rewards"
                        className="w-full pl-10 pr-4 py-2 border rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-md">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                </button>
            </div>

            {/* Rewards table */}
            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Earned On
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Reward Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Value
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Redeemed On
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredRewards.map((reward) => (
                            <tr key={reward.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {reward.earnedOn}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {reward.rewardType}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {reward.value}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            reward.status === "Claimed"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {reward.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {reward.redeemedOn}
                                </td>
                            </tr>
                        ))}

                        {filteredRewards.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-8 text-center text-gray-500"
                                >
                                    No rewards found matching your search
                                    criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RewardsIncentives;
