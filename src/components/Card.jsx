import React from 'react'
import PreviewImage from '../assets/previewImage.png';
import { Link } from 'react-router-dom';

function Card(data) {

  function viewNft() {
    window.location.replace("/viewNft");
    // pathname: "/viewNft/"+ data.name
  }

  return (
    // <Link to={viewNft}>
    <div className='bg-gray-500 border-2 border-gray-900 rounded-xl h-80 w-60 hover:cursor-pointer' onClick={viewNft}>
      <div className='grid items-start gap-2 '>
        <div className=''>
          <img src={data.data.photo} className='h-44 w-96 rounded-xl' />
        </div>
        <div className='grid p-2 text-white text-xl '>
          <h1>Name: {data.data.title}</h1>
          <h1>Collection: {data.data.collection}</h1>
          <h1>Description: {data.data.description}</h1>
        </div>
      </div>
    </div>
    // </Link>
  )
}


export default Card;