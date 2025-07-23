import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { numberFormat } from '../../utils/number';

const SearchCard = () => {
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters)

    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    const [text, setText] = useState('')
    const [categorySelect, setCategorySelect] = useState([])

    const [price, setPrice] = useState([1000, 30000])
    const [ok, setOk] = useState(false)

    useEffect(() => {
        getCategory()
    }, [])
    // console.log(categories)

    // Search Text
    // console.log(text)
    useEffect(() => {
        const delay = setTimeout(() => {
            if (text) {
                actionSearchFilters({ query: text })
            } else {
                getProduct()
            }
        }, 300)

        return () => clearTimeout(delay)

    }, [text])

    // Search Category
    const handleCheck = (event) => {
        // console.log(event.target.value)
        const inCheck = event.target.value // ต่าที่ติ๊ก
        const inState = [...categorySelect] // []
        const findCheck = inState.indexOf(inCheck)  // ถ้าไม่เจอ return -1

        if (findCheck === -1) {
            inState.push(inCheck)
        } else {
            inState.splice(findCheck, 1)
        }
        setCategorySelect(inState)

        if (inState.length > 0) {
            actionSearchFilters({ category: inState })
        } else {
            getProduct()
        }
    }
    // console.log(categorySelect)

    // Search price
    useEffect(() => {
        actionSearchFilters({ price })
    }, [ok])
    const handlePrice = (value) => {
        // console.log(value)
        setPrice(value)
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }

    return (
        <div>
            <h1 className='text-xl font-bold mb-4'>ค้นหาสินค้า</h1>
            <input className='border rounded-md w-full mb-4 px-2' onChange={(event) => setText(event.target.value)} placeholder='ค้นหาสินค้า...' type="text" />
            <hr />
            <div className='my-4'>
                <h1 className='text-xl font-bold '>หมวดหมู่สินค้า</h1>
                <div>
                    {
                        categories.map((item, index) =>
                            <div key={index} className='flex gap-2'>
                                <input type="checkbox" onChange={handleCheck} value={item.id} />
                                <label >{item.name}</label>
                            </div>
                        )
                    }
                </div>
            </div>
            <hr />
            {/* Search Price */}
            <div className='my-4'>
                <h1>ค้นหาราคา</h1>
                <div>
                    <div className='flex justify-between'>
                        <span>Min : {numberFormat(price[0])}</span>
                        <span>Max : {numberFormat(price[1])}</span>
                    </div>
                    <Slider onChange={handlePrice} range min={0} max={100000} defaultValue={[1000, 30000]} />
                </div>
            </div>
        </div>
    )
}

export default SearchCard
