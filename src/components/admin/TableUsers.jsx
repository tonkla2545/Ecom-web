import React, { useEffect, useState } from 'react'
import { getListAllUsers, changeUserStatus, changeUserRole } from '../../api/admin'
import useEcomstore from '../../store/ecom-store'
import { toast } from 'react-toastify'

const TableUsers = () => {
    const token = useEcomstore((state) => state.token)
    const [users, setUsers] = useState([])

    useEffect(() => {
        handleGetUsers(token)
    }, [])

    const handleGetUsers = (token) => {
        getListAllUsers(token)
            .then((res) => {
                setUsers(res.data)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChangeUserStatus = (userId, userStatus) => {
        console.log(userId, userStatus)
        const value = {
            id: userId,
            enabled: !userStatus
        }
        changeUserStatus(token, value)
            .then((res) => {
                // console.log(res)
                handleGetUsers(token)
                toast.success("Update Status Success!!");
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChangeUserRole = (userId, userRole) => {
        // console.log(userId, userStatus)
        const value = {
            id: userId,
            role: userRole
        }
        changeUserRole(token, value)
            .then((res) => {
                // console.log(res)
                handleGetUsers(token)
                toast.success("Update Role Success!!");
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className='container mx-auto p-4 bg-white shadow-md'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>Email</th>
                            {/* <th>วันที่แก้ไขล่าสุด</th> */}
                            <th>สิทธิ์</th>
                            <th>สถานะ</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            users?.map((item, index) => (

                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.email}</td>
                                    {/* <td>{item.updatetAt}</td> */}


                                    <td>
                                        <select onChange={(event)=> handleChangeUserRole(item.id,event.target.value)} value={item.role}>
                                            <option>user</option>
                                            <option>admin</option>
                                        </select>
                                    </td>


                                    <td>{item.enabled ? 'Active' : 'Inactive'}</td>
                                    <td>
                                        <button className='bg-yellow-300 p-1 rounded-md shadow-ms' onClick={() => handleChangeUserStatus(item.id, item.enabled)}>
                                            {item.enabled ? 'Disable' : 'Enable'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableUsers
