import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import { createProduct, deleteProduct } from '../../api/Product'
import { toast } from 'react-toastify'
import UploadFile from './UploadFile'
import { Link } from 'react-router-dom'
import { Pencil,Trash  } from 'lucide-react';
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dataFotmat'

const initialState = {
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: '',
    images: []
}

const FormProduct = () => {
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    // console.log(products)

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: 0,
        quantity: 0,
        categoryId: '',
        images: []
    })


    useEffect(() => {
        getCategory()
        getProduct( 10)
    }, [])
    // console.log(products)

    const handleOnChange = (event) => {
        console.log(event.target.name, event.target.value)
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        // console.log(form)
        try {
            const res = await createProduct(token, form)
            console.log(res)
            setForm(initialState)
            getProduct(10)
            toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('ต้องการลบหรือไม่')) {
            // console.log(id)
            try {
                const res = await deleteProduct(token, id)
                // console.log(res)
                toast.success("Deleted Suiccess!!")
                getProduct(10)
            } catch (err) {
                console.log(err)
            }

        }

    }


    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form onSubmit={handleSubmit}>
                <h1 className='mb-2'>เพิ่มข้อมูลสินค้า</h1>
                <input className='border' type="text" value={form.title} onChange={handleOnChange} placeholder='Title' name='title' />
                <input className='border' type="text" value={form.description} onChange={handleOnChange} placeholder='Description' name='description' />
                <input className='border' type="number" value={form.price} onChange={handleOnChange} placeholder='Price' name='price' />
                <input className='border' type="number" value={form.quantity} onChange={handleOnChange} placeholder='Quantity' name='quantity' />
                <select className='border' name='categoryId' onChange={handleOnChange} required value={form.categoryId}>
                    <option value='' disabled>Please Select</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }
                </select>
                <hr className='mt-3'/>
                {/* Upload file */}
                <UploadFile form={form} setForm={setForm} />

                <button className='bg-blue-500 rounded-md my-2 p-2 shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200'>เพิ่มสินค้า</button>

                <hr />
                <br />
                <table className="min-w-full text-sm text-left border border-gray-300 rounded-md overflow-hidden">
                    <thead className='bg-gray-100 text-gray-700'>
                        <tr className='grid grid-cols-9 font-semibold text-center border-b border-gray-300'>
                            <th scope="col" className="p-2">No.</th>
                            <th scope="col" className="p-2">รูปภาพ</th>
                            <th scope="col" className="p-2">ชื่อสินค้า</th>
                            <th scope="col" className="p-2">รายละเอียด</th>
                            <th scope="col" className="p-2">ราคา</th>
                            <th scope="col" className="p-2">จำนวน</th>
                            <th scope="col" className="p-2">จำนวนที่ขายได้</th>
                            <th scope="col" className="p-2">วันที่อัพเดต</th>
                            <th scope="col" className="p-2">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {
                            products.map((item, index) => {
                                // console.log(item)
                                return (
                                    <tr key={item._id || index}
                                        className="grid grid-cols-9 items-center border-b border-gray-200 hover:bg-gray-50 transition"
                                    >
                                        <th scope="row" className="p-2 text-center font-medium">{index + 1}</th>
                                        <td>
                                            {
                                                item.images.length > 0
                                                    ? <img className='w-24 h-24 rounded-lg shadow-md' src={item.images[0].url} />
                                                    : <div className='w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center shadow-md'>No Image</div>
                                            }
                                        </td>
                                        <td className="p-2 truncate max-w-[200px]">{item.title}</td>
                                        <td className="p-2 truncate">{item.description}</td>
                                        <td className="p-2 text-center">{numberFormat(item.price)}</td>
                                        <td className="p-2 text-center">{item.quantity}</td>
                                        <td className="p-2 text-center">{item.sold}</td>
                                        <td className="p-2 text-center">{dateFormat(item.updatedAt)}</td>
                                        <td className='p-2 flex items-center gap-2 justify-center'>
                                            <p className='bg-blue-600 text-white p-1 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200'>
                                                <Link to={'/admin/product/' + item.id}><Pencil /></Link>
                                            </p>

                                            <p className='bg-red-600 text-white p-1 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200 ' onClick={() => handleDelete(item.id)}><Trash /></p>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default FormProduct
