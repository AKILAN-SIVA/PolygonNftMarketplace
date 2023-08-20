import React from 'react';
import { ethers } from "ethers";
import Marketplace from '../Marketplace.json';
import { useNavigate } from 'react-router-dom';
import Identicon from "react-identicons";
import AddressIcon from "../assets/addressIcon.png";


function Card(data) {
  const navigate = useNavigate();
  function viewNft() {
    navigate(`/viewNft/`, { state: data });
  }

  return (
    <div className='bg-[#171717] border-2 border-gray-600 rounded-lg h-100 w-64 hover:cursor-pointer scale-100 hover:scale-110' onClick={viewNft}>
      <div className='grid items-start gap-2 p-4'>
        <div className='flex justify-start gap-4'>
          <Identicon string={data.data.owner} size={30} className="border border-gray-500 rounded-2xl" />
          <h1 className='text-xl font-bold tracking-widest'>{data.data.title}</h1>
        </div>
        <div className='mt-2'>
          <img src={data.data.photo} className='h-56 w-full rounded-xl ' />
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


export default Card;