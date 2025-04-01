import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './BannerCard.css';
import { EffectCoverflow, Pagination } from 'swiper/modules';

const BannerCard = () => {
  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      const headerHeight = header.offsetHeight;
      document.documentElement.style.setProperty(
        '--header-height', 
        `${headerHeight}px`
      );
    }
  }, []);

  return (
    <div className='banner'>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="src/assets/basicWash.jpg" alt="Basic Wash" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src/assets/premiumWash.jpg" alt="Premium Wash" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src/assets/deluxeWash.jpg" alt="Deluxe Wash" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src/assets/ecoWash.jpg" alt="Eco Wash" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src/assets/ceramicCoating.jpg" alt="Ceramic Coating" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerCard;