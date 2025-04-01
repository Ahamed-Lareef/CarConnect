import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaShieldAlt, FaLeaf, FaStar, FaCog } from 'react-icons/fa';

const WashType = ({ showBookButton = true }) => {
  return (
    <section className="max-w-6xl mx-auto py-12">
      <h2 className="text-3xl font-bold mb-12 text-[#dc323f] text-center">Wash Packages</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Basic Wash",
            price: "$19",
            icon: <FaCar className="text-4xl text-[#dc323f] mb-4" />,
            features: [
              "Exterior cleaning",
              "Tire shine",
              "Quick dry",
              "15-20 minutes"
            ],
            bestFor: "Weekly maintenance"
          },
          {
            title: "Premium Wash",
            price: "$39",
            icon: <FaStar className="text-4xl text-[#dc323f] mb-4" />,
            features: [
              "Exterior & interior cleaning",
              "Dashboard polishing",
              "Window cleaning",
              "30-45 minutes"
            ],
            bestFor: "Bi-weekly deep clean"
          },
          {
            title: "Deep Cleaning & Waxing",
            price: "$69",
            icon: <FaShieldAlt className="text-4xl text-[#dc323f] mb-4" />,
            features: [
              "Full-body wash",
              "Hand-applied wax coating",
              "Interior vacuuming",
              "Leather conditioning",
              "60-75 minutes"
            ],
            bestFor: "Monthly premium care"
          },
          {
            title: "Eco-Friendly Waterless Wash",
            price: "$35",
            icon: <FaLeaf className="text-4xl text-[#dc323f] mb-4" />,
            features: [
              "Waterless technology",
              "Biodegradable solutions",
              "Streak-free finish",
              "25-35 minutes"
            ],
            bestFor: "Environmentally conscious"
          },
          {
            title: "Engine Bay Cleaning",
            price: "$49",
            icon: <FaCog className="text-4xl text-[#dc323f] mb-4" />,
            features: [
              "Safe engine degreasing",
              "Dirt & grease removal",
              "Protective coating",
              "30-45 minutes"
            ],
            bestFor: "Maintaining engine health"
          }
        ].map((service, index) => (
          <div 
            key={index} 
            className="bg-[#111] p-6 rounded-lg border border-[#333] hover:border-[#dc323f] transition-colors"
          >
            <div className="text-center">
              {service.icon}
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-2xl font-bold text-[#dc323f] mb-4">{service.price}</p>
            </div>
            <ul className="space-y-2 mb-6">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-[#dc323f] mr-2">•</span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="text-sm text-gray-400 mb-4">
              <span className="font-medium">Best for:</span> {service.bestFor}
            </div>
            {showBookButton && (
              <Link 
                to="/booking" 
                className="block w-full bg-[#dc323f] hover:bg-[#c02a36] text-white text-center py-2 rounded-lg transition-colors"
              >
                Book Now
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WashType;