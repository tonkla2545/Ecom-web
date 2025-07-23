import React, { useState, useEffect } from 'react'
import { getOrders } from '../../api/user'
import useEcomStore from '../../store/ecom-store'
import { dateFormat } from '../../utils/dataFotmat'
import { numberFormat } from '../../utils/number'

const HistoryCard = () => {
    const token = useEcomStore((state) => state.token)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        handlegetOrders(token)
    }, [])

    const handlegetOrders = (token) => {
        getOrders(token)
            .then((res) => {
                // console.log(res)
                setOrders(res.data.orders)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Not Process":
                return 'bg-gray-400'
            case "Processing":
                return 'bg-blue-400'
            case "Completed":
                return 'bg-green-400'
            case "Cancelled":
                return 'bg-red-400'
        }
    }

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold'>ประวัติการสั่งซื้อ</h1>
            {/* Cover */}
            <div className='space-y-4'>
                {/* Card Loop */}
                {
                    orders?.map((item, index) => {
                        // console.log(item)

                        return (
                            <div key={index} className='bg-gray-100 rounded-md shadow-md p-4'>
                                {/* Header */}
                                <div className='flex justify-between mb-2 '>
                                    <div>
                                        <p>Order Date</p>
                                        <p>{dateFormat(item.updatedAt)}</p>
                                    </div>
                                    <div>
                                        <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
                                            {item.orderStatus}
                                        </span>
                                    </div>
                                </div>
                                {/* Table */}
                                <div>
                                    <table className='border w-full'>
                                        <thead>
                                            <tr className='bg-gray-200'>
                                                <th>สินค้า</th>
                                                <th>ราคา</th>
                                                <th>จำนวน</th>
                                                <th>รวม</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-center'>
                                            {
                                                item.products?.map((product, index) => {
                                                    // console.log(product)
                                                    return (
                                                        <tr key={index}>
                                                            <td>{product.product.title}</td>
                                                            <td>{numberFormat(product.product.price)}</td>
                                                            <td>{product.count}</td>
                                                            <td>{numberFormat(product.count * product.product.price)}</td>
                                                        </tr>)
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                                {/* Total */}
                                <div>
                                    <div className="text-right">
                                        <p>ราคาสุทธิ</p>
                                        <p>{numberFormat(item.cartTotal)}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default HistoryCard
