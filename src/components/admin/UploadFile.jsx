import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import useEcomStore from '../../store/ecom-store'
import { removeFiles, uploadFiles } from '../../api/Product'
import { Loader } from 'lucide-react';

const UploadFile = (props) => {
    const { form, setForm } = props
    const token = useEcomStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)

    const handleOnChange = (event) => {
        setIsLoading(true)
        const files = event.target.files
        if (files) {
            setIsLoading(true)
            let allFiles = form.images // [] empty
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i])
                if (!files[i].type.startsWith('image/')) {
                    toast.error(`File ${files[i].name} is Not image`)
                    continue
                }
                // image resize
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPG",
                    100,
                    0,
                    (data) => {
                        //
                        uploadFiles(token, data)
                            .then((res) => {
                                console.log(res)
                                allFiles.push(res.data)
                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                setIsLoading(false)
                                toast.success('Upload image Success!!!')
                            })
                            .catch((err) => {
                                console.log(err)
                                setIsLoading(false)
                            })
                    },
                    "base64"
                )
            }
        }
    }

    const handleDelete = (public_id) =>{
        const images = form.images
        removeFiles(token,public_id)
        .then((res)=>{
            const filterImages = images.filter((item,index)=>{
                // console.log(item)
                return item.public_id !== public_id
            })
            console.log('filterImages',filterImages)
            setForm({
                ...form,
                images: filterImages
            })
            toast.error('Remove Image Success!!!')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    // console.log(form)
    return (
        <div className='my-4'>
            <div className='flex m-4 gap-4'>
                {
                    isLoading && <Loader className='animate-spin w-16 h-16'/>
                }
                {
                    form.images.map((item,index) =>
                    <div key={index} className='relative'>
                        <img className='w-24 h-24 hover:scale-105' src={item.url}/>
                        <span className='absolute top-0 right-0 bg-red-500 p-1 rounded-md' onClick={()=>handleDelete(item.public_id)}>X</span>
                    </div>
                    )
                }
            </div>
            <div>
                <input className='border bg-gray-100' type='file' name='images' multiple onChange={handleOnChange} />
            </div>
        </div>
    )
}

export default UploadFile
