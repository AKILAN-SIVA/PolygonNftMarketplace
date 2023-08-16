import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import { ethers } from "ethers";
import Marketplace from '../Marketplace.json';
import AddressIcon from "../assets/addressIcon.png";

export const Viewnft = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const { state } = useLocation();

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          console.log(accounts[0]);
          setWalletAddress(accounts[0]);
          console.log("address ", state.data.owner)
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
    <div className='bg-black h-full w-full text-white'>
      <div className='pt-12'>
        <Navbar />
      </div>
      <div className='grid justify-start mt-12 ml-24 gap-8'>
        <div className='flex justify-start gap-16'>
          <div className='border-2 border-gray-600 rounded-3xl shadow-md'>
            <img src={state.data.photo} className='w-[700px] h-[500px] rounded-3xl' />
          </div>
          <div className='grid justify-start items-start h-fit gap-8 mt-8'>
            <span className='text-2xl font-bold'>Owned by
              <div className='flex gap-1 mt-4'>
                <img src={AddressIcon} className='h-8 w-8' />
                <h1 className='text-white justify-start'>{(state.data.owner).substring(0, 7)}....{(state.data.owner).substring(12, 19)}</h1>
              </div>
            </span>
            <span className='text-3xl font-bold'>{state.data.title}</span>
            <div className='bg-gray-900 border-2 border-gray-700 w-full h-48 rounded-xl'>
              <div className='grid justify-start items-center gap-4 p-8'>
                <a className='text-2xl  tracking-widest'>Price: {state.data.price} MATIC</a>
                <div className='border border-gray-500 w-[500px] h-0'></div>
                {
                  (state.data.owner).toLowerCase() == walletAddress.toLowerCase() ? <button className='text-black bg-white rounded-xl w-full h-12 font-bold' >List your NFT</button> : <button className='text-black bg-white rounded-xl w-full h-12 font-bold' onClick={BuyNFT}>Buy NFT</button>
                }
              </div>
            </div>
            {/* <span className='text-3xl font-bold'>{state.data.price} MATIC</span>
            <span className='text-3xl font-bold'>{state.data.collection}</span>
            <span className='text-3xl font-bold'>{state.data.description}</span> */}
            {/* {
              (state.data.owner).toLowerCase() == walletAddress.toLowerCase() ? "" : <button className='text-black bg-white rounded-xl w-full h-12 font-bold' onClick={BuyNFT}>Buy NFT</button>
            } */}
          </div>
        </div>
        <div className='pb-16'>
          <div className='bg-gray-900 border-2 border-gray-500 w-[700px] h-48 rounded-lg'>
            <div className='grid px-4 py-6 gap-2'>
              <div className='flex justify-between'>
                <a className='text-xl'>Contract Address</a>
                <a className='text-xl'>{(Marketplace.address).substring(0, 6)}....{(Marketplace.address).substring(11, 16)}</a>
              </div>
              <div className='flex justify-between'>
                <a className='text-xl'>Token Id</a>
                <a className='text-xl'>{state.data.tokenId}</a>
              </div>
              <div className='flex justify-between'>
                <a className='text-xl'>Contract</a>
                <a className='text-xl'>ERC-721</a>
              </div>
              <div className='flex justify-between'>
                <a className='text-xl'>Network</a>
                <a className='text-xl'>Polygon</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
