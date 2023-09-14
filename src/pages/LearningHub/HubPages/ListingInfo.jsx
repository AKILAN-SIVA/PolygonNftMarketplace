import React from 'react'
import Navbar from '../../Navbar'
export const ListingInfo = () => {
  return (
    <div className='bg-[#070017] min-h-screen h-fit w-full text-white'>
      <div className='pt-12'>
        <Navbar />
      </div>
      <div className='flex jusytify-between items-start relative  w-full min-h-screen h-fit px-24 py-12 gap-20'>
        <div className='bg-gray-800 fixed w-3/12 h-[300px] p-8 rounded-3xl'>
          <div className='grid justify-start items-center gap-12'>
            <h1 className='text-3xl font-bold tracking-wider'>Questions</h1>
            <div className='grid justify-start items-start gap-4 text-xl tracking-wider'>
              <a href=''>1. What is listing an NFT?</a>
              <a href=''>2. How to list an NFT?</a>
              <a href=''>3. How to buy an NFT?</a>
            </div>
          </div>
        </div>
        <div className='grid absolute top-12 right-24 w-8/12  px-12 pt-10'>

        </div>
      </div>
    </div>
  )
}
