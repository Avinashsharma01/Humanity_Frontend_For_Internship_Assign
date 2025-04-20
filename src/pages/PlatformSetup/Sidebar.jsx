import { useState, useEffect } from 'react';
import { Settings, HelpCircle, Layout, Cpu, BarChart2, Users, FileText, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Joyride, { STATUS } from 'react-joyride';

// Left Sidebar Component
function Sidebar() {
  const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('Platform Setup');
    const [runTour, setRunTour] = useState(false);
    const [steps, setSteps] = useState([]);
    
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

    // Set up Joyride steps
    useEffect(() => {
      const tourSteps = [
        {
          target: '.logo',
          content: 'Welcome to ReferralHub! This is your all-in-one platform for managing referral campaigns.',
          disableBeacon: true,
        },
        ...menuItems.map((item, index) => ({
          target: `.menu-item-${index}`,
          content: getStepContent(item.name),
        })),
        ...bottomMenuItems.map((item, index) => ({
          target: `.bottom-menu-item-${index}`,
          content: getStepContent(item.name),
        })),
      ];
      setSteps(tourSteps);
      
      // Check localStorage to see if the tour has been completed before
      const tourCompleted = localStorage.getItem('joyrideCompleted');
      if (!tourCompleted) {
        setRunTour(true);
      }
    }, []);

    // Get content for each step based on the menu item name
    const getStepContent = (itemName) => {
      switch(itemName) {
        case 'Platform Setup':
          return 'Setup your platform, including campaign templates, reward structures, and integration settings.';
        case 'AI Agent':
          return 'Hey there! I’m (Bot Name) , your AI agent. This is where I live — your go-to space to ask anything, generate campaigns, or get help filling out forms. I’m always just a click away!';
        case 'Dashboard':
          return 'Get a quick overview of your platform’s performance. View recent activities, monitor key analytics and stay updated on what’s working—all in real-time.';
        case 'Campaign':
          return 'Create and manage campaigns with ease. Set rewards, define messages, and personalize journeys for both referrers and referred users.';
        case 'Promoters':
          return 'Manage your customer database. View profiles, referral history, engagement levels, and import or sync customer lists from external sources like CSV or Zapier.';
        case 'Leads':
          return 'Here, you’ll see a list of all the people who were referred by promoters and have filled out the lead form. You can view the follow-up messages.';
        case 'Payouts':
          return 'Manage rewards and payments to your promoters based on their campaign performance.';
        case 'Settings':
          return 'Configure your account settings, notification preferences, and integration options.';
        case 'Help':
          return 'Access help resources, tutorials, and contact support if you need assistance.';
        default:
          return `This is the ${itemName} section of ReferralHub.`;
      }
    };

    // Handle tour callbacks
    const handleJoyrideCallback = (data) => {
      const { status } = data;
      if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
        // Mark the tour as completed in localStorage
        localStorage.setItem('joyrideCompleted', 'true');
        setRunTour(false);
      }
    };

    // Function to manually start the tour
    const startTour = () => {
      setRunTour(true);
    };
    
    return (
      <div className="w-64 border-r bg-white shadow-sm h-full flex flex-col">
        <Joyride
          steps={steps}
          run={runTour}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          callback={handleJoyrideCallback}
          styles={{
            options: {
              primaryColor: '#3b82f6', // Blue to match theme
              zIndex: 10000,
            }
          }}
        />
        
        <div className="p-5 border-b flex justify-between items-center">
          <div className="text-lg font-bold text-blue-600 logo" onClick={() => navigate('/')} >ReferralHub</div>
          <button 
            onClick={startTour} 
            className="text-xs text-blue-500 hover:text-blue-700"
            title="Start Tour"
          >
            <HelpCircle size={16} />
          </button>
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