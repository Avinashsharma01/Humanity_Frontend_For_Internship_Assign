import { Upload, ArrowLeft } from 'lucide-react';

// Customer Data Form Component (Right side of content)
function CustomerDataForm({ onSubmit, initialData = {} }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we'd collect form data here
    onSubmit({ customerData: { ...initialData, completed: true } });
  };

  const handleBack = () => {
    // Go back to previous step (0)
    // This should be handled by the parent component
    // We'd typically send a different action or navigate to the previous step
    onSubmit({ customerData: { ...initialData, goBack: true } });
  };

  return (
    <div className="w-2/3">
      <div className="mb-6 flex items-center">
        <button 
          onClick={handleBack}
          className="mr-3 text-gray-500 hover:text-blue-600 flex items-center"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-lg font-medium">Import Customer Data: Sync with Zapier or Upload CSV</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <button type="button" className="w-full bg-white border rounded-md py-2.5 text-blue-600 hover:bg-blue-50">
            Connect with Zapier
          </button>
          
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <div className="mx-4 text-sm text-gray-500">or</div>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <div className="w-full border-2 border-dashed border-gray-300 rounded-md p-10 flex flex-col items-center justify-center bg-white">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
              <Upload size={24} />
            </div>
            <p className="text-sm mb-1">Drag and drop files here</p>
            <div className="flex items-center my-2">
              <div className="mx-4 text-sm text-gray-500">or</div>
            </div>
            <button type="button" className="border rounded-md py-2 px-4 text-blue-600 hover:bg-blue-50">
              Click to Upload CSV File
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <button 
            type="button"
            onClick={handleBack}
            className="w-1/4 bg-white border border-blue-500 text-blue-600 py-3 rounded hover:bg-blue-50 transition"
          >
            Back
          </button>
          <button 
            type="submit"
            className="w-3/4 bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default CustomerDataForm;