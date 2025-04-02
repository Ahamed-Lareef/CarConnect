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

          {/* Call-to-Action Section */}
          <div className='space-y-4'>
            <button 
              className='bg-[#dc323f] hover:bg-[#c02a36] text-[#f8f8f6] px-6 py-3 rounded-lg transition-colors'>
              Book Your Service Now
            </button>

            <p className='text-[#636363]'>
              Experience the difference with our <strong>premium car wash</strong>, eco-friendly products, and unmatched customer satisfaction.
            </p>
          </div>

          {/* Services Highlight Section */}
          <div className='mt-8'>
            <h2 className='text-xl font-semibold text-[#0b0c0e]'>Our Popular Services:</h2>
            <ul className='list-disc pl-5 space-y-2 text-[#636363]'>
              <li>Basic Wash - Exterior cleaning, tire shine</li>
              <li>Premium Wash - Exterior & interior cleaning, dashboard polishing</li>
              <li>Deep Cleaning & Waxing - Full-body wash, wax coating, interior vacuuming</li>
              <li>Eco-Friendly Waterless Wash - Minimal water, biodegradable cleaning solutions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
