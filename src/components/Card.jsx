import React, { useState, useEffect, useRef } from 'react';
import { ethers } from "ethers";
import Marketplace from '../Marketplace.json';
import { useNavigate } from 'react-router-dom';
import Identicon from "react-identicons";
import Music from "../assets/music.png"
import { FaPlay } from "react-icons/fa";

function Card(data) {

  const videoRef = useRef(null);
  const navigate = useNavigate();
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


  function viewNft() {
    console.log(data)
    navigate(`/viewNft/`, { state: data });
  }

  return (
    <div className='bg-gray-800  border-gray-700 rounded-xl h-[370px] w-60 hover:cursor-pointer font-mono hover:scale-105' onClick={viewNft}>
      {
        data.data.format == "1" ?
          <>
            <div>
              <img src={data.data.photo} className='h-60 w-full rounded-t-xl' />
            </div>
          </>
          :
          <></>
      }
      {
        data.data.format == "2" ?
          <>
            <div  className="relative justify-center">
              <img src={Music} className='h-60 w-full rounded-t-xl' />
              <button className="absolute bottom-6 right-5 rounded-full h-8 w-8 bg-gray-500 flex justify-center items-center p-2"><FaPlay size={15} /></button>
              {/* <audio src={data.data.photo} className='w-56 h-10' controls controlsList='nodownload'  /> */}
            </div>
          </>
          :
          <></>
      }
      {
        data.data.format == "3" ?
          <>
            <div>
              <video loop autoPlay src={data.data.photo} className='h-60 w-full rounded-t-xl' controlsList='nodownload' onLoadedMetadata={handleLoadedMetadata} controls />
            </div>
          </>
          :
          <></>
      }

      <div className='flex justify-start items-center gap-4 pt-4 pl-4 pb-2'>
        <Identicon string={data.data.owner} size={30} className="border border-gray-500 rounded-2xl overflow-hidden" />
        <h1 className='text-xl font-bold tracking-widest'>{data.data.title}</h1>
      </div>
      <div className='flex justify-between px-4 py-2 font-bold'>
        <div className='grid justify-center tracking-widest gap-1'>
          <h1 className='text-sm text-gray-400'>Price</h1>
          <h1 className='text-lg'>{data.data.price}</h1>
        </div>
        <div className='grid justify-center tracking-widest gap-1'>
          <h1 className='text-sm text-gray-400'>Collection</h1>
          <h1 className='text-lg'>{data.data.collection}</h1>
        </div>
      </div>
    </div>
  )
}


export default Card;