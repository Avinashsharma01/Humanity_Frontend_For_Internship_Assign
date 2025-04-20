import { useState } from 'react';
import { Settings, HelpCircle, Layout, Cpu, BarChart2, Users, FileText, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Left Sidebar Component
function Sidebar() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('Platform Setup');
    
  const menuItems = [
    { name: 'Platform Setup', icon: <Layout size={20} />, path: '/platform-setup' },
    { name: 'AI Agent', icon: <Cpu size={20} />, path: '/ai-agent' },
    { name: 'Dashboard', icon: <BarChart2 size={20} />, path: '/dashboard' },
    { name: 'Campaign', icon: <BarChart2 size={20} />, path: '/campaign' },
    { name: 'Promoters', icon: <Users size={20} />, path: '/promoters' },
    { name: 'Leads', icon: <Users size={20} />, path: '/leads' },
    { name: 'Payouts', icon: <CreditCard size={20} />, path: '/payouts' }
  ];
    
  const bottomMenuItems = [
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    { name: 'Help', icon: <HelpCircle size={20} />, path: '/help' }
  ];

  return (
    <div className="w-64 border-r bg-white shadow-sm h-full flex flex-col">
      
      <div className="p-5 border-b flex justify-between items-center">
        <div className="text-lg font-bold text-blue-600 logo" onClick={() => navigate('/')} >ReferralHub</div>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {menuItems.map((item, index) => (
          <Link 
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-3 cursor-pointer menu-item-${index} ${activeItem === item.name ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
            onClick={() => setActiveItem(item.name)}
          >
            <div className={`mr-3 ${activeItem === item.name ? 'text-blue-600' : 'text-gray-500'}`}>
              {item.icon}
            </div>
            <span className={activeItem === item.name ? 'font-medium text-blue-600' : 'text-gray-700'}>
              {item.name}
            </span>
          </Link>
        ))}
      </div>
      
      <div className="border-t">
        {bottomMenuItems.map((item, index) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-3 cursor-pointer bottom-menu-item-${index} hover:bg-gray-50`}
          >
            <div className="mr-3 text-gray-500">
              {item.icon}
            </div>
            <span className="text-gray-700">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;