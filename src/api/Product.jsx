import axios from "axios";

export const createProduct = async (token, form) => {
    return axios.post('https://ecom-api-sage-iota.vercel.app/api/product', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listProduct = async (count = 10) => {
    return axios.get('https://ecom-api-sage-iota.vercel.app/api/products/' + count)
}

export const readProduct = async (token, id) => {
    return axios.get('https://ecom-api-sage-iota.vercel.app/api/product/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateProduct = async (token, id, form) => {
    return axios.put('https://ecom-api-sage-iota.vercel.app/api/product/' + id, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteProduct = async (token, id) => {
    return axios.delete('https://ecom-api-sage-iota.vercel.app/api/product/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const uploadFiles = async (token, form) => {
    return axios.post('https://ecom-api-sage-iota.vercel.app/api/images', {
        image: form
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeFiles = async (token, public_id) => {
    return axios.post('https://ecom-api-sage-iota.vercel.app/api/removeimages', {
        public_id
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const searchFilters = async (arg) => {
    return axios.post('https://ecom-api-sage-iota.vercel.app/api/search/filter', arg)
}

export const listProductBy = async (sort, order, limit) => {
    return axios.post('https://ecom-api-sage-iota.vercel.app/api/productby', {
        sort, order, limit
    })
}
