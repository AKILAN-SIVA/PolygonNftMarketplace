import React, { useEffect, useState } from 'react'
import Navbar from "../pages/Navbar"
import Marketplace from '../Marketplace.json'
import { async } from '@firebase/util';
import { ethers } from 'ethers';
export const Home = () => {

  const [totTokenId, setTokenId] = useState('');
  const [totSoldNft, setTotSoldNft] = useState('');

  useEffect(() => {
    getTotalCount();
  })

  async function getTotalCount() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

    let totalTokenId = await contract.getTotalMintedTokens();
    let totalSoldNft = await contract.getTotalSoldTokens();

    setTokenId(totalTokenId.toNumber());
    setTotSoldNft(totalSoldNft.toNumber());
  }
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
          <h1>totalTokenId : {totTokenId}</h1>
          <h1>totalSoldNft : {totSoldNft}</h1>
        </div>
      </div>
    </div>
  )
}
