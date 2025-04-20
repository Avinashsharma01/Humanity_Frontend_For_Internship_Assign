import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PricingPlan = ({ title, description, price, features, buttonText, buttonLink }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
      <div className="p-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900">{title}</h2>
        <p className="mt-4 text-sm text-gray-500">{description}</p>
        <p className="mt-8">
          <span className="text-4xl font-extrabold text-gray-900">${price}</span>
          <span className="text-base font-medium text-gray-500">/mo</span>
        </p>
        <Link to={buttonLink} className="mt-8 block w-full bg-blue-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700">
          {buttonText}
        </Link>
      </div>
      <div className="pt-6 pb-8 px-6">
        <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
        <ul className="mt-6 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex space-x-3">
              <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
              <span className="text-sm text-gray-500">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const PricingSection = () => {
  const pricingPlans = [
    {
      title: "Starter",
      description: "Perfect for small businesses just getting started with referral marketing.",
      price: "25",
      buttonText: "Start your trial",
      buttonLink: "/signup",
      features: [
        "Up to 1,000 referrals/month",
        "Basic analytics",
        "Email support"
      ]
    },
    {
      title: "Professional",
      description: "For growing businesses with more advanced needs.",
      price: "99",
      buttonText: "Start your trial",
      buttonLink: "/signup",
      features: [
        "Up to 10,000 referrals/month",
        "Advanced analytics",
        "Priority email support",
        "Custom reward options"
      ]
    },
    {
      title: "Enterprise",
      description: "For large organizations with custom requirements.",
      price: "299",
      buttonText: "Contact sales",
      buttonLink: "/contact",
      features: [
        "Unlimited referrals",
        "Advanced fraud detection",
        "Dedicated account manager",
        "Custom integration options",
        "API access"
      ]
    }
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Pricing</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Simple, transparent pricing
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Start with our free trial. No credit card required.
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingPlan
              key={index}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              buttonText={plan.buttonText}
              buttonLink={plan.buttonLink}
              features={plan.features}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection; 