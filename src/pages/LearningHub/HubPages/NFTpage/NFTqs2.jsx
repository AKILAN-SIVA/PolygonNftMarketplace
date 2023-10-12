import React from 'react'
import Lottie from 'react-lottie';
import qs2Asset from "../../HubAssets/NFTqs2Asset.json"

export const NFTqs2 = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: qs2Asset,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className='w-full h-fit'>
      <div className='grid justify-start items-center gap-6'>
        <h1 className='text-4xl font-semibold tracking-wider'>2. Why NFT?</h1>
        <p className='text-2xl tracking-wider text-justify px-12 font-raleway font-thin'>
          NFTs offer a groundbreaking way to establish ownership and authenticity in the digital realm.
          They empower creators by enabling direct sales to fans and collectors, reducing dependence on traditional intermediaries.
          NFTs create unique digital scarcity, enhancing the value of digital content. They have found applications in art, music,
          gaming, and beyond, opening new revenue streams for content creators and providing collectors with provable ownership of rare items.
          NFT's have their potential to reshape the digital economy by revolutionizing how we buy, sell, and own digital assets makes them a
          significant innovation.
        </p>
        <div className='pt-8'>
          <Lottie options={defaultOptions} height={450} width={500} />
        </div>
      </div>
    </div>
  )
}
