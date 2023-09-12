import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Identicon from "react-identicons";
import AddressIcon from "../assets/addressIcon.png";
import Music from "../assets/music.png"
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";

const CarouselCard = (data) => {

  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [play, setPlay] = useState(false);


  const handleLoadedMetadata = () => {
    setIsVideoReady(true);
  };

  // Use useEffect to automatically play the video when it's ready
  useEffect(() => {
    if (isVideoReady && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVideoReady]);

  let audio = new Audio(data.data.photo)
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


  function viewNft() {
    // navigate(`/viewNftBidding/`, { state: data });
  }
  return (
    <div className='bg-[#171717] border-2 border-gray-600 rounded-lg h-100 w-64 hover:cursor-pointer scale-100 ' onClick={viewNft}>
      <div className='grid items-start gap-2 p-4'>
        <div className='flex justify-start gap-4'>
          <Identicon string={data.data.owner} size={30} className="border border-gray-500 rounded-2xl" />
          <h1 className='text-xl font-bold tracking-widest'>{data.data.title}</h1>
        </div>
        <div className='mt-2'>
          {
            data.data.format == "1" ?
              <>
                <div>
                  <img src={data.data.photo} className='h-56 w-full rounded-xl ' />
                </div>
              </>
              :
              <></>
          }
          {
            data.data.format == "2" ?
              <>
                <div className="relative justify-center">
                  <img src={Music} className='h-56 w-full rounded-t-xl' />
                  {
                    play ?
                      <button className="absolute bottom-1 right-1 rounded-full  flex justify-center items-center p-2" onClick={pauseAudio}><FaCirclePause size={30} /></button>
                      :
                      <button className="absolute bottom-1 right-1 rounded-full  flex justify-center items-center p-2" onClick={startAudio}><FaCirclePlay size={30} /></button>
                  }
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
                  <video loop autoPlay src={data.data.photo} className='h-56 w-full rounded-xl' controlsList='nodownload' onLoadedMetadata={handleLoadedMetadata} controls />
                </div>
              </>
              :
              <></>
          }
        </div>
        <div className='grid text-white text-xl gap-2 mt-4'>
          <div className='flex justify-between items-end text-lg'>
            <div className='flex gap-1 items-center'><img src={AddressIcon} className='h-6 w-6' /><h1>{data.data.price}</h1></div>
            <h1>{data.data.collection}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}



export default CarouselCard 