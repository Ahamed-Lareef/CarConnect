import React from 'react';
import { useNavigate } from 'react-router-dom';

const StationRegistrationBanner = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    const confirmMessage =
      "In order to register a station, you must be a service provider.\n\nDo you agree? If yes, please log in.";
    if (window.confirm(confirmMessage)) {
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <div className="w-full bg-[#dc323f] text-white py-8 px-6 mt-8 rounded-lg flex items-center justify-between">
      <div className="max-w-7xl mx-auto flex justify-between w-full items-center">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold">Join Us! Register Your Car Wash Station Today!</h2>
          <p className="mt-2 text-lg">Become part of our growing network of car wash stations and increase your customer base.</p>
        </div>
        <button
          onClick={handleRegisterClick}
          className="bg-white text-[#dc323f] px-8 py-4 rounded-full font-semibold hover:bg-[#f8f8f6] hover:text-[#dc323f] transition-all"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default StationRegistrationBanner;
