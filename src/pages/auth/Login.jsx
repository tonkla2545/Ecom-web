import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state) => state.actionLogin)
  const user = useEcomStore((state) => state.user)
  console.log(user)

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleOnChange = (event) => {
    // console.log(event.target.name,event.target.value)
    setForm({
      ...form,
      //key:value
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault() //ไม่ต้องรีเฟรช
    // console.log(form)
    // Send to BackEnd
    try {
      const res = await actionLogin(form)
      // toast.success(res.data)
      toast.success('Welcome Back')

      const role = res.data.payload.role
      roleRedirect(role)
      // console.log('role',role)
    } catch (err) {
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }

  }

  const roleRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin')
    } else {
      navigate(-1)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-300 rounded-md'>
      <div className=' w-full shadow-md rounded-md bg-white p-8 max-w-md '>
        <h1 className='text-2xl text-center my-4 font-bold'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>

            <input className={`border border-gray-300 w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent`} name='email' type='email' onChange={handleOnChange} placeholder='Email' />
            
            <input className={`border border-gray-300 w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent`} name='password' type='password' onChange={handleOnChange} placeholder='Password' />

             <button className='bg-blue-500 rounded-md w-full py-2 text-white  shadow-md hover:bg-blue-700'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
