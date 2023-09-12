import React from 'react'
import AboutNft from "../assets/AboutNft.png"
import Wallet from "../assets/Wallet.png"
import ListNft from "../assets/ListNft.png"
import MintNft from "../assets/MintNft.png"
import BidNft from "../assets/BidNft.png"
export const LearningHub = () => {
    return (
        <div className='grid items-center gap-28 pt-12'>
            <div className='flex justify-around items-start w-full '>
                <img src={AboutNft} alt='3Dnft' />
                <div className=''>
                    <h1>About NFTs</h1>
                </div>
            </div>
            <div className='flex justify-around items-start w-full '>
                <div className=''>
                    <h1>About Metamask</h1>
                </div>
                <img src={Wallet} alt='3DWallet' />
            </div>
            <div className='flex justify-around items-start w-full '>
                <img src={MintNft} alt='3DMint' />
                <div className=''>
                    <h1>How to mint NFT</h1>
                </div>
            </div>
            <div className='flex justify-around items-start w-full '>
                <div className=''>
                    <h1>How to list NFT</h1>
                </div>
                <img src={ListNft} alt='3DList' />
            </div>
            <div className='flex justify-around items-start w-full '>
            <img src={BidNft} alt='3DBid' />
                <div className=''>
                    <h1>How to bid NFT</h1>
                </div>
            </div>
        </div>
    )
}
