import React, { useEffect, useState } from 'react'
import { listProductBy } from '../../api/Product'
import ProductCard from '../card/ProductCard'
import SwiperShowProduct from '../../utils/SwiperShowProduct'
import { SwiperSlide } from 'swiper/react'

const BestSeller = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        listProductBy('sold', 'desc', 10)
            // listProductBy('sold','asc',3)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (

        <SwiperShowProduct>
            {
                data?.map((item, index) =>
                    <SwiperSlide>
                        <ProductCard item={item} key={index} />
                    </SwiperSlide>
                )
            }
        </SwiperShowProduct>
    )
}

export default BestSeller
