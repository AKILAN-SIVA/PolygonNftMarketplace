import React from 'react'
import Listqs3Asset from "../../HubAssets/Listqs3Asset.png"
export const Listqs3 = () => {
    return (
        <div className='w-full h-fit'>
            <div className='grid justify-start items-center gap-6'>
                <h1 className='text-4xl font-semibold tracking-wider'>3. How to buy an NFT?</h1>
                <p className='text-lg tracking-wider text-justify px-12'>
                    NFTs, or Non-Fungible Tokens, are unique digital assets stored on blockchains like Ethereum. Each NFT represents
                    ownership or authenticity of specific digital or physical items, such as art, collectibles, and virtual goods.
                    They enable creators to sell directly to buyers, cutting out middlemen, and provide collectors with provable ownership.
                    NFTs' value is driven by an item's rarity, demand, and the blockchain's transparency. They've gained traction in art, gaming,
                    and entertainment.
                </p>
                <div className='flex justify-center items-center w-full h-full'>
                    <img src={Listqs3Asset} alt='listqs1asset' className='w-[600px] h-[600px]' />
                </div>
            </div>
        </div>
    )
}
