import React, { useState } from 'react'
import Navbar from "../pages/Navbar"
import crypto from 'crypto-js';

export const Bid = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hashValue, setHashValue] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleHashImage = async () => {
    if (!selectedImage) {
      return;
    }

    const base64String = await convertToBase64(selectedImage);
    console.log(base64String);
    const hashedValue = hashWithSHA256(base64String);
    setHashValue(hashedValue);
    console.log(hashedValue)
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.readAsDataURL(file);
    });
  };

  const hashWithSHA256 = (input) => {
    return crypto.SHA256(input).toString();
  };



  return (
    <div className='bg-black min-h-screen h-fit w-full text-white'>
      <div className='pt-12'>
        <Navbar />
      </div>
      <div className='grid justify-center mx-24 gap-6 pb-8'>
        <div className='from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent text-8xl font-bold tracking-wide pt-48 font-serif leading-tight '>
          <h1>Bidding page</h1>
        </div>
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleHashImage}>Hash Image</button>
        {hashValue && (
          <div>
            <h3>Hashed Value:</h3>
            <p>{hashValue}</p>
          </div>
        )}
      </div>
    </div>
  )
}
