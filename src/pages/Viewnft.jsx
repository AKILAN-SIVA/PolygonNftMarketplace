import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import { ethers } from "ethers";
import Marketplace from '../Marketplace.json';
import AddressIcon from "../assets/addressIcon.png";
import copy from 'copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Viewnft = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const { state } = useLocation();
  const [listPrice, setListPrice] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [BidPrice, setBidPrice] = useState("");
  const [durationInSeconds, setDurationInSeconds] = useState('');

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

  const copyAddress = (e) => {
    copy(state.data.tokenId);
    toast("Token id copying...");
  }

  const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    var remainingDays = 0;
    if (difference < 0) {
      remainingDays = 0;
      return "Expired"
    } else {
      remainingDays = difference / (1000 * 3600 * 24);
      return remainingDays.toFixed(0);
    }
    
  };
  const ListMyNFT = async () => {
    if (listPrice == "") {
      alert("enter the price")
      console.log("enter the price")
      return
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer);
      const price = ethers.utils.parseUnits(listPrice, 'ether');
      let transaction = await contract.ListNFT(price, state.data.tokenId);
      await transaction.wait();
      setShowModal(false);
    } catch (e) {
      console.log("Error in listing Nft : " + e);
    }

  }
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

  const CreateBidding = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)
      let price = ethers.utils.parseUnits(BidPrice, 'ether');
      // let deadline = daysLeft(durationInSeconds);
      // console.log(deadline);
      let transaction = await contract.createAuctionListing(price, state.data.tokenId, durationInSeconds);
      await transaction.wait();
    } catch (e) {
      console.log("Error in creating Bid " + e);
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
            <span className='text-2xl font-bold'>Created by
              <div className='flex gap-1 mt-4'>
                <img src={AddressIcon} className='h-8 w-8' />
                <h1 className='text-white justify-start'>{(state.data.owner).substring(0, 7)}....{(state.data.owner).substring(12, 19)}</h1>
              </div>
            </span>
            {
              state.data.Buyer == null ?
                <div></div>
                :
                <span className='text-2xl font-bold'>Owned by
                  <div className='flex gap-1 mt-4'>
                    <img src={AddressIcon} className='h-8 w-8' />
                    <h1 className='text-white justify-start'>{(state.data.Buyer).substring(0, 7)}....{(state.data.Buyer).substring(12, 19)}</h1>
                  </div>
                </span>
            }
            <span className='text-3xl font-bold'>{state.data.title}</span>
            <div className='bg-gray-900 border-2 border-gray-700 w-full h-fit rounded-xl'>
              <div className='grid justify-start items-center gap-4 p-8'>
                <a className='text-2xl  tracking-widest'>Price: {state.data.price} MATIC</a>
                <div className='border border-gray-500 w-[500px] h-0'></div>
                {
                  (state.data.owner).toLowerCase() == walletAddress.toLowerCase() ? state.data.price == 0 ?
                    <>
                      <button className='text-black bg-white rounded-xl w-full h-12 font-bold' onClick={() => setShowModal(true)}>List your NFT</button>
                      <button className='text-black bg-white rounded-xl w-full h-12 font-bold' onClick={() => setShowBidModal(true)}>Bid your NFT</button>
                    </>
                    :
                    <button className='text-black bg-white rounded-xl w-full h-12 font-bold'>You Can't list the NFT Again </button>
                    :
                    <button className='text-black bg-white rounded-xl w-full h-12 font-bold' onClick={BuyNFT}>Buy NFT</button>
                }
                {showModal ? (
                  <>
                    <div
                      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-300 outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold text-black">
                              Sell your NFT
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModal(false)}
                            >
                              <span className="bg-transparent text-black h-6 w-6 text-3xl block outline-none focus:outline-none">
                                ×
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <div className="relative p-6 flex-auto">
                            <input type="number" onChange={(e) => setListPrice(e.target.value)} className="bg-transparent w-[600px] h-12 text-black rounded-lg border-2 border-black p-4" placeholder="Enter price for sale" value={listPrice} />
                          </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                              className="bg-black text-white active:bg-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => ListMyNFT()}
                            >
                              List
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
                {showBidModal ? (
                  <>
                    <div
                      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-300 outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold text-black">
                              Bid your NFT
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowBidModal(false)}
                            >
                              <span className="bg-transparent text-black h-6 w-6 text-3xl block outline-none focus:outline-none">
                                ×
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <div className="relative p-6 flex-auto">
                            <input type="number" onChange={(e) => setBidPrice(e.target.value)} className="bg-transparent w-[600px] h-12 text-black rounded-lg border-2 border-black p-4" placeholder="Enter price for sale" value={BidPrice} />
                          </div>
                          <div className="relative p-6 flex-auto">
                            <input type="number" onChange={(e) => setDurationInSeconds(e.target.value)} className="bg-transparent w-[600px] h-12 text-black rounded-lg border-2 border-black p-4" placeholder="Enter duration for sale in secondes" value={durationInSeconds} />
                          </div>
                          
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                              className="bg-black text-white active:bg-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => CreateBidding()}
                            >
                              Bid
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
              </div>
            </div>
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
                <button onClick={copyAddress} className='bg-gray-800 rounded-xl px-4'><a className='text-xl'>{state.data.tokenId}</a></button>
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
      <ToastContainer />
    </div>
  )
}
