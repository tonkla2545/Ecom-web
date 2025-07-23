import React from 'react'
import { List } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { Link, useNavigate } from 'react-router-dom';
import { createUserCart } from '../../api/user';
import { toast } from 'react-toastify';
import { numberFormat } from '../../utils/number';

const ListCart = () => {
    const cart = useEcomStore((state) => state.carts)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)

    const navigate = useNavigate()
    const handleSaveCart = async () => {
        await createUserCart(token, { cart })
            .then((res) => {
                console.log(res)
                toast.success(res.data.message)
                navigate('/checkout')
            })
            .catch((err) => {
                console.log(err)
                toast.warning(err.response.data.message)
            })
    }

    return (
        <div className='bg-gray-200 rounded-sm p-4'>
            {/* Header */}
            <div className='flex gap-4 items-center mb-4'>

                <List size={36} />
                <p className='text-2xl '>รายการสินค้า {cart.length} รายการ</p>
            </div>
            {/* List */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {/* Left */}
                <div className='col-span-2'>
                    {
                        cart.map((item, index) =>
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
                                            <p className='text-sm'>{numberFormat(item.price)} x {item.count}</p>
                                        </div>
                                    </div>
                                    {/* Right */}
                                    <div className='mr-2 mt-2 text-red-600' onClick={() => actionRemoveProduct(item.id)}>
                                        <div className='font-bold text-green-600 flex items-center mr-2'>
                                            {numberFormat(item.price * item.count)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                {/* Right */}
                < div className='bg-white p-4 rounded-sm shadow-md space-y-4'>
                    <p className='text-2xl'>ยอดรวม</p>
                    <div className='flex justify-between'>
                        <span>รวมสุทธิ</span>
                        <span className='text-2xl pr-4'>{numberFormat(getTotalPrice())}</span>
                    </div>

                    <div className='flex flex-col gap-2'>
                        {
                            user
                                ? <Link>
                                    <button disabled={cart.length < 1} onClick={handleSaveCart} className='bg-red-500 w-full rounded-md text-white py-2 shadow-md hover:bg-red-700'>สั่งซื้อ</button>
                                </Link>
                                : <Link to={'/login'}>
                                    <button className='bg-green-500 w-full rounded-md text-white py-2 shadow-md hover:bg-green-700'>Login</button>
                                </Link>
                        }
                        <Link to={'/shop'}>
                            <button className='bg-gray-500 w-full rounded-md text-white py-2 shadow-md hover:bg-gray-700'>แก้ไขรายการ</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default ListCart
