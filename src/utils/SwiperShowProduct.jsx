import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const SwiperShowProduct = ({ children }) => {
    return (
        <div>
            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                pagination={true}
                navigation={true}
                breakpoints={{
                    200: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    420: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                    1280: {
                        slidesPerView: 6,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination, Autoplay, Navigation]}
                autoplay={{ delay: 2500, disableOnInteraction: false, }}
                className="mySwiper object-cover rounded-md" >

                {children}

            </Swiper>
        </div>
    )
}

export default SwiperShowProduct
