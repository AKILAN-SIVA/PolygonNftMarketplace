import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import { ethers } from "ethers";
import Marketplace from '../Marketplace.json';

export const Viewnft = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const { state } = useLocation();

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          console.log(accounts[0]);
          setWalletAddress(accounts[0]);
          console.log("address ",state.data.owner)
        });
    } else {
      alert("Install Metamask Extension");
    }
  })
  const BuyNFT = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

      let salePrice = ethers.utils.parseUnits(state.data.price, 'ether');
      let tokenId = state.data.tokenId;
      let transaction = await contract.executeSale(tokenId, { value: salePrice });

      await transaction.wait();
    } catch (e) {
      console.log("NFT buy error : " + e);
    }
  }

  return (
    <div className='bg-black h-screen text-white'>
      <div className='pt-12'>
        <Navbar />
      </div>
      <div className='grid justify-start mt-12 ml-24 gap-8'>
        <div className='flex justify-start gap-16'>
          <div className='border-2 border-gray-600 rounded-3xl shadow-md'>
            <img src={state.data.photo} className='w-[700px] h-[500px] rounded-3xl' />
          </div>
          <div className='grid justify-start items-start h-fit gap-8 mt-8'>
            <span className='text-3xl font-bold'>Owned by <span className='text-2xl'>{state.data.owner}</span></span>
            <span className='text-3xl font-bold'>{state.data.title}</span>
            <span className='text-3xl font-bold'>{state.data.price} MATIC</span>
            <span className='text-3xl font-bold'>{state.data.collection}</span>
            <span className='text-3xl font-bold'>{state.data.description}</span>
            {
              (state.data.owner).toLowerCase() == walletAddress.toLowerCase() ? "" : <button className='text-black bg-white rounded-xl w-full h-12 font-bold' onClick={BuyNFT}>Buy NFT</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
