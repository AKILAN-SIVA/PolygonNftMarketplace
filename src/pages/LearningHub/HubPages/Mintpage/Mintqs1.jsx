import React from 'react'
import Lottie from 'react-lottie';
import qs1Asset from "../../HubAssets/Mintqs1Asset.json"

export const Mintqs1 = () => {

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
                <h1 className='text-4xl font-semibold tracking-wider'>1. What is minting NFT?</h1>
                <p className='text-lg tracking-wider text-justify px-12'>
                    Minting an NFT (Non-Fungible Token) refers to the process of creating a
                    unique digital asset on a blockchain. This asset can represent various
                    digital or physical content forms, such as art, music, videos, collectibles,
                    virtual real estate, and more. When an NFT is minted, it is assigned a
                    distinct set of properties, including ownership, scarcity, and metadata,
                    which make it one-of-a-kind and verifiable on the blockchain.
                </p>
                <div className='pt-8'>
                    <Lottie options={defaultOptions} height={450} width={500} />
                </div>
            </div>
        </div>
    )
}
