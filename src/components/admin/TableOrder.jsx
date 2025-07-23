import React, { useEffect, useState } from 'react'
import { getOrdersAdmin, changeOrderStatus } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dataFotmat'

const TableOrder = () => {
    const token = useEcomStore((state) => state.token)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        handleGetOrder(token)
    }, [])

    const handleGetOrder = (token) => {
        getOrdersAdmin(token)
            .then((res) => {
                // console.log(res)
                setOrders(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChangeOrderStatus = (token, orderId, orderStatus) => {
        // console.log(orderId,orderStatus)
        changeOrderStatus(token, orderId, orderStatus)
            .then((res) => {
                // console.log(res)
                toast.success('Updated Status Success!!!')
                handleGetOrder(token)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getStatusColor = (status) =>{
        switch (status){
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
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <div>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-gray-300'>
                            <th>ลำดับ</th>
                            <th>ผู้ใช้งาน</th>
                            <th>วันที่</th>
                            <th>สินค้า</th>
                            <th>รวม</th>
                            <th>สถานะ</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orders?.map((item, index) => {
                                // console.log(item)
                                return (
                                    <tr className='border' key={index}>
                                        <td className='text-center'>{index + 1}</td>
                                        <td>
                                            <p>{item.orderedBy.email}</p>
                                        </td>

                                        <td className='text-center'>
                                            {dateFormat(item.createdAt)}
                                        </td>

                                        <td className='px-2 py-4'>
                                            {
                                                item.products?.map((product, index) =>
                                                    <li key={index} className=''>
                                                        {product.product.title}
                                                        <span className='text-sm'>{product.count} x { numberFormat(product.product.price)}</span>
                                                    </li>
                                                )
                                            }
                                        </td>
                                        <td>{ numberFormat(item.cartTotal) }</td>
                                        <td>
                                            <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
                                                {item.orderStatus}
                                            </span>
                                        </td>
                                        <td>
                                            <select value={item.orderStatus} onChange={(event) => handleChangeOrderStatus(token, item.id, event.target.value)}>
                                                <option >Not Process</option>
                                                <option >Processing</option>
                                                <option >Completed</option>
                                                <option >Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableOrder
