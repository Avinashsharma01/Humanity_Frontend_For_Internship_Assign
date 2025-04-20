import React from 'react';
import { Pencil } from 'lucide-react';

const User_Profile = () => {
  // Mock user data
  const userData = {
    name: 'Avinash Sharma',
    email: 'avinashsharma@gmail.com',
    phone: '6201693634',
    password: '********'
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-900">Profile</h2>
        <div className="relative">
          <img 
            src="https://randomuser.me/api/portraits/men/52.jpg" 
            alt="Profile" 
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full shadow-sm">
            <Pencil size={14} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {/* User Name */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">User Name</span>
            <button className="text-blue-600">
              <Pencil className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-1 text-base text-gray-800">{userData.name}</div>
        </div>

        {/* User Phone */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">User Phone</span>
          </div>
          <div className="mt-1 text-base text-gray-800">{userData.phone}</div>
        </div>

        {/* Email */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Email</span>
          </div>
          <div className="mt-1 text-base text-gray-800">{userData.email}</div>
        </div>

        {/* Password */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Password</span>
            <button className="text-sm text-blue-600 px-4 py-2 border border-blue-600 rounded-md">
              Change Password
            </button>
          </div>
          <div className="mt-1 text-base text-gray-800">{userData.password}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 mb-4 flex justify-center space-x-4">
        <button className="px-6 py-3 border border-red-500 text-red-500 rounded-md text-sm font-medium hover:bg-red-50 transition-colors">
          Delete Account
        </button>
        <button className="px-6 py-3 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default User_Profile;