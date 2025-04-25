import React, { useState } from "react";
import { X } from "lucide-react";
import authService from "../../../services/authService";

const AddPromoterModal = ({ isOpen, onClose, onSave }) => {
    const [activeTab, setActiveTab] = useState("manual");
    const [formData, setFormData] = useState({
        promoter_first_name: "",
        promoter_last_name: "",
        promoter_email: "",
        promoter_phno: "",
        cooldown_days: 60,
        promoter_type: "past",
        is_lead: true,
        is_onboarded: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Clear error when user types
        if (formErrors[name]) {
            setFormErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setError("");
        setFormErrors({});
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.promoter_first_name.trim()) {
            errors.promoter_first_name = "First name is required";
        }

        if (!formData.promoter_last_name.trim()) {
            errors.promoter_last_name = "Last name is required";
        }

        if (!formData.promoter_phno.trim()) {
            errors.promoter_phno = "Phone number is required";
        } else if (
            !/^\d{10,15}$/.test(formData.promoter_phno.replace(/\D/g, ""))
        ) {
            errors.promoter_phno = "Please enter a valid phone number";
        }

        if (!formData.promoter_email.trim()) {
            errors.promoter_email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.promoter_email)) {
            errors.promoter_email = "Please enter a valid email";
        }

        if (!formData.cooldown_days || formData.cooldown_days < 0) {
            errors.cooldown_days = "Please enter a valid cooldown period";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = async () => {
        // If we're in manual tab, create a promoter from form data
        if (activeTab === "manual") {
            // Validate the form
            if (!validateForm()) {
                return;
            }

            try {
                setLoading(true);
                setError("");

                // Prepare promoter data according to API requirements - already in the correct format
                const promoterData = {
                    promoter_first_name: formData.promoter_first_name,
                    promoter_last_name: formData.promoter_last_name,
                    promoter_email: formData.promoter_email,
                    promoter_phno: formData.promoter_phno,
                    cooldown_days: parseInt(formData.cooldown_days),
                    promoter_type: formData.promoter_type,
                    is_lead: formData.is_lead,
                    is_onboarded: formData.is_onboarded,
                };

                console.log("Creating promoter with data:", promoterData);

                // Check if token exists to avoid 401 errors
                const token = localStorage.getItem("userToken");
                console.log(
                    "Using token for authorization:",
                    token ? `${token.substring(0, 10)}...` : "No token found"
                );

                if (!token) {
                    setError("Authentication required. Please log in first.");
                    setLoading(false);
                    return;
                }

                // Call the API to create the promoter
                const response = await authService.createPromoter(promoterData);
                console.log("API response:", response);

                // Convert the response data to match onSave expected format if needed
                const newPromoter = {
                    id: response.id || response._id,
                    firstName: formData.promoter_first_name,
                    lastName: formData.promoter_last_name,
                    phone: formData.promoter_phno,
                    email: formData.promoter_email,
                    promoterType: formData.promoter_type,
                    isLead: formData.is_lead,
                    isOnboarded: formData.is_onboarded,
                };

                onSave([newPromoter]);
                onClose();
            } catch (err) {
                console.error("Error creating promoter:", err);

                // More detailed error handling
                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error("API Error Response:", err.response.data);
                    console.error("API Error Status:", err.response.status);

                    if (err.response.status === 401) {
                        setError("Authentication failed. Please log in again.");
                    } else if (err.response.data && err.response.data.detail) {
                        setError(err.response.data.detail);
                    } else {
                        setError(`Server error: ${err.response.status}`);
                    }
                } else if (err.request) {
                    // The request was made but no response was received
                    console.error("No response received:", err.request);
                    setError(
                        "No response from server. Please check your internet connection."
                    );
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setError(
                        err.message ||
                            "Failed to create promoter. Please try again."
                    );
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCancel = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-20 backdrop-blur-sm ">
            <div className="relative bg-white border qborder-gray-200 rounded-lg shadow-xl w-full max-w-xl mx-4">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-5 border-b">
                    <h3 className="text-lg font-medium">
                        Choose How You Want to Add Customers
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mx-6 mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
                        {error}
                    </div>
                )}

                {/* Tabs */}
                <div className="flex border-b">
                    <button
                        className={`py-4 px-6 text-center text-sm font-medium ${
                            activeTab === "manual"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500"
                        }`}
                        onClick={() => handleTabChange("manual")}
                    >
                        Add Manually
                    </button>
                    <button
                        className={`py-4 px-6 text-center text-sm font-medium ${
                            activeTab === "csv"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500"
                        }`}
                        onClick={() => handleTabChange("csv")}
                    >
                        Upload CSV File
                    </button>
                    <button
                        className={`py-4 px-6 text-center text-sm font-medium ${
                            activeTab === "zapier"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500"
                        }`}
                        onClick={() => handleTabChange("zapier")}
                    >
                        Sync with Zapier
                    </button>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === "manual" && (
                        <div className="space-y-4">
                            {/* First Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="promoter_first_name"
                                    value={formData.promoter_first_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter First Name"
                                    className={`w-full px-3 py-2 border ${
                                        formErrors.promoter_first_name
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } rounded-md`}
                                />
                                {formErrors.promoter_first_name && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {formErrors.promoter_first_name}
                                    </p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="promoter_last_name"
                                    value={formData.promoter_last_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter Last Name"
                                    className={`w-full px-3 py-2 border ${
                                        formErrors.promoter_last_name
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } rounded-md`}
                                />
                                {formErrors.promoter_last_name && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {formErrors.promoter_last_name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="promoter_phno"
                                    value={formData.promoter_phno}
                                    onChange={handleInputChange}
                                    placeholder="Enter Phone Number"
                                    className={`w-full px-3 py-2 border ${
                                        formErrors.promoter_phno
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } rounded-md`}
                                />
                                {formErrors.promoter_phno && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {formErrors.promoter_phno}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email ID{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="promoter_email"
                                    value={formData.promoter_email}
                                    onChange={handleInputChange}
                                    placeholder="Enter Email ID"
                                    className={`w-full px-3 py-2 border ${
                                        formErrors.promoter_email
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } rounded-md`}
                                />
                                {formErrors.promoter_email && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {formErrors.promoter_email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Promoter Type
                                </label>
                                <select
                                    name="promoter_type"
                                    value={formData.promoter_type}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="past">Past Customer</option>
                                    <option value="current">
                                        Current Customer
                                    </option>
                                    <option value="social">Social Media</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cooldown Days{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="cooldown_days"
                                    value={formData.cooldown_days}
                                    onChange={handleInputChange}
                                    placeholder="Enter Cooldown Days"
                                    className={`w-full px-3 py-2 border ${
                                        formErrors.cooldown_days
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } rounded-md`}
                                />
                                {formErrors.cooldown_days && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {formErrors.cooldown_days}
                                    </p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">
                                    Number of days before this promoter can
                                    refer again
                                </p>
                            </div>

                            <div className="flex space-x-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_lead"
                                        name="is_lead"
                                        checked={formData.is_lead}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-blue-600"
                                    />
                                    <label
                                        htmlFor="is_lead"
                                        className="ml-2 text-sm text-gray-700"
                                    >
                                        Is Lead
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_onboarded"
                                        name="is_onboarded"
                                        checked={formData.is_onboarded}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-blue-600"
                                    />
                                    <label
                                        htmlFor="is_onboarded"
                                        className="ml-2 text-sm text-gray-700"
                                    >
                                        Is Onboarded
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "csv" && (
                        <div className="text-center py-8">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mx-auto">
                                <div className="mx-auto w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />
                                    </svg>
                                </div>
                                <p className="text-lg font-medium text-gray-900 mb-1">
                                    Drag & drop your file here
                                </p>
                                <p className="text-sm text-gray-500 mb-4">
                                    or{" "}
                                    <span className="text-blue-500">
                                        browse
                                    </span>{" "}
                                    to upload
                                </p>
                                <p className="text-xs text-gray-400">
                                    Supported formats: CSV, Excel (XLS, XLSX)
                                </p>
                                <p className="text-xs text-gray-400">
                                    Maximum file size: 5MB
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === "zapier" && (
                        <div className="text-center py-8">
                            <img
                                src="https://cdn.zapier.com/zapier/images/logos/zapier-logo.svg"
                                alt="Zapier Logo"
                                className="w-16 h-16 mx-auto mb-4 opacity-80"
                            />
                            <h3 className="text-xl font-medium mb-2">
                                Connect with Zapier
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                Sync your contacts from other platforms by
                                connecting your Zapier account. This allows you
                                to import contacts from 3000+ apps.
                            </p>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition-colors">
                                Connect
                            </button>
                            <div className="mt-6 text-sm text-gray-500">
                                <p>
                                    Don't have a Zapier account?{" "}
                                    <a
                                        href="#"
                                        className="text-indigo-600 hover:underline"
                                    >
                                        Sign up for free
                                    </a>
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className={`px-4 py-2 border border-transparent rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 ${
                            loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPromoterModal;
