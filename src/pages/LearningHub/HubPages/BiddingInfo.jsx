import React from 'react'
import Navbar from '../../Navbar'
import Bidqs1 from './Bidpage/Bidqs1'
import Bidqs2 from './Bidpage/Bidqs2'
import Bidqs3 from './Bidpage/Bidqs3'
export const BiddingInfo = () => {
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
              <a href=''>1. What is bidding an NFT?</a>
              <a href=''>2. How to create an NFT bidding?</a>
              <a href=''>3. How to bid an NFT?</a>
            </div>
          </div>
        </div>
        <div className='grid justify-center items-end w-8/12 px-12 pt-10 gap-12 ml-[28%] right-24'>
          <Bidqs1 />
          <Bidqs2 />
          <Bidqs3 />
        </div>
      </div>
    </div>
  )
}
