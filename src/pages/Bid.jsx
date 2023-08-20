import React from 'react'
import Navbar from "../pages/Navbar"
import { ethers } from 'ethers'
import Marketplace from "../Marketplace.json"
import { useState } from 'react'
import axios from 'axios';
import Card from '../components/Card'
import { BiddingCard } from '../components/BiddingCard'

export const Bid = () => {

  const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);

  const getNFTData = async() => {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      let contract = new ethers.Contract(Marketplace.address,Marketplace.abi,signer);
      let transaction = await contract.getAllBiddedNfts();

      const items = await Promise.all(transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        const price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let startAt = new Date(i.startAt)
        let item = {
            biddingId: i.biddingId,
            owner: i.seller,
            netPrice: price,
            status: i.status,
            startAt: startAt,
            endAt: i.endAt.toNumber(),
            price,
            tokenId: i.tokenId.toNumber(),
            photo: meta.image,
            title: meta.title,
            description: meta.description,
            collection: meta.collection,
        }

        return item;
    }))

    updateData(items);
    updateFetched(true);

}catch(e){
      console.log("Error in getting Bidding details "+e);
    }
  }

  if (!dataFetched)
    getNFTData();

  console.log(data);
  return (
    <div className='bg-black min-h-screen h-fit w-full text-white'>
      <div className='pt-12'>
        <Navbar />
      </div>
      <div className='grid justify-start mx-24'>
        {/* <div className='from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent text-8xl font-bold tracking-wide pt-48 font-serif leading-tight '>
          <h1>Bidding page</h1>
        </div> */}
        <div className='flex flex-wrap gap-6 b w-full h-full py-8'>
          {data.map((value,index) =>{
            return <BiddingCard  data={value} key={index}/>
          })}
        </div>
      </div>
    </div>
  )
}
