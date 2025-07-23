import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useEcomStore from '../store/ecom-store'
import { ShoppingCart } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

const MainNav = () => {
    const user = useEcomStore((state) => state.user)
    const carts = useEcomStore((state) => state.carts)
    const logout = useEcomStore((state) => state.logout)
    // console.log(Boolean(user))
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }
    return (
        <nav className='bg-withe shadow-md'>
            <div className='mx-auto px-4'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center gap-6'>
                        <Link to={'/'} className='text-2xl font-bold '>LOGO</Link>
                        <NavLink to={'/'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-gray-200 px-3 py-2 rounded-md text-sm font-bold'
                                    : 'px-3 py-2 rounded-md text-sm font-bold hover:bg-gray-200'

                            }>
                            Home
                        </NavLink>
                        <NavLink to={'/shop'}
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-gray-200 px-3 py-2 rounded-md text-sm font-bold'
                                    : 'px-3 py-2 rounded-md text-sm font-bold hover:bg-gray-200'
                            }>
                            Shop
                        </NavLink>

                        <NavLink to={'/cart'} className={({ isActive }) =>
                            isActive
                                ? 'bg-gray-200 flex gap-1 px-3 py-2 rounded-md text-sm font-bold relative'
                                : 'flex gap-1 px-3 py-2 rounded-md text-sm font-bold hover:bg-gray-200 relative'
                        }>
                            <ShoppingCart size={20} />
                            {
                                carts.length > 0 && (<span className=' bg-red-500 rounded-full px-2'>{carts.length}</span>)
                            }
                        </NavLink>
                    </div>

                    {
                        user
                            ? <div className='flex items-center gap-4'>
                                <button className='flex items-center gap-2 hover:bg-gray-200 rounded-md p-2' onClick={toggleDropdown}>
                                    <img className='w-8 h-8' src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-boy-avatars-flat-icons-pack-people-456322.png?f=webp&w=256" />
                                    <ChevronDown />
                                </button>

                                {
                                    isOpen && (
                                        <div className='absolute mt-2 top-12 z-50 bg-white shadow-md rounded-md'>
                                            <Link to={'/user/history'} className=' block px-4 py-2 hover:bg-gray-200'>
                                                History
                                            </Link>
                                            <button onClick={() => logout()} className=' block px-4 py-2 hover:cursor-pointer hover:bg-gray-200'>
                                                Logout
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                            : <div className='flex items-center gap-4'>
                                <NavLink to={'/register'} className={({ isActive }) =>
                                    isActive
                                        ? 'bg-gray-200 flex gap-1 px-3 py-2 rounded-md text-sm font-bold relative'
                                        : 'flex gap-1 px-3 py-2 rounded-md text-sm font-bold hover:bg-gray-200 relative'
                                }>Rgister
                                </NavLink>

                                <NavLink to={'/login'} className={({ isActive }) =>
                                    isActive
                                        ? 'bg-gray-200 flex gap-1 px-3 py-2 rounded-md text-sm font-bold relative'
                                        : 'flex gap-1 px-3 py-2 rounded-md text-sm font-bold hover:bg-gray-200 relative'
                                }>Login
                                </NavLink>
                            </div>
                    }





                </div>

            </div>
        </nav >
    )
}

export default MainNav
