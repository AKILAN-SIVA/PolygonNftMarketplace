import React from 'react'
import Navbar from '../../Navbar'
import { Mintqs1 } from './Mintpage/Mintqs1'
import { Mintqs2 } from './Mintpage/Mintqs2'
import { Mintqs3 } from './Mintpage/Mintqs3'
import { Mintqs4 } from './Mintpage/Mintqs4'
export const MintInfo = () => {
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
              <a href=''>1. What is minting an NFT?</a>
              <a href=''>2. How to mint an NFT?</a>
              <a href=''>3. What is IPFS?</a>
              <a href=''>4. What is metadata?</a>
            </div>
          </div>
        </div>
        <div className='grid justify-center items-end w-8/12 px-12 pt-10 gap-12 ml-[28%] right-24'>
          <Mintqs1 />
          <Mintqs2 />
          <Mintqs3 />
          <Mintqs4 />
        </div>
      </div>
    </div>
  )
}
