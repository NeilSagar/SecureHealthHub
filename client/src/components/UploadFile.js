import React, { useState,useEffect } from 'react'
import Temp from '../Temp'
import { storage } from '../config/firebase';
import { ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"
import { Button, TextField } from '@mui/material';
const UploadFile = () => {
    const [imageUpload, setImageUpload] = useState(null);
    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("image uploaded");
        })
    };
    useEffect(() => {
      uploadImage();
    }, [imageUpload])
    
    return (
        <>
            <Temp />
            <div className='w-[25%] ml-[30%] flex flex-col justify-center '>
                <div className=' mb-12 text-2xl'>
                    Upload Your Research Paper
                </div>
                <div className='ml-8'>
                    <label for="file-input">
                        <img className='w-60 h-60' src="https://cdn-icons-png.flaticon.com/512/126/126477.png">
                        </img>
                    </label>
                    <input id="file-input" type='file' className='w-[20%]' hidden onChange={(event) => { setImageUpload(event.target.files[0]) }} />
                </div>
            </div>
        </>
    )
}

export default UploadFile