//import React, { useEffect, useState } from 'react'
import Navbar from "../pages/Navbar"
import Marketplace from '../Marketplace.json'
import { async } from '@firebase/util';
import { ethers } from 'ethers';
import Carousel from 'react-grid-carousel'
import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./pages.css"
import axios from 'axios';
import AddressIcon from "../assets/addressIcon.png";
import { useNavigate } from "react-router-dom";
import CarouselCard from "../components/CarouselCard";
import CountUp from "react-countup";
import { FiArrowUpRight } from "react-icons/fi";
import { RiSeparator } from "react-icons/ri";
import music from "../assets/music.png"

export const Home = () => {

  const [totTokenId, setTokenId] = useState('');
  const [totSoldNft, setTotSoldNft] = useState('');
  const [totBidNft, setTotBidNft] = useState('');
  const [totUser, setTotUser] = useState('');
  const slideRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [allNfts, setAllNfts] = useState([]);
  const [allBidNfts, setAllBidNfts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getContractFunc();
  }, [])


  async function getContractFunc() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

    let totalTokenId = await contract.getTotalMintedTokens();
    let totalSoldNft = await contract.getTotalSoldTokens();
    let totalBidNft = await contract.getTotalBiddedTokens();
    let totalCreators = await contract.getTotalUser();
    let nfts = await contract.getAllNfts();
    let bidNfts = await contract.getAllBiddedNfts();

    const items = await Promise.all(nfts.map(async i => {
      const tokenURI = await contract.tokenURI(i.tokenId);
      let meta = await axios.get(tokenURI);
      meta = meta.data;

      const price = ethers.utils.formatUnits(i.price.toString(), 'ether');
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        owner: i.owner,
        photo: meta.image,
        title: meta.title,
        description: meta.description,
        collection: meta.collection,
        format: meta.fileFormat,
      }

      return item;
    }))

    const bids = await Promise.all(bidNfts.map(async i => {
      const tokenURI = await contract.tokenURI(i.tokenId);
      let meta = await axios.get(tokenURI);
      meta = meta.data;

      const price = ethers.utils.formatUnits(i.price.toString(), 'ether');
      // const deadline = daysLeft(i.deadline);

      let item = {
        biddingId: i.biddingId.toNumber(),
        owner: i.seller,
        netPrice: price,
        status: i.status,
        endAt: i.deadline.toNumber(),
        price,
        tokenId: i.tokenId.toNumber(),
        photo: meta.image,
        title: meta.title,
        description: meta.description,
        collection: meta.collection,
      }

      return item;
    }))

    setTokenId(totalTokenId.toNumber());
    setTotSoldNft(totalSoldNft.toNumber());
    setTotBidNft(bids.length);
    setTotUser(totalCreators.toNumber());
    setAllNfts(items);
    setAllBidNfts(bids);
    console.log(bids);
    console.log(totalBidNft.toNumber());
    setLoadingProgress(false)
  }

  const handleClickNext = () => {
    let items = slideRef.current.querySelectorAll(".item");
    slideRef.current.appendChild(items[0]);
  };

  const handleClickPrev = () => {
    let items = slideRef.current.querySelectorAll(".item");
    slideRef.current.prepend(items[items.length - 1]);
  };

  let circleCommonClasses = 'h-6 w-6 bg-current  rounded-full';
  return (
    <div className='bg-[#070017] min-h-screen h-fit w-full text-white'>
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
            <div className="container">
              <div className="loadbar" style={{ width: `${loadingProgress}%` }}></div>
              <div id="slide" ref={slideRef}>
                {allNfts.map((value, index) => (
                  value.format == "1" ?
                    <div
                      key={index}
                      className="item"
                      style={{ backgroundImage: `url(${value.photo})`, borderRadius: '30px', }}
                      onClick={() => navigate("/searchNft", { state: value })}
                    >
                      <div className="content">
                        <div className="bg-[#3c3d3c] grid gap-6 justify-center items-center rounded-xl p-4">
                          <div className="text-7xl font-bold text-gray-100 tracking-wider">{value.title}</div>
                          <div className="flex gap-1 text-3xl font-semibold text-gray-100"><img src={AddressIcon} className='h-8 w-8' /> {value.price}</div>
                        </div>

                      </div>
                    </div>
                    :
                    <></>
                ))}
              </div>

              <div className="buttons">
                <div className="flex justify-center gap-6">
                  <button id="prev" onClick={handleClickPrev}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </button>
                  <button id="next" onClick={handleClickNext}>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full min-h-screen"></div>
            <div className="flex justify-center "><RiSeparator size={80} /></div>
            <div className="flex justify-center pt-24">
              <h1 className="text-5xl text-white font-semibold">Top <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Bids</span></h1>
            </div>
            <div className="grid justify-center items-center gap-12 pt-20 px-28">

              <Carousel cols={5} rows={1} loop={true} autoplay={10000}>
                {
                  allBidNfts.map((value, index) => (
                    <Carousel.Item>
                      <CarouselCard data={value} key={index} />
                    </Carousel.Item>
                  ))
                }
              </Carousel>

            </div>
            <div className="flex justify-center items-center pt-16 gap-4">
              <button className="flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-widest text-xl text-black font-semibold  w-56 h-14 rounded-3xl" onClick={() => window.location.replace("/bidNft")}>View More <FiArrowUpRight size={28} /></button>
            </div>
            <div className="flex justify-center pt-24"><RiSeparator size={80} /></div>
            <div className="pt-24">
              <div className="flex justify-center items-center gap-32">
                <div className="grid justify-center gap-6">
                  <h1 className="text-8xl font-bold"><CountUp start={0} end={totTokenId} /></h1>
                  <h1 className="text-xl font-bold">Total Mined</h1>
                </div>
                <div className="border-2 border-gray-800 w-1 h-40" ></div>
                <div className="grid justify-center gap-6">
                  <h1 className="text-8xl font-bold"><CountUp start={0} end={totSoldNft} /></h1>
                  <h1 className="text-xl font-bold">Total Sold</h1>
                </div>
                <div className="border-2 border-gray-800 w-1 h-40" ></div>
                <div className="grid justify-center gap-6">
                  <h1 className="text-8xl font-bold"><CountUp start={0} end={totBidNft} /></h1>
                  <h1 className="text-xl font-bold">Total Bids</h1>
                </div>
                <div className="border-2 border-gray-800 w-1 h-40" ></div>
                <div className="grid justify-center gap-6">
                  <h1 className="text-8xl font-bold"><CountUp start={0} end={totUser} /></h1>
                  <h1 className="text-xl font-bold">Creators</h1>
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-24"><RiSeparator size={80} /></div>
            <div className="pt-24">
              <div className="bg-white w-fit h-[500px]">
                <div className="relative">
                  <img src={music} />
                  <button className="absolute bottom-14 right-14 bg-gray-700 rounded-full h-12 w-12">play</button>
                </div>
              </div>
            </div>
          </>
      }
    </div>
  )
}
