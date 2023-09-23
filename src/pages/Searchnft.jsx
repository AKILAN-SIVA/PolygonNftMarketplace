import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import { ethers } from "ethers";
import Marketplace from '../Marketplace.json';
import AddressIcon from "../assets/addressIcon.png";
import copy from 'copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Music from "../assets/music.png"
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";

export const Searchnft = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const { state } = useLocation();
  const [listPrice, setListPrice] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [play, setPlay] = useState(false);

  let audio = new Audio(state.photo)
  const myRef = useRef(audio);
  const startAudio = () => {
    myRef.current.play();
    console.log("playing...");
    setPlay(true);
  };

  const pauseAudio = () => {
    console.log("paused...");
    myRef.current.pause();
    setPlay(false);
  };

  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const handleLoadedMetadata = () => {
    setIsVideoReady(true);
  };

  // Use useEffect to automatically play the video when it's ready
  useEffect(() => {
    if (isVideoReady && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVideoReady]);



  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          console.log(accounts[0]);
          setWalletAddress(accounts[0]);
          console.log("address ", state.owner);
          if (state) {
            setLoadingProgress(false)
          }
          else {
            setLoadingProgress(true);
          }
        });
    } else {
      alert("Install Metamask Extension");
    }
  })

  const copyAddress = (e) => {
    copy(state.data.tokenId);
    toast("Token id copying...");
  }

  const ListMyNFT = async () => {
    alert("This process may take few minutes... Please wait... Don't refresh !!");
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
      alert("This process may take few minutes... Please wait... Don't refresh !!");
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
  let circleCommonClasses = 'h-6 w-6 bg-current  rounded-full';
  return (
    <div className='bg-black min-h-screen h-fit w-full text-white'>
      <div className='pt-12'>
        <Navbar />
      </div>
      {
        loadingProgress ?
          <>
            <div className='flex justify-center mt-96 gap-6'>
              <div className={`${circleCommonClasses} mt-1 animate-bounce`}></div>
              <div
                className={`${circleCommonClasses} mt-1 animate-bounce200`}
              ></div>
              <div className={`${circleCommonClasses} mt-1 animate-bounce400`}></div>
            </div>
          </>
          :
          <>
            <div className='grid justify-start mt-12 ml-24 gap-8'>
              <div className='flex justify-start gap-16'>
                {
                  state.format == "1" ?
                    <>

                      <div className='border-2 border-gray-600 w-[700px] h-[700px] rounded-3xl shadow-md overflow-hidden'>
                        <img src={state.photo} className='w-full h-full' />
                      </div>
                    </>
                    :
                    <></>
                }
                {
                  state.format == "2" ?
                    <>
                      <div className='relative border-2 border-gray-600 w-[700px] h-[700px] rounded-3xl shadow-md '>
                        <img src={Music} className='w-full h-[655px]' />
                        {
                          play ?
                            <button className="absolute bottom-6 right-5 rounded-full  flex justify-center items-center p-2" onClick={pauseAudio}><FaCirclePause size={36} /></button>
                            :
                            <button className="absolute bottom-6 right-5 rounded-full  flex justify-center items-center p-2" onClick={startAudio}><FaCirclePlay size={36} /></button>
                        }

                        {/* <audio src={state.data.photo} className='w-full h-10' controls /> */}
                      </div>
                    </>
                    :
                    <></>
                }
                {
                  state.format == "3" ?
                    <>
                      <div className='border-2 border-gray-600 w-[700px] h-[700px] rounded-3xl shadow-md overflow-hidden'>
                        <video src={state.photo} className='w-full h-full' controls loop autoPlay onLoadedMetadata={handleLoadedMetadata} controlsList='nodownload' />
                      </div>
                    </>
                    :
                    <></>
                }
                <div className='grid justify-start items-start h-fit gap-8 mt-8'>
                  <div className='flex justify-start items-center gap-4'>
                    <span className='text-2xl font-bold'>Created by</span>
                    <div className='bg-purple-500  w-fit flex justify-between h-12 items-center rounded-2xl px-2'>
                      <div className='flex items-center gap-1'>
                        <img src={AddressIcon} className='h-6 w-6' />
                        <h1 className='text-white justify-start text-lg'>{(state.owner).substring(0, 6)}....{(state.owner).substring(36, 42)}</h1>
                      </div>
                    </div>
                  </div>
                  <span className='text-3xl font-bold'>{state.title}</span>
                  <div className='bg-gray-900 border-2 border-gray-700 w-full h-48 rounded-xl'>
                    <div className='grid justify-start items-center gap-4 p-8'>
                      <a className='text-2xl  tracking-widest'>Price: {state.price} MATIC</a>
                      <div className='border border-gray-500 w-[500px] h-0'></div>
                      {
                        (state.owner).toLowerCase() == walletAddress.toLowerCase() ? state.price == 0 ?
                          <button className='text-black bg-white rounded-xl w-full h-12 font-bold' onClick={() => setShowModal(true)}>List your NFT</button> : <button className='text-black bg-white rounded-xl w-full h-12 font-bold'>You Can't list the NFT Again </button>
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
                    </div>
                  </div>
                  <div className='grid border border-gray-600 w-[700px] h-fit rounded-xl px-4 py-4 gap-8'>
                    <div><h1 className='text-xl font-bold tracking-widest'>Item Details</h1></div>
                    <div className='grid gap-6'>
                      <div className='flex justify-between'>
                        <a className='text-xl'>Name</a>
                        <a className='text-xl'>{state.title}</a>
                      </div>
                      <div className='flex justify-between'>
                        <a className='text-xl'>Collection</a>
                        <a className='text-xl'>{state.collection}</a>
                      </div>
                      <div className='flex justify-between'>
                        <a className='text-xl'>Description</a>
                        <a className='text-xl'>{state.description}</a>
                      </div>
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
                      <button onClick={copyAddress} className='bg-gray-800 rounded-xl px-4'><a className='text-xl'>{state.tokenId}</a></button>
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
          </>
      }
    </div>
  )
}
