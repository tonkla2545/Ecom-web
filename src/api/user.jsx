import axios from "axios";

export const createUserCart = async (token, cart) => {
    return axios.post('https://ecom-api-sage-iota.vercel.app/api/user/cart', cart, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const listUserCart = async (token) => {
    return axios.get('https://ecom-api-sage-iota.vercel.app/api/user/cart', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const saveAddressUser = async (token, address) => {
    return axios.post('https://ecom-api-sage-iota.vercel.app/api/user/address', { address }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const saveOrder = async (token, payload) => {
    return axios.post('https://ecom-api-sage-iota.vercel.app/api/user/order', payload, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const getOrders = async (token) => {
    return axios.get('https://ecom-api-sage-iota.vercel.app/api/user/order', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}