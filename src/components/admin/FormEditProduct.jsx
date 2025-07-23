import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import { createProduct,readProduct,updateProduct } from '../../api/Product'
import { toast } from 'react-toastify'
import UploadFile from './UploadFile'
import { useParams, useNavigate } from 'react-router-dom'

const initialState = {
    title: "Notebook",
    description: "test",
    price: 1000,
    quantity: 10,
    categoryId: '',
    images: []
}

const FormEditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    // console.log(products)

    const [form, setForm] = useState(initialState)


    useEffect(() => {
        getCategory()
        fetchProduct(token,id,form)
    }, [])
    // console.log(products)

    const fetchProduct = async(token,id,form) =>{
        try{
            const res = await readProduct(token,id)
            console.log("res",res)
            setForm(res.data)
        }catch(err){
            console.log(err)
        }
    }
    console.log(form)

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
            const res = await updateProduct(token,id, form)
            console.log(res)
            toast.success(`อัพเดทข้อมูล ${res.data.title} สำเร็จ`)
            navigate('/admin/product')
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form className='' onSubmit={handleSubmit}>
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
                <hr />
                    {/* Upload file */}
                    <UploadFile form={form} setForm={setForm} />

                <button className='bg-blue-500 rounded-md my-2'>แก้ไขสินค้า</button>

                <hr />
                <br />
            </form>
        </div>
    )
}

export default FormEditProduct
