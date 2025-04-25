import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import authService from "../services/authService";

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        role: "BusinessOwner", // Default role
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            });
        }

        // Clear submit error
        if (submitError) {
            setSubmitError("");
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name) {
            newErrors.name = "Name is required";
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        // Confirm password validation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        // Phone validation
        if (!formData.phone) {
            newErrors.phone = "Phone number is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                setLoading(true);

                // Prepare registration data
                const registrationData = {
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                    full_name: formData.name,
                    phone: formData.phone,
                };

                console.log("Registration data:", registrationData);

                // Use auth service for registration
                const responseData = await authService.register(
                    registrationData
                );

                console.log("Signup response in component:", responseData);

                // Important: Explicitly log in after registration to ensure proper token handling
                try {
                    console.log(
                        "Attempting automatic login after registration"
                    );
                    const loginResponse = await authService.login({
                        email: formData.email,
                        password: formData.password,
                    });

                    console.log(
                        "Auto-login after registration successful:",
                        loginResponse
                    );

                    // Get the updated user data from the login response
                    const userData = {
                        ...loginResponse,
                        // If API returns user object, use its properties
                        ...(loginResponse.user || {}),
                        // Ensure these fields exist from our form
                        email: loginResponse.user?.email || formData.email,
                        full_name:
                            loginResponse.user?.full_name || formData.name,
                        name: loginResponse.user?.name || formData.name,
                        role: loginResponse.user?.role || formData.role,
                        phone: loginResponse.user?.phone || formData.phone,
                    };

                    // Call signup function from AuthContext with the updated user data
                    await signup(userData);
                } catch (loginError) {
                    console.error(
                        "Auto-login after registration failed:",
                        loginError
                    );
                    // Continue with the original registration data if login fails
                    const userData = {
                        ...responseData,
                        // If API returns user object, use its properties
                        ...(responseData.user || {}),
                        // Ensure these fields exist from our form
                        email: responseData.user?.email || formData.email,
                        full_name:
                            responseData.user?.full_name || formData.name,
                        name: responseData.user?.name || formData.name,
                        role: responseData.user?.role || formData.role,
                        phone: responseData.user?.phone || formData.phone,
                    };

                    await signup(userData);
                }

                // Log token status after signup/login
                console.log("Authentication state after signup/login:", {
                    user: localStorage.getItem("user"),
                    token: localStorage.getItem("userToken"),
                    tokenExists: !!localStorage.getItem("userToken"),
                });

                // Redirect to dashboard upon successful signup
                navigate("/dashboard");
            } catch (error) {
                console.error("Signup error:", error);
                setSubmitError(
                    error.message ||
                        "Failed to create an account. Please try again."
                );
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSocialSignup = (provider) => {
        // In a real app, you would implement social signup here
        // For this demo, we'll just simulate a successful signup
        signup({ email: `${provider}@example.com`, password: "password" });
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb] px-4">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-300">
                {/* Title */}
                <h2 className="text-center text-lg font-semibold mb-6 text-gray-700">
                    Register for{" "}
                    <span className="text-black font-bold">ReferralHub</span>
                </h2>

                {/* Error Message */}
                {submitError && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
                        {submitError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={`w-full px-3 py-2 border ${
                                errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                            disabled={loading}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">
                            Email Id
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="robert.fox@myemail.com"
                            className={`w-full px-3 py-2 border ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                            disabled={loading}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className={`w-full px-3 py-2 border ${
                                errors.phone
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                            disabled={loading}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* Role Selection */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">
                            Select Role
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                            disabled={loading}
                        >
                            <option value="BusinessOwner">
                                Business Owner
                            </option>
                            <option value="Customer">Customer</option>
                            <option value="Marketer">Marketer</option>
                        </select>
                    </div>

                    {/* Create Password */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">
                            Create Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            className={`w-full px-3 py-2 border ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                            disabled={loading}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label className="block text-sm text-gray-600 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter password"
                            className={`w-full px-3 py-2 border ${
                                errors.confirmPassword
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
                            disabled={loading}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className={`w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-medium py-2 rounded-md ${
                            loading
                                ? "opacity-70 cursor-not-allowed"
                                : "hover:opacity-90"
                        } mb-4`}
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-sm text-gray-500">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Social Icons */}
                <div className="flex justify-center space-x-6 text-xl text-gray-600 mb-4">
                    <FcGoogle
                        className="cursor-pointer"
                        onClick={() => handleSocialSignup("google")}
                    />
                    <FaFacebookF
                        className="text-[#1877F2] cursor-pointer"
                        onClick={() => handleSocialSignup("facebook")}
                    />
                    <FaXTwitter
                        className="cursor-pointer"
                        onClick={() => handleSocialSignup("twitter")}
                    />
                    <FaLinkedinIn
                        className="text-[#0077B5] cursor-pointer"
                        onClick={() => handleSocialSignup("linkedin")}
                    />
                </div>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
