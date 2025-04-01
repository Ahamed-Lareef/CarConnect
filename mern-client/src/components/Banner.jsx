import React from 'react';
import BannerCard from '../home/BannerCard';

const Banner = () => {
  return (
    <div className='bg-[#f8f8f6] px-4 lg:px-24 flex items-center min-h-screen'>
      <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-12 py-20 w-full'>
        {/* Right side - BannerCard */}
        <div className='md:w-1/2'>
          <BannerCard />
        </div>

        {/* Left side - Text */}
        <div className='md:w-1/2 space-y-6'>
          <h1 className='text-4xl md:text-5xl font-bold text-[#0b0c0e]'>
            Professional <span className='text-[#dc323f]'>Car Care</span> Made Easy
          </h1>
          <p className='text-[#636363]'>
            Book premium washing services instantly. Enjoy our eco-friendly solutions 
            and loyalty rewards for regular customers.
          </p>
          <div className='flex'>
            <input 
              type="text" 
              placeholder='Enter your location...' 
              className='flex-grow p-3 rounded-l-lg border border-[#636363] focus:outline-none'
            />
            <button className='bg-[#dc323f] hover:bg-[#c02a36] text-[#f8f8f6] px-6 py-3 rounded-r-lg transition-colors'>
              Find Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner; 