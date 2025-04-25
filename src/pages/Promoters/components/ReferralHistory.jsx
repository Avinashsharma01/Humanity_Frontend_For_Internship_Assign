import React, { useState } from "react";
import { Search, Filter } from "lucide-react";

const ReferralHistory = ({ promoterId }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Mock referral data - in a real app, this would be fetched from an API based on promoterId
    const referrals = [
        {
            id: 1,
            person: "Emery Dokidis",
            date: "28-4-2024",
            reward: "$20",
            status: "Completed",
        },
        {
            id: 2,
            person: "Kadin Lipshutz",
            date: "27-5-2024",
            reward: "$20",
            status: "Completed",
        },
        {
            id: 3,
            person: "Pending",
            date: "29-5-2024",
            reward: "—",
            status: "Pending",
        },
        {
            id: 4,
            person: "Jaxson Vaccaro",
            date: "30-6-2024",
            reward: "$20",
            status: "Completed",
        },
        {
            id: 5,
            person: "Pending",
            date: "01-7-2024",
            reward: "—",
            status: "Pending",
        },
        {
            id: 6,
            person: "Maren Septimus",
            date: "03-7-2024",
            reward: "$20",
            status: "Completed",
        },
        {
            id: 7,
            person: "Haylie Saris",
            date: "05-7-2024",
            reward: "$20",
            status: "Completed",
        },
        {
            id: 8,
            person: "Pending",
            date: "10-7-2024",
            reward: "—",
            status: "Pending",
        },
    ];

    // Filter referrals based on search term
    const filteredReferrals = searchTerm
        ? referrals.filter(
              (referral) =>
                  referral.person
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                  referral.date
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                  referral.status
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
          )
        : referrals;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Referral History</h3>

            {/* Search and filter bar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search referrals"
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

            {/* Referrals table */}
            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Person
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Reward
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredReferrals.map((referral) => (
                            <tr key={referral.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {referral.person}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {referral.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {referral.reward}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            referral.status === "Completed"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}
                                    >
                                        {referral.status}
                                    </span>
                                </td>
                            </tr>
                        ))}

                        {filteredReferrals.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-6 py-8 text-center text-gray-500"
                                >
                                    No referrals found matching your search
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

export default ReferralHistory;
