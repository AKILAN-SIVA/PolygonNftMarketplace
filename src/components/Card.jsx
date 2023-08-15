import React from 'react'
import PreviewImage from '../assets/previewImage.png';
import { Link } from 'react-router-dom';
import BuyNFT from '../services/blockchain';

function Card(data) {

  function viewNft() {
    window.location.replace("/viewNft");
    // pathname: "/viewNft/"+ data.name
  }

  const handleClick = async() =>{
      await BuyNFT(data.data.tokenId);
  }

  return (
    // <Link to={viewNft}>
    <div className='bg-gray-500 border-2 border-gray-900 rounded-xl h-100 w-60 hover:cursor-pointer' >
      <div className='grid items-start gap-2 '>
        <div className=''>
          <img src={data.data.photo} className='h-44 w-96 rounded-xl' />
        </div>
        <div className='grid p-2 text-white text-xl '>
          <h1>Name: {data.data.title}</h1>
          <h1>Collection: {data.data.collection}</h1>
          <h1>Price: {data.data.price} matic</h1>
          <h1>Description: {data.data.description}</h1>
          <button className='border-gray-900 bg-black ' onClick={handleClick}>Buy NFT</button>
        </div>
      </div>
    </div>
    // </Link>
  )
}


export default Card;