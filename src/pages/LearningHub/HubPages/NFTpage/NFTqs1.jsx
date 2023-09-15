import React from 'react'
import Lottie from 'react-lottie';
import qs1Asset from "../../HubAssets/NFTqs1Asset.json"

export const NFTqs1 = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: qs1Asset,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


  return (
    <div className='w-full h-fit'>
      <div className='grid justify-start items-center gap-6'>
        <h1 className='text-4xl font-semibold tracking-wider'>1. What is NFT?</h1>
        <p className='text-lg tracking-wider text-justify px-12'>
          NFTs, or Non-Fungible Tokens, are unique digital assets stored on blockchains like Ethereum. Each NFT represents
          ownership or authenticity of specific digital or physical items, such as art, collectibles, and virtual goods.
          They enable creators to sell directly to buyers, cutting out middlemen, and provide collectors with provable ownership.
          NFTs' value is driven by an item's rarity, demand, and the blockchain's transparency. They've gained traction in art, gaming,
          and entertainment.
        </p>
        <div className='pt-8'>
          <Lottie options={defaultOptions} height={450} width={500} />
        </div>
      </div>
    </div>
  )
}
