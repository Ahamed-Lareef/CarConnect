import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaShieldAlt, FaLeaf, FaStar, FaCalendarAlt, FaMedal } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 md:px-8 lg:px-16 pb-20">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#dc323f]">
          Our <span className="text-white">Car Wash System</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Professional cleaning services available at our stations or your location. 
          Choose from our range of eco-friendly wash packages.
        </p>
      </section>

      {/* Service Options */}
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
              title: "Eco-Friendly Wash",
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
              price: "$25",
              icon: <FaCar className="text-4xl text-[#dc323f] mb-4" />,
              features: [
                "Degreasing",
                "Safe electrical component cleaning",
                "Dressing for plastic/rubber",
                "20-30 minutes"
              ],
              bestFor: "Engine maintenance",
              addOn: true
            }
          ].map((service, index) => (
            <div 
              key={index} 
              className={`bg-[#111] p-6 rounded-lg border ${service.addOn ? 'border-[#dc323f]' : 'border-[#333]'} hover:border-[#dc323f] transition-colors`}
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
              <Link 
                to="/booking" 
                className="block w-full bg-[#dc323f] hover:bg-[#c02a36] text-white text-center py-2 rounded-lg transition-colors"
              >
                {service.addOn ? 'Add to Wash' : 'Book Now'}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Service */}
      <section className="max-w-6xl mx-auto py-12 mt-12">
        <div className="bg-gradient-to-r from-[#111] to-[#222] rounded-xl p-8 md:p-10 border border-[#333]">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white mb-4">Mobile Wash Service</h2>
              <p className="text-gray-300 mb-6">
                Can't come to us? We'll come to you! Our fully-equipped mobile units bring 
                the same professional service to your home or office.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-[#dc323f] mr-2 mt-1">•</span>
                  <span>Available for all wash packages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#dc323f] mr-2 mt-1">•</span>
                  <span>Water containment systems protect your property</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#dc323f] mr-2 mt-1">•</span>
                  <span>Perfect for fleets and busy professionals</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <Link 
                to="/booking?service=mobile" 
                className="bg-[#dc323f] hover:bg-[#c02a36] text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Request Mobile Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="max-w-6xl mx-auto py-12">
        <h2 className="text-3xl font-bold mb-12 text-[#dc323f] text-center">Subscription Plans</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Monthly Membership",
              price: "$49/month",
              icon: <FaCalendarAlt className="text-4xl text-[#dc323f] mb-4" />,
              features: [
                "4 Basic Washes per month",
                "10% off additional services",
                "Priority booking",
                "Free tire shine every wash"
              ],
              popular: true
            },
            {
              title: "Annual Plan",
              price: "$499/year",
              icon: <FaMedal className="text-4xl text-[#dc323f] mb-4" />,
              features: [
                "Unlimited Basic Washes",
                "15% off all other services",
                "Free premium upgrade monthly",
                "VIP customer status"
              ],
              popular: false
            }
          ].map((plan, index) => (
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

      {/* Loyalty Program */}
      <section className="max-w-6xl mx-auto py-12">
        <div className="bg-[#111] rounded-xl p-8 md:p-10 border border-[#dc323f]/20">
          <h2 className="text-3xl font-bold mb-6 text-[#dc323f] text-center">Loyalty Rewards</h2>
          <p className="text-gray-300 mb-8 text-center max-w-2xl mx-auto">
            Earn points with every wash and redeem them for discounts, free services, 
            or exclusive perks.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Earn Points",
                desc: "1 point per $1 spent, double points for subscribers"
              },
              {
                title: "Redeem Rewards",
                desc: "50 pts = $5 off, 100 pts = free basic wash"
              },
              {
                title: "VIP Benefits",
                desc: "Free upgrades, priority scheduling, exclusive offers"
              }
            ].map((item, index) => (
              <div key={index} className="bg-[#222] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;