import React from 'react'
import Navbar from '../../Navbar'
import { Metamaskqs1 } from './Metamaskpage/Metamaskqs1'
import { Metamaskqs2 } from './Metamaskpage/Metamaskqs2'
import { Metamaskqs3 } from './Metamaskpage/Metamaskqs3'
export const MetaMaskInfo = () => {
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
              <a href=''>1. What is Metamask?</a>
              <a href=''>2. Why Metamask?</a>
              <a href=''>3. How to create an account?</a>
            </div>
          </div>
        </div>
        <div className='grid justify-center items-end w-8/12 px-12 pt-10 gap-12 ml-[28%] right-24'>
          <Metamaskqs1 />
          <Metamaskqs2 />
          <Metamaskqs3 />
        </div>
      </div>
    </div>
  )
}
