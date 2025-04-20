import React from 'react';
import { Globe, Zap, Shield, MessageCircle } from 'lucide-react';

const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className="relative">
      <dt>
        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
          {icon}
        </div>
        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{title}</p>
      </dt>
      <dd className="mt-2 ml-16 text-base text-gray-500">
        {description}
      </dd>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      title: 'Global Reach',
      description: 'Connect with customers and promoters worldwide. Our platform supports multiple languages and currencies for global campaigns.',
      icon: <Globe className="h-6 w-6" />
    },
    {
      title: 'Quick Setup',
      description: 'Get started in minutes, not days. Our intuitive interface and templates make it easy to launch your first campaign quickly.',
      icon: <Zap className="h-6 w-6" />
    },
    {
      title: 'Fraud Protection',
      description: 'Advanced fraud detection and prevention systems ensure the authenticity of your referrals and protect your rewards budget.',
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: 'Multi-channel Promotion',
      description: 'Promote your referral program across email, social media, SMS, and website widgets to maximize participation and visibility.',
      icon: <MessageCircle className="h-6 w-6" />
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our comprehensive platform offers all the tools you need to create, manage, and optimize your referral marketing campaigns.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <FeatureItem 
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection; 