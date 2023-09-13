import React from 'react'
import Navbar from '../../Navbar'
export const MintInfo = () => {
  return (
    <div className='bg-[#070017] min-h-screen h-fit w-full text-white'>
      <div className='pt-12'>
        <Navbar />
      </div>
      <div className='grid justify-start px-24 pt-20 gap-24'>
        <div className=''>
          <h1 className='text-5xl font-bold tracking-wider'>1. What is Minting an NFT?</h1>
        </div>
        <div className=''>
          <h1 className='text-5xl font-bold tracking-wider'>2. What is IPFS and Metadata?</h1>
        </div>
        <div className=''>
          <h1 className='text-5xl font-bold tracking-wider'>3. How to Mint an NFT?</h1>
        </div>
      </div>
    </div>
  )
}
