import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const ContentCarousel = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        handleGetImage()
    }, [])

    const handleGetImage = async () => {
        await axios.get('https://picsum.photos/v2/list?page=1&limit=15')
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='relative z-0'>
            <Swiper 
            pagination={true} 
            modules={[Pagination, Autoplay]} 
            autoplay={{ delay: 2500, disableOnInteraction: false, }} 
            className="mySwiper h-80 object-cover rounded-md mb-4">
                {
                    data?.map((item, index) =>
                        <SwiperSlide key={index}>
                            <img src={item.download_url} />
                        </SwiperSlide>
                    )
                }
            </Swiper>

            <Swiper 
            slidesPerView={5} 
            spaceBetween={10} 
            pagination={true} 
            navigation={true} 
            modules={[Pagination, Autoplay, Navigation]} 
            autoplay={{ delay: 2500, disableOnInteraction: false, }} 
            className="mySwiper object-cover rounded-md" >
                {
                    data?.map((item, index) =>
                        <SwiperSlide key={index}>
                            <img className='rounded-md' src={item.download_url} />
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    )
}

export default ContentCarousel
