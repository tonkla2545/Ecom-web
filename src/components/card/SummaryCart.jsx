import React, { use, useEffect, useState } from 'react'
import { listUserCart, saveAddressUser } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { numberFormat } from '../../utils/number'

const SummaryCart = () => {
    const token = useEcomStore((state) => state.token)
    const [products, setProducts] = useState([])
    const [cartTotal, setCartTotal] = useState(0)

    const [address, setAddress] = useState('')
    const [addressSaved, setAddressSaved] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        handleGetUserCart(token)

    }, [])
    const handleGetUserCart = (token) => {
        listUserCart(token)
            .then((res) => {
                setProducts(res.data.products)
                setCartTotal(res.data.cartTotal)
                // console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleToPayment = () =>{
        if(!addressSaved){
            return toast.warning('Please fill address')
        }
        navigate('/user/payment')
    }

    const handleSaveAddress = () => {
        if (!address) {
            return toast.warning('Please fill')
        }
        saveAddressUser(token, address)
            .then((res) => {
                console.log(res)
                toast.success(res.data.message)
                setAddressSaved(true)
            })
            .catch((err) => {
                console.log(err)
            })

    }
    return (
        <div className='mx-auto'>
            <div className='flex gap-4'>
                {/* Left */}
                <div className='w-2/4'>
                    <div className='bg-gray-100 p-4 rounded-md border-white shadow-md space-y-4'>
                        <h1 className='font-bold text-lg'>ที่อยู่จัดส่ง</h1>
                        <textarea required className='w-full px-2 shadow-md border' placeholder='กรุณากรอกที่อยู่' onChange={(event) => setAddress(event.target.value)} />
                        <button className='bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 hover:scale-105 hover:duration-200' onClick={handleSaveAddress}>Save Address</button>
                    </div>
                </div>

                {/* Right */}
                <div className='w-2/4'>
                    <div className='bg-gray-100 p-4 rounded-md border-white shadow-md space-y-4'>
                        <h1 className='font-bold text-lg'>คำสั่งซื้อของคุณ</h1>
                        {/* Item list */}
                        {
                            products?.map((item, index) =>
                                <div key={index}>
                                    <div className='flex justify-between items-end'>
                                        <div>
                                            <p className='font-bold'>{item.product.title}</p>
                                            <p className='text-sm'>จำนวน: {item.count} x {numberFormat(item.product.price)}</p>
                                        </div>

                                        <div>
                                            <p className='text-red-500 font-bold'>{numberFormat(item.count * item.product.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        <div>
                            <div className='flex justify-between'>
                                <p>ค่าจัดส่ง</p>
                                <p>0.00</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>ส่วนลด:</p>
                                <p>0.00</p>
                            </div>
                        </div>

                        <hr />
                        <div>
                            <div className='flex justify-between'>
                                <p className='font-bold'>ยอดรวมสุทธิ</p>
                                <p className='text-red-500 font-bold'>{numberFormat(cartTotal)}</p>
                            </div>
                        </div>
                            <div>
                                <button onClick={handleToPayment} className='bg-green-400 w-full p-2 rounded-md shadow-md text-white hover:bg-green-600'>ชำระเงิน</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummaryCart
