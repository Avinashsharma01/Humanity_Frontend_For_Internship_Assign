import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
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
          name: formData.name,
          email: formData.email,
          password: formData.password
        };
        
        // Make API call to backend
        const response = await fetch('https://humanity-server-rvd8.onrender.com/api/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registrationData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }
        
        // Store token in localStorage or context
        localStorage.setItem('userToken', data.token);
        
        // Call signup function from AuthContext with the user data
        await signup(data);
        
        // Redirect to dashboard upon successful signup
        navigate("/dashboard");
      } catch (error) {
        setSubmitError(error.message || "Failed to create an account. Please try again.");
        console.error(error);
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
          Register for <span className="text-black font-bold">ReferralHub</span>
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
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
              disabled={loading}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Email Id</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="robert.fox@myemail.com"
              className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Create Password */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Create Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
              disabled={loading}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
              disabled={loading}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Register Button */}
          <button 
            type="submit"
            className={`w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-medium py-2 rounded-md ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
            } mb-4`}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
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
