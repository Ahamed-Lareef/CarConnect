import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaShieldAlt, FaLeaf, FaStar, FaCalendarAlt, FaMedal, FaCog } from 'react-icons/fa';

const About = ({ showBookButton = true }) => {
  return (

      <div className="min-h-screen bg-black text-white pt-24 px-4 md:px-8 lg:px-16 pb-20">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto py-12">
        <h2 className="text-3xl font-bold mb-12 text-[#dc323f] text-center">About Our Car Wash</h2>
        <p className="text-gray-300 text-lg mb-6 text-center">
          At CarConnect, we take pride in offering high-quality car wash services that ensure your vehicle looks its best. Our professional team uses premium cleaning products and techniques to maintain the cleanliness and shine of your car. Whether you need a quick exterior wash or a full deep cleaning, we have a package tailored to your needs.
        </p>
        <p className="text-gray-300 text-lg mb-6 text-center">
          Our services are designed to provide convenience, efficiency, and eco-friendliness. With our advanced water-saving techniques and biodegradable cleaning solutions, we ensure that your car gets the best treatment while being environmentally responsible. 
        </p>
        <p className="text-gray-300 text-lg mb-6 text-center">
          To make car maintenance even more hassle-free, we offer exclusive subscription plans! Enjoy regular washes at discounted rates and keep your vehicle spotless without worrying about repeated bookings. Choose from our monthly or yearly plans and experience seamless car care with CarConnect.
        </p>
      </section>

      <section className="max-w-6xl mx-auto py-12">
            <h2 className="text-3xl font-bold mb-12 text-[#dc323f] text-center">Wash Packages</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Basic Wash",
                  price: "LKR 1500",
                  icon: <FaCar size={48} className="text-[#dc323f]" />,
                  features: ["Exterior cleaning", "Tire shine"],
                  bestFor: "Daily maintenance",
                },
                {
                  title: "Premium Wash",
                  price: "LKR 2500",
                  icon: <FaShieldAlt size={48} className="text-[#dc323f]" />,
                  features: ["Exterior & interior cleaning", "Dashboard polishing"],
                  bestFor: "Complete cleanliness",
                },
                {
                  title: "Deep Cleaning & Waxing",
                  price: "LKR 3500",
                  icon: <FaStar size={48} className="text-[#dc323f]" />,
                  features: ["Full-body wash", "Wax coating", "Interior vacuuming"],
                  bestFor: "Long-term protection",
                },
                {
                  title: "Eco-Friendly Waterless Wash",
                  price: "LKR 2200",
                  icon: <FaLeaf size={48} className="text-[#dc323f]" />,
                  features: ["Minimal water", "Biodegradable solutions"],
                  bestFor: "Eco-conscious users",
                },
                {
                  title: "Engine Bay Cleaning",
                  price: "LKR 1800",
                  icon: <FaCog size={48} className="text-[#dc323f]" />,
                  features: ["Dirt & grease removal", "Engine shine"],
                  bestFor: "Engine maintenance",
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
                      to={`/booking?washType=${service.title}`} 
                      className="block w-full bg-[#dc323f] hover:bg-[#c02a36] text-white text-center py-2 rounded-lg transition-colors"
                    >
                      Book Now
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>

      {/* Subscription Plans */}
      <section className="max-w-6xl mx-auto py-12">
        <h2 className="text-3xl font-bold mb-12 text-[#dc323f] text-center">Subscription Plans</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {([
            {
              title: "Monthly Plan",
              price: "LKR 2,500",
              icon: <FaCalendarAlt className="text-4xl text-[#dc323f] mb-4" />,
              features: [
                "Unlimited Basic Washes",
                "Priority Booking",
                "10% Discount on Premium Wash",
                "Free Engine Bay Cleaning (Once a Month)"
              ],
              popular: true
            },
            {
              title: "Yearly Plan",
              price: "LKR 25,000",
              icon: <FaMedal className="text-4xl text-[#dc323f] mb-4" />,
              features: [
                "Unlimited Basic & Premium Washes",
                "Exclusive Priority Service",
                "20% Discount on Deep Cleaning & Waxing",
                "Free Engine Bay Cleaning (Twice a Month)",
                "Loyalty Rewards & Special Offers"
              ],
              popular: false
            }
          ]).map((plan, index) => (
            <div 
              key={index} 
              className={`bg-[#111] p-8 rounded-lg border-2 ${plan.popular ? 'border-[#dc323f]' : 'border-[#333]'}`}
            >
              <div className="text-center mb-6">
                {plan.icon}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
                <p className="text-xl text-[#dc323f] font-bold">{plan.price}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#dc323f] mr-2 mt-1">•</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link 
                to="/subscription" 
                className="block w-full bg-[#dc323f] hover:bg-[#c02a36] text-white text-center py-3 rounded-lg font-bold transition-colors"
              >
                Join Now
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
