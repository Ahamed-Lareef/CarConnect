import React, { useState } from "react";
import { Link } from "react-router-dom";

const Subscription = () => {
  // Fetch this from your backend to check if the user has a subscription
  const [currentPlan, setCurrentPlan] = useState(null); // Change this to actual data when integrated

  const plans = [
    {
      name: "Monthly Plan",
      price: "LKR 2,500",
      features: [
        "✅ Unlimited Basic Washes",
        "✅ Priority Booking",
        "✅ 10% Discount on Premium Wash",
        "✅ Free Engine Bay Cleaning (Once a Month)",
      ],
    },
    {
      name: "Yearly Plan",
      price: "LKR 25,000",
      features: [
        "✅ Unlimited Basic & Premium Washes",
        "✅ Exclusive Priority Service",
        "✅ 20% Discount on Deep Cleaning & Waxing",
        "✅ Free Engine Bay Cleaning (Twice a Month)",
        "✅ Loyalty Rewards & Special Offers",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white py-12 px-6 md:px-24">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#dc323f] mb-8">
        Choose Your Subscription Plan
      </h1>

      {/* Current Subscription Plan Section */}
      <div className="max-w-4xl mx-auto mb-8 p-6 bg-[#222222] border border-gray-700 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-3">Current Subscription</h2>
        {currentPlan ? (
          <div className="bg-[#dc323f] text-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{currentPlan.name}</h3>
            <p className="text-lg">{currentPlan.price}</p>
            <ul className="mt-2 space-y-1">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="text-sm">{feature}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-400">No active subscription plans.</p>
        )}
      </div>

      {/* Subscription Plans */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="p-6 bg-[#222222] border border-gray-700 rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-2xl font-bold text-[#dc323f] mb-4">{plan.name}</h2>
            <p className="text-xl font-semibold">{plan.price}</p>
            <ul className="mt-4 space-y-2 text-gray-400">
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <Link
              to="/checkout"
              className="block mt-6 bg-[#dc323f] text-white text-center py-2 rounded-lg font-semibold hover:bg-[#b9202f] transition-all"
            >
              Subscribe Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
