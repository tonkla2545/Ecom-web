import React from 'react'
import { Trash, Minus, Plus } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { Link, Links } from 'react-router-dom';
import { numberFormat } from '../../utils/number';

const CartCard = () => {
    const carts = useEcomStore((state) => state.carts)
    const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
    const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)
    console.log(carts)
    return (
        <div>
            <h1 className='text-2xl font-bold'>ตะกร้าสินค้า</h1>
            {/* Border */}
            <div className='border p-2'>
                {/* Card */}
                {
                    carts.map((item, index) =>
                        <div key={index} className='bg-white p-2 rounded-md shadow-md mb-2'>
                            {/* Row 1 */}
                            <div className='flex justify-between mb-2' >
                                {/* Left */}
                                <div className='flex gap-2 items-center'>

                                    {
                                        item.images && item.images.length > 0
                                            ? <img className='w-16 h-16 rounded-md shadow-md' src={item.images[0].url} />
                                            : <div className=' flex w-16 h-16 bg-gray-200 rounded-md text-center items-center'>
                                                No Image
                                            </div>
                                    }
                                    <div>
                                        <p className='font-bold'>{item.title}</p>
                                        <p className='text-sm'>{item.description}</p>
                                    </div>
                                </div>
                                {/* Right */}
                                <div className='mr-2 mt-2 text-red-600' onClick={() => actionRemoveProduct(item.id)}>
                                    <Trash />
                                </div>
                            </div>
                            {/* Row 2 */}
                            <div className='flex justify-between'>
                                {/* Left */}
                                <div className='border rounded-sm px-2 py-1 flex'>
                                    <button className='px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-400' onClick={() => actionUpdateQuantity(item.id, item.count - 1)}><Minus size={16} /></button>
                                    <span className='px-4'>{item.count}</span>
                                    <button className='px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-400' onClick={() => actionUpdateQuantity(item.id, item.count + 1)}><Plus size={16} /></button>
                                </div>
                                {/* Right */}
                                <div className='font-bold text-green-600 flex items-center mr-2'>
                                    {numberFormat(item.price * item.count)}
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    )
                }
                {/* Total */}
                <div className='flex justify-between px-2 mt-3'>
                    <span>รวม</span>
                    <span>{numberFormat(getTotalPrice())}</span>
                </div>
                {/* Button */}
                <Link to='/cart'>
                    <div>
                        <button className='mt-4 bg-green-500 text-white w-full py-2 rounded-md shadow-md'>ชำระเงิน</button>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default CartCard
