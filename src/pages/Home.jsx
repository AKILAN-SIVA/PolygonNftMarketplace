import React from 'react'
import Navbar from "../pages/Navbar"

export const Home = () => {
  return (
    <div className='bg-black min-h-screen h-fit w-full text-white'>
      <div className='pt-12'>
        <Navbar />
      </div>
      <div className='grid justify-center mx-24'>
        <div className='from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent text-8xl font-bold tracking-wide pt-48 font-serif leading-tight '>
          <h1 className='pl-12'>Discover, collect, and</h1>
          <h1>sell extraordinary NFTs</h1>
          <div className='flex justify-center pt-24 palce-items-center'>
            <button className='bg-white hover:bg-[#ec4899] text-3xl text-black font-bold border-none rounded-full w-60 h-16 tracking-wide' onClick={() => window.location.replace('/exploreNft')}>
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
