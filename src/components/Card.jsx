import React from 'react';
import { ethers } from "ethers";
import Marketplace from '../Marketplace.json';
import { useNavigate } from 'react-router-dom';
import Identicon from "react-identicons";


function Card(data) {
  const navigate = useNavigate();
  function viewNft() {
    console.log(data)
    navigate(`/viewNft/`, { state: data });
  }

  return (
    // <div className='bg-[#171717] border-2 border-gray-600 rounded-lg h-[370px] w-72 hover:cursor-pointer scale-100 hover:scale-110' onClick={viewNft}>
    //   <div className='grid items-start gap-2 p-4'>
    //     <div className='flex justify-start gap-4'>
    //       <Identicon string={data.data.owner} size={30} className="border border-gray-500 rounded-2xl" />
    //       <h1 className='text-xl font-bold tracking-widest'>{data.data.title}</h1>
    //     </div>
    //     <div className='mt-2'>
    //       <img src={data.data.photo} className='h-56 w-full rounded-xl ' />
    //     </div>
    //     <div className='grid text-white text-xl gap-2 mt-4'>
    //       <div className='flex justify-between items-end text-lg'>
    //         <div className='flex gap-1 items-center'><img src={AddressIcon} className='h-6 w-6' /><h1>{data.data.price}</h1></div>
    //         <h1>{data.data.collection}</h1>
    //       </div>
    //     </div>
    //   </div>
    // </div>

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
            <div>
              <img src={data.data.photo} className='h-60 w-full rounded-t-xl' />
            </div>
          </>
          :
          <></>
      }
      {
        data.data.format == "3" ?
          <>
            <div>
              <video src={data.data.photo} className='h-60 w-full rounded-t-xl' controlsList='nodownload' controls/>
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