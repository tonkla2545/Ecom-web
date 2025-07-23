import React from 'react'
import { ShoppingCart } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { numberFormat } from '../../utils/number';
import * as motion from "motion/react-client"

const ProductCard = ({ item }) => {
    const actionAddToCart = useEcomStore((state) => state.actionAddToCart)

    return (
        <motion.div
            initial={{  // เริ่มต้น
                opacity: 0, // ความจาก
                scale: 0  // ขนาด
            }}
            animate={{ opacity: 1, scale: 1 }} // สักพักนึง
            transition={{
                duration: 0.4, // ระยะเวลา
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
        >
            <div className='border rounded-md shadow-md p-2 w-48'>
                <div>
                    {
                        item.images && item.images.length > 0
                            ? <img className='rounded-ms w-full h-48 object-cover hover:scale-110 hover:duration-200' src={item.images[0].url} />
                            : <div className='bg-gray-200 w-full h-24 rounded-md text-center flex items-center justify-center shadow'>
                                No Image
                            </div>
                    }

                </div>
                <div className='py-2'>
                    <p className='text-xl truncate'>{item.title}</p>
                    <p className='text-sm text-gray-500 truncate'>{item.description}...</p>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='text-sm font-bold'>{numberFormat(item.price)}</span>
                    <button className='bg-green-400 p-2 rounded-md hover:bg-green-500 shadow-md' onClick={() => actionAddToCart(item)}>
                        <ShoppingCart />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard
