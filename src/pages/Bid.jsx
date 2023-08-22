import React, { useState } from 'react'
import Navbar from "../pages/Navbar"

export const Bid = () => {

  const [url, setUrl] = useState("");
  function generate() {
    fetch(url)
    .then(res => res.blob())
    .then(blob => {

      const file = new File([blob], 'image', {type: blob.type})

      console.log(file);
    })
  }


  

  return (
    <div className='bg-black min-h-screen h-fit w-full text-white'>
      <div className='pt-12'>
        <Navbar />
      </div>
      <div className='grid justify-center mx-24 gap-6 pb-8'>
        <div className='from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent text-8xl font-bold tracking-wide pt-48 font-serif leading-tight '>
          <h1>Bidding page</h1>
        </div>
        <input type='text' className='w-[700px] h-[500px] text-black' onChange={(e) => setUrl(e.target.value)} value={url} />
      
        <button className='bg-gray-700 w-96 h-12 ' onClick={generate}>File</button>
      </div>
    </div>
  )
}
