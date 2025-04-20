import { Settings, HelpCircle, Layout, Cpu, BarChart2, Users, FileText, CreditCard, Check } from 'lucide-react';
// Setup Steps Component (Left side of content)
function SetupSteps({ steps, currentStep, onChange }) {
    return (
      <div className="w-1/4 pr-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-blue-600">Get Started with ReferralHub</h2>
          <p className="text-sm text-gray-600 mt-1">
            To get started with better referrals & rewards, complete your account setup in a few easy steps.
          </p>
        </div>
        
        <div className="border-t my-4"></div>
        
        {steps.map((step) => (
          <div 
            key={step.id} 
            className="flex items-center mb-6 cursor-pointer" 
            onClick={() => {
              // Only allow navigation to completed steps or the current step
              if (step.id <= currentStep || step.completed) {
                onChange(step.id);
              }
            }}
          >
            {step.completed ? (
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-3">
                <Check size={16} />
              </div>
            ) : (
              <div className={`w-8 h-8 rounded-full border-2 ${currentStep === step.id ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 text-gray-400'} flex items-center justify-center mr-3`}>
                <span className="text-sm">{step.id + 1}</span>
              </div>
            )}
            <div>
              <div className={`font-medium ${currentStep === step.id ? 'text-blue-600' : ''}`}>{step.title}</div>
              <div className={`text-sm ${currentStep === step.id ? 'text-blue-600' : 'text-gray-500'}`}>
                {step.completed ? 'Completed' : (currentStep === step.id ? 'In Progress' : 'Not Started')}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

export default SetupSteps;