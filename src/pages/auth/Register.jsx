import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from 'zxcvbn'
import { path } from 'motion/react-client';

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid Email!!!' }),
  password: z.string().min(8, { message: "Password ต้องมากกว่า 8 ตัว" }),
  confirmPassword: z.string()

}).refine((data) => data.password === data.confirmPassword, { message: "Password is Not Match", path: ['confirmPassword'] })

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const validatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : '').score
  }

  useEffect(() => {
    setPasswordScore(validatePassword())
  }, [watch().password])

  console.log(passwordScore)


  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  //   confirmPassword: ""
  // })

  // const handleOnChange = (event) => { 
  //   // console.log(event.target.name,event.target.value)
  //   setForm({
  //     ...form,
  //     //key:value
  //     [event.target.name]: event.target.value
  //   })
  // }
  // const handleSubmitRegister = async (event) => {
  //   event.preventDefault() //ไม่ต้องรีเฟรช
  //   if (form.password !== form.confirmPassword) {
  //     return alert('Password and Confirm Password is not match')
  //   }
  //   console.log(form)
  //   // Send to BackEnd
  //   try {
  //     const res = await axios.post('https://ecom-api-sage-iota.vercel.app/api/register', form)

  //     toast.success(res.data)
  //     console.log(res)
  //   } catch (err) {
  //     const errMsg = err.response?.data?.message
  //     toast.error(errMsg)
  //     console.log(err)
  //   }
  // }

  const onSubmit = async (data) => {
    // console.log(data)
    // console.log(zxcvbn(data.password).score)
    // const passwordScore = zxcvbn(data.password).score
    // if(passwordScore < 2){
    //   toast.warning('Password is Not Strong!!!')
    //   return
    // }
    try {
      const res = await axios.post('https://ecom-api-sage-iota.vercel.app/api/register', data)

      toast.success(res.data)
      console.log(res)
    } catch (err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
  }

  const tam = Array.from('taaaa')
  console.log(tam)

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-300 rounded-md'>
      <div className=' w-full shadow-md rounded-md bg-white p-8 max-w-md '>
        <h1 className='text-2xl text-center my-4 font-bold'>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <div>
              {/* <input className='border' name='email' type='email' onChange={handleOnChange} /> */}
              <input {...register('email')} className={`border border-gray-300 w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${errors.email && 'border-red-500'}`} placeholder='Email' />
              {
                errors.email &&
                <p className='text-red-500 text-sm'>
                  {errors.email.message}
                </p>
              }
            </div>
            <div>
              {/* <input className='border' name='password' type='text' onChange={handleOnChange} /> */}
              <input {...register('password')} className={`border border-gray-300 w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${errors.password && 'border-red-500'}`} placeholder='Password' type='password'/>
              {
                errors.password &&
                <p className='text-red-500 text-sm'>
                  {errors.password.message}
                </p>
              }

              {
                watch().password?.length > 0 && <div className='flex mt-3'>
                  {
                    Array.from(Array(5).keys()).map((item, index) =>
                      <span className='w-1/5 px-1 ' key={index}>
                        <div className={`h-2 rounded-md ${passwordScore <= 2 ? 'bg-red-300' : passwordScore < 4 ? 'bg-yellow-300' : 'bg-green-300'}`}>

                        </div>
                      </span>
                    )
                  }
                </div>
              }
            </div>

            <div>
              {/* <input className='border' name='confirmPassword' type='text' onChange={handleOnChange} /> */}
              <input {...register('confirmPassword')} className={`border border-gray-300 w-full px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent ${errors.confirmPassword && 'border-red-500'}`} placeholder='confirmPassword' type='password'/>
              {
                errors.confirmPassword &&
                <p className='text-red-500'>
                  {errors.confirmPassword.message}
                </p>
              }
            </div>

            <button className='bg-blue-500 rounded-md w-full py-2 text-white  shadow-md hover:bg-blue-700'>Register</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Register
