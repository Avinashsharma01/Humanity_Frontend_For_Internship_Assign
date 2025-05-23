import React from 'react';

const TrustedBySection = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
          Trusted by over 5,000+ businesses
        </p>
        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img className="h-12 opacity-60 hover:opacity-100 transition-opacity" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img className="h-12 opacity-60 hover:opacity-100 transition-opacity" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage" />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img className="h-12 opacity-60 hover:opacity-100 transition-opacity" src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg" alt="StaticKit" />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
            <img className="h-12 opacity-60 hover:opacity-100 transition-opacity" src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg" alt="Transistor" />
          </div>
          <div className="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
            <img className="h-12 opacity-60 hover:opacity-100 transition-opacity" src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg" alt="Workcation" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBySection; 