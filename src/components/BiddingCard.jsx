import React, { useState, useEffect, useRef } from 'react'
import { ethers } from "ethers";
import Marketplace from '../Marketplace.json';
import { useNavigate } from 'react-router-dom';
import Identicon from "react-identicons";
import AddressIcon from "../assets/addressIcon.png";
import Music from "../assets/music.png"
import { FaCirclePlay } from "react-icons/fa6";
// import { FaCirclePause } from "react-icons/fa6";
import Active from "../assets/active.json"
import Lottie from 'react-lottie';


export const BiddingCard = (data) => {

  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [isVideoReady, setIsVideoReady] = useState(false);
  // const [play, setPlay] = useState(false);


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
    navigate(`/viewNftBidding/`, { state: data });
  }

  // let audio = new Audio(data.data.photo)
  // const myRef = useRef(audio);
  // const startAudio = () => {
  //   myRef.current.play();
  //   console.log("playing...");
  //   setPlay(true);
  // };

  // const pauseAudio = () => {
  //   console.log("paused...");
  //   myRef.current.pause();
  //   setPlay(false);
  // };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Active,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className='bg-[#171717] border-2 border-gray-600 rounded-lg h-100 w-72 hover:cursor-pointer scale-100 hover:scale-105' onClick={viewNft}>
      <div className='grid items-start gap-2 p-4'>
        <div className='flex gap-2'>
          <Identicon string={data.data.owner} size={30} className="border border-gray-500 rounded-2xl" />
          <h1 className='text-xl font-bold tracking-widest'>{data.data.title}</h1>
        </div>
        <div className='mt-2'>
          {
            data.data.format == "1" ?
              <div className='relative'>
                <img src={data.data.photo} className='h-56 w-full rounded-xl ' />
                {
                  data.data.status == 0 ?
                    <div className='absolute top-2 right-1'>
                      <span className='bg-red-900 text-sm p-1 px-2 rounded-full tracking-widest font-semibold'>
                        Expired
                      </span>
                    </div>
                    :
                    <div className='absolute top-2 right-1'>
                      <span className='flex items-center bg-gray-400 p-1 px-1 text-sm text-[#000000] rounded-full tracking-widest gap-1 font-semibold'>
                        <Lottie options={defaultOptions}
                          height={16}
                          width={16} />
                        Active
                      </span>
                    </div>
                }
              </div>
              :
              <></>
          }
          {
            data.data.format == "2" ?
              <>
                <div className="relative justify-center">
                  <img src={Music} className='h-56 w-full rounded-xl' />
                  {
                    data.data.status == 0 ?
                      <div className='absolute top-2 right-1'>
                        <span className='bg-red-900 text-sm p-1 px-2 rounded-full tracking-widest font-semibold'>
                          Expired
                        </span>
                      </div>
                      :
                      <div className='absolute top-2 right-1'>
                        <span className='flex items-center bg-gray-400 p-1 px-1 text-sm text-[#000000] rounded-full tracking-widest gap-1 font-semibold'>
                          <Lottie options={defaultOptions}
                            height={16}
                            width={16} />
                          Active
                        </span>
                      </div>
                  }
                  <button className="absolute bottom-1 right-1 rounded-full  flex justify-center items-center p-2"><FaCirclePlay size={32} /></button>
                  {/* {
                    play ?
                      <button className="absolute bottom-1 right-1 rounded-full  flex justify-center items-center p-2" onClick={pauseAudio}><FaCirclePause size={32} /></button>
                      :
                      <button className="absolute bottom-1 right-1 rounded-full  flex justify-center items-center p-2" onClick={startAudio}><FaCirclePlay size={32} /></button>
                  } */}
                  {/* <audio src={data.data.photo} className='w-56 h-10' controls controlsList='nodownload'  /> */}
                </div>
              </>
              :
              <></>
          }
          {
            data.data.format == "3" ?
              <>
                <div className='relative'>
                  <video loop autoPlay src={data.data.photo} className='h-56 w-full rounded-xl' controlsList='nodownload' onLoadedMetadata={handleLoadedMetadata} controls />
                  {
                    data.data.status == 0 ?
                      <div className='absolute top-2 right-1'>
                        <span className='bg-red-900 text-sm p-1 px-2 rounded-full tracking-widest font-semibold'>
                          Expired
                        </span>
                      </div>
                      :
                      <div className='absolute top-2 right-1'>
                        <span className='flex items-center bg-gray-400 p-1 px-1 text-sm text-[#000000] rounded-full tracking-widest gap-1 font-semibold'>
                          <Lottie options={defaultOptions}
                            height={16}
                            width={16} />
                          Active
                        </span>
                      </div>
                  }
                </div>
              </>
              :
              <></>
          }
        </div>
        <div className='grid text-white text-xl gap-2 mt-4'>
          <div className='flex justify-between items-end '>
            <div className='flex gap-1 items-center'><img src={AddressIcon} className='h-6 w-6' /><h1>{data.data.price}</h1></div>
            <h1 className='text-lg'>{data.data.collection}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
