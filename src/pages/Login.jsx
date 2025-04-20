import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Get the page they were trying to access before being redirected to login
  const from = location.state?.from?.pathname || "/dashboard";
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    // Clear error when user types
    if (error) setError("");
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }
    
    try {
      setLoading(true);
      setError("");
      
      // Make API call to backend login endpoint
      const response = await fetch('https://humanity-server-rvd8.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Store token in localStorage
      localStorage.setItem('userToken', data.token);
      
      // Call login function from AuthContext with the user data
      await login(data);
      
      // Redirect to the page they were trying to access or dashboard
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Failed to log in. Please check your credentials.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSocialLogin = (provider) => {
    // In a real app, you would implement social login here
    // For this demo, we'll just simulate a successful login
    login({ email: `${provider}@example.com`, password: "password" });
    navigate(from, { replace: true });
  };
  
  const handleMagicLink = () => {
    // For demo, we'll just simulate a successful login
    if (formData.magicEmail) {
      login({ email: formData.magicEmail });
      navigate(from, { replace: true });
    } else {
      setError("Please enter your email for magic link login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb] px-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-200">
        {/* Title */}
        <h2 className="text-center text-lg font-semibold mb-6 text-gray-700">
          Login to <span className="text-black font-bold">ReferralHub</span>
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
            {error}
          </div>
        )}

        {/* Continue with Google/Microsoft */}
        <button 
          className="w-full border border-blue-400 text-blue-500 font-medium py-2 rounded-md hover:bg-blue-50 mb-6"
          onClick={() => handleSocialLogin("google")}
          disabled={loading}
        >
          Continue with Google/Microsoft
        </button>

        <form onSubmit={handleSubmit}>
          {/* Magic Link */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Magic Link Login
            </label>
            <input
              type="email"
              name="magicEmail"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              disabled={loading}
            />
          </div>
          <button 
            type="button"
            className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-medium py-2 rounded-md hover:opacity-90 mb-4"
            onClick={handleMagicLink}
            disabled={loading}
          >
            Send Magic Link
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Email and Password */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="robert.fox@myemail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              disabled={loading}
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-sm text-gray-600">
              <input 
                type="checkbox" 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2" 
                disabled={loading}
              />
              Remember Me
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className={`w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-medium py-2 rounded-md ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
            } mb-4`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
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
            onClick={() => handleSocialLogin("google")} 
          />
          <FaFacebookF 
            className="text-[#1877F2] cursor-pointer" 
            onClick={() => handleSocialLogin("facebook")} 
          />
          <FaXTwitter 
            className="cursor-pointer" 
            onClick={() => handleSocialLogin("twitter")} 
          />
          <FaLinkedinIn 
            className="text-[#0077B5] cursor-pointer" 
            onClick={() => handleSocialLogin("linkedin")} 
          />
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
