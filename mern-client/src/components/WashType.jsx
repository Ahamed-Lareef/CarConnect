import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaShieldAlt, FaLeaf, FaStar, FaCog } from 'react-icons/fa';

const WashType = ({ showBookButton = true }) => {
  return (
    <section className="max-w-6xl mx-auto py-12">
      <h2 className="text-3xl font-bold mb-12 text-[#dc323f] text-center">Wash Packages</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[{
          title: "Basic Wash",
          price: "LKR 1500",
          icon: <FaCar size={48} className="text-[#dc323f]" />,
          features: ["Exterior cleaning", "Tire shine"],
          bestFor: "Daily maintenance",
        }, {
          title: "Premium Wash",
          price: "LKR 2500",
          icon: <FaShieldAlt size={48} className="text-[#dc323f]" />,
          features: ["Exterior & interior cleaning", "Dashboard polishing"],
          bestFor: "Complete cleanliness",
        }, {
          title: "Deep Cleaning & Waxing",
          price: "LKR 3500",
          icon: <FaStar size={48} className="text-[#dc323f]" />,
          features: ["Full-body wash", "Wax coating", "Interior vacuuming"],
          bestFor: "Long-term protection",
        }, {
          title: "Eco-Friendly Waterless Wash",
          price: "LKR 2200",
          icon: <FaLeaf size={48} className="text-[#dc323f]" />,
          features: ["Minimal water", "Biodegradable solutions"],
          bestFor: "Eco-conscious users",
        }, {
          title: "Engine Bay Cleaning",
          price: "LKR 1800",
          icon: <FaCog size={48} className="text-[#dc323f]" />,
          features: ["Dirt & grease removal", "Engine shine"],
          bestFor: "Engine maintenance",
        }].map((service, index) => (
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
                to={`/booking?washType=${service.title}`} // Passing the wash type as a query parameter
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
