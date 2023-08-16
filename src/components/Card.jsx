import React from 'react';
import { ethers } from "ethers";
import Marketplace from '../Marketplace.json';
import { useNavigate } from 'react-router-dom';


function Card(data) {
  const navigate = useNavigate();
  function viewNft() {
    navigate(`/viewNft/`,{ state: data});
  }

const BuyNFT = async() =>{

  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  //Pull the deployed contract instance
  let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

    let salePrice = ethers.utils.parseUnits(data.data.price,'ether');
    let tokenId = data.data.tokenId;
    let transaction = await contract.executeSale(tokenId, {value: salePrice});

    await transaction.wait();
  }catch(e){
    console.log("NFT buy error : "+e);
  }

  

}

  return ( 
    <div className='bg-gray-800 border-2 border-gray-900 rounded-xl h-100 w-60 hover:cursor-pointer' onClick={viewNft}>
      <div className='grid items-start gap-2 '>
        <div className='transition p-3 hover:p-2 ease-in'>
          <img src={data.data.photo} className='h-44 w-96 rounded-xl' />
        </div>
        <div className='grid p-2 text-white text-xl gap-2'>
          <h1>Name: {data.data.title}</h1>
          <h1>Collection: {data.data.collection}</h1>
          <h1>Price: {data.data.price} matic</h1>
          <h1>Description: {data.data.description}</h1>
        </div>
      </div>
    </div>
  )
}


export default Card;