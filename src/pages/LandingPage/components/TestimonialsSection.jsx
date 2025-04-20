import React from 'react';

const TestimonialCard = ({ image, name, role, quote }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img className="h-12 w-12 rounded-full" src={image} alt={name} />
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-bold text-gray-900">{name}</h4>
          <p className="text-md text-gray-500">{role}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-600">
        "{quote}"
      </p>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Wilson",
      role: "Marketing Director, TechCorp",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      quote: "We saw a 40% increase in customer acquisition after implementing this referral platform. The analytics and insights helped us optimize our campaigns and improve ROI significantly."
    },
    {
      name: "James Anderson",
      role: "Founder, Startup Hub",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      quote: "As a startup, we needed an affordable yet powerful way to grow. This platform delivered beyond our expectations, with easy setup and fantastic customer support throughout our journey."
    }
  ];

  return (
    <div className="bg-gray-50 py-16 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What our customers say
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Don't just take our word for it. Hear from some of our amazing customers who have achieved great results with our platform.
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index}
                  name={testimonial.name}
                  role={testimonial.role}
                  image={testimonial.image}
                  quote={testimonial.quote}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection; 