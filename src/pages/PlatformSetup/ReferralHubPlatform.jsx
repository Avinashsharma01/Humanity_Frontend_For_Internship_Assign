// Main App Component
import Sidebar from './Sidebar';
import MainContent from './MainContent';
function ReferralHubPlatform() {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <MainContent />
      </div>
    );
  }

export default ReferralHubPlatform;