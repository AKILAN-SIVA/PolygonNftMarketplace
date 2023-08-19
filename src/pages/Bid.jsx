import React from 'react'
import Navbar from "../pages/Navbar"

export const Bid = () => {
  return (
    <div className='bg-black min-h-screen h-fit w-full text-white'>
      <div className='pt-12'>
        <Navbar />
      </div>
      <div className='grid justify-center mx-24'>
        <div className='from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent text-8xl font-bold tracking-wide pt-48 font-serif leading-tight '>
          <h1>Bidding page</h1>
        </div>
      </div>
    </div>
  )
}
