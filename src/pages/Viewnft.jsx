import React from 'react'
import Navbar from './Navbar'

export const Viewnft = () => {
  return (
    <div className='bg-black h-screen text-white'>
      <div className='pt-12'>
        <Navbar />
      </div>
      <div className='flex justify-start mt-12 ml-24'>
        <div><h1>NFT</h1></div>
      </div>
    </div>
  )
}
