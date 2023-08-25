//import React, { useEffect, useState } from 'react'
import Navbar from "../pages/Navbar"
import Marketplace from '../Marketplace.json'
import { async } from '@firebase/util';
import { ethers } from 'ethers';

import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./pages.css"
import axios from 'axios';
import AddressIcon from "../assets/addressIcon.png";

export const Home = () => {

  const [totTokenId, setTokenId] = useState('');
  const [totSoldNft, setTotSoldNft] = useState('');
  const slideRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [allNfts, setAllNfts] = useState([]);

  useEffect(() => {
    getContractFunc();
  }, [])


  async function getContractFunc() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

    let totalTokenId = await contract.getTotalMintedTokens();
    let totalSoldNft = await contract.getTotalSoldTokens();
    let nfts = await contract.getAllNfts();

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
      }

      return item;
    }))

    setTokenId(totalTokenId.toNumber());
    setTotSoldNft(totalSoldNft.toNumber());
    setAllNfts(items);
    console.log(items)

  }



  const handleClickNext = () => {
    let items = slideRef.current.querySelectorAll(".item");
    slideRef.current.appendChild(items[0]);
  };

  const handleClickPrev = () => {
    let items = slideRef.current.querySelectorAll(".item");
    slideRef.current.prepend(items[items.length - 1]);
  };

  const data = [
    {
      id: 1,
      imgUrl: "https://i.postimg.cc/PrMGqZwx/pexels-m-venter-1659437.jpg",
      desc: "Some beautiful roads cannot be discovered without getting loss.",
      name: "EXPLORE NATURE",
    },
    {
      id: 2,
      imgUrl:
        "https://i.postimg.cc/bw6KxhLf/pexels-eberhard-grossgasteiger-1062249.jpg",
      desc: "Some beautiful roads cannot be discovered without getting loss.",
      name: "EXPLORE NATURE",
    },
    {
      id: 3,
      imgUrl:
        "https://i.postimg.cc/CMkTW9Mb/pexels-eberhard-grossgasteiger-572897.jpg",
      desc: "Some beautiful roads cannot be discovered without getting loss.",
      name: "EXPLORE NATURE",
    },
    {
      id: 5,
      imgUrl: "https://i.postimg.cc/6qdkn4bM/pexels-joyston-judah-933054.jpg",
      desc: "Some beautiful roads cannot be discovered without getting loss.",
      name: "EXPLORE NATURE",
    },
    {
      id: 6,
      imgUrl:
        "https://i.postimg.cc/RVm59Gqy/pexels-roberto-nickson-2559941.jpg",
      desc: "Some beautiful roads cannot be discovered without getting loss.",
      name: "EXPLORE NATURE",
    },
  ];

  return (
    <div className='bg-black min-h-screen h-fit w-full text-white'>
      <div className='pt-12'>
        <Navbar />
      </div>

      <div className="container">
        <div className="loadbar" style={{ width: `${loadingProgress}%` }}></div>
        <div id="slide" ref={slideRef}>
          {allNfts.map((value, index) => (
            <div
              key={index}
              className="item"
              style={{ backgroundImage: `url(${value.photo})`, borderRadius: '50px' }}
            >
              <div className="content">
                <div className="grid gap-6 justify-center items-center">
                  <div className="text-7xl font-bold text-gray-100 tracking-wider">{value.title}</div>
                  <div className="flex gap-1 text-3xl font-semibold text-gray-100"><img src={AddressIcon} className='h-8 w-8' /> {value.price}</div>
                  <button className="bg-white text-black font-bold w-32 rounded-2xl  " onClick={() => window.location.replace('/exploreNft')}>See more</button>
                </div>

              </div>
            </div>
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

      {/* <div className='grid justify-center mx-24'>
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
      </div> */}
    </div>
  )
}
