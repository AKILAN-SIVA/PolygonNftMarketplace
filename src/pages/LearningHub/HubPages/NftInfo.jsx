import React from 'react'
import Navbar from '../../Navbar'
import { NFTqs1 } from './NFTpage/NFTqs1'
import { NFTqs2 } from './NFTpage/NFTqs2'
import { NFTqs3 } from './NFTpage/NFTqs3'
import { NFTqs4 } from './NFTpage/NFTqs4'


export const NftInfo = () => {
  return (
    <div className='bg-black min-h-screen h-fit w-full text-white'>
      <div className='pt-12'>
        <Navbar />
      </div>
      <div className='flex justify-between relative w-full min-h-screen h-fit px-24 py-12 gap-20'>
        <div className='bg-gray-800 fixed w-3/12 h-[300px] p-8 rounded-3xl'>
          <div className='grid justify-start items-center gap-12'>
            <h1 className='text-3xl font-bold tracking-wider'>Questions</h1>
            <div className='grid justify-start items-start gap-4 text-xl tracking-wider'>
              <a href=''>1. What is an NFT?</a>
              <a href=''>2. Why NFT?</a>
              <a href=''>3. How NFT works?</a>
              <a href=''>4. Benifits of an NFT?</a>
            </div>
          </div>
        </div>
        <div className='grid justify-center items-end w-8/12 px-12 pt-10 gap-12 ml-[28%] right-24 '>
          <NFTqs1 />
          <NFTqs2 />
          <NFTqs3 />
          <NFTqs4 />
        </div>
      </div>
    </div>
  )
}
