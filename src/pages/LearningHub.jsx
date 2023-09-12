import React from 'react'
import AboutNft from "../assets/AboutNft.png"
import Wallet from "../assets/Wallet.png"
import ListNft from "../assets/ListNft.png"
import MintNft from "../assets/MintNft.png"
import BidNft from "../assets/BidNft.png"
import { FiArrowUpRight } from "react-icons/fi";


export const LearningHub = () => {
    return (
        <div className='grid items-center gap-28 pt-12'>
            <div className='flex justify-center items-start w-full '>
                <img src={AboutNft} alt='3Dnft' className='w-[500px] h-[500px]' />
                <div className='grid justify-center items-center w-1/2 mt-20 gap-12'>
                    <h1 className='flex justify-center text-5xl font-bold tracking-widest'>What is NFT ?</h1>
                    <p className='text-center text-xl tracking-wider leading-loose'>
                        An NFT, or Non-Fungible Token, is a digital certificate of ownership stored on<br />
                        a blockchain, representing unique digital or physical assets<br />
                        like art, collectibles, or virtual items
                    </p>
                    <div className='flex justify-center w-full'>
                        <button className="flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-widest text-xl text-black font-semibold  w-56 h-14 rounded-3xl" onClick={() => window.location.replace("/bidNft")}>Learn More <FiArrowUpRight size={28} /></button>
                    </div>
                </div>
            </div>
            <div className='flex justify-around items-start w-full '>
                <div className='grid justify-center items-center w-1/2 mt-20 gap-12'>
                    <h1 className='flex justify-center text-5xl font-bold tracking-widest'>Metamask Integration</h1>
                    <p className='text-center text-xl tracking-wider leading-loose'>
                        MetaMask is a popular cryptocurrency wallet and browser extension that allows users<br />
                        to manage and interact with decentralized applications (DApps) on the Ethereum <br />
                        blockchain directly from their web browsers
                    </p>
                    <div className='flex justify-center w-full'>
                        <button className="flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-widest text-xl text-black font-semibold  w-56 h-14 rounded-3xl" onClick={() => window.location.replace("/bidNft")}>Learn More <FiArrowUpRight size={28} /></button>
                    </div>
                </div>
                <img src={Wallet} alt='3DWallet' className='w-[500px] h-[500px]' />
            </div>
            <div className='flex justify-around items-start w-full '>
                <img src={MintNft} alt='3DMint' className='w-[500px] h-[500px]' />
                <div className='grid justify-center items-center w-1/2 mt-20 gap-12'>
                    <h1 className='flex justify-center text-5xl font-bold tracking-widest'>How to mint a NFT ?</h1>
                    <p className='text-center text-xl tracking-wider leading-loose'>
                        Minting an NFT involves creating a unique digital asset on a blockchain, often <br />
                        associated with art, collectibles, or digital content. During the minting process,<br />
                        creators encode ownership and metadata onto the blockchain, establishing <br />
                        provenance and authenticity for their digital creation
                    </p>
                    <div className='flex justify-center w-full'>
                        <button className="flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-widest text-xl text-black font-semibold  w-56 h-14 rounded-3xl" onClick={() => window.location.replace("/bidNft")}>Learn More <FiArrowUpRight size={28} /></button>
                    </div>
                </div>
            </div>
            <div className='flex justify-around items-start w-full '>
                <div className='grid justify-center items-center w-1/2 mt-20 gap-12'>
                    <h1 className='flex justify-center text-5xl font-bold tracking-widest'>How to list a NFT ?</h1>
                    <p className='text-center text-xl tracking-wider leading-loose'>
                        Listing an NFT refers to the process of making a non-fungible token available for sale<br />
                        on an online marketplace or platform. Sellers specify details such as pricing,<br />
                        duration, and terms for potential buyers to engage with and purchase the <br />
                        NFT, facilitating the transfer of ownership of digital or physical assets
                    </p>
                    <div className='flex justify-center w-full'>
                        <button className="flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-widest text-xl text-black font-semibold  w-56 h-14 rounded-3xl" onClick={() => window.location.replace("/bidNft")}>Learn More <FiArrowUpRight size={28} /></button>
                    </div>
                </div>
                <img src={ListNft} alt='3DList' className='w-[500px] h-[500px]' />
            </div>
            <div className='flex justify-around items-start w-full '>
                <img src={BidNft} alt='3DBid' className='w-[500px] h-[500px]' />
                <div className='grid justify-center items-center w-1/2 mt-20 gap-12'>
                    <h1 className='flex justify-center text-5xl font-bold tracking-widest'>How to bid a NFT ?</h1>
                    <p className='text-center text-xl tracking-wider leading-loose'>
                        Bidding on an NFT involves participating in an auction-style sale of a non-fungible <br />
                        token. Interested buyers submit bids for the NFT, often specifying the amount <br />
                        they are willing to pay. The highest bidder at the end of the auction wins the NFT <br />
                        and is obligated to complete the purchase, while others who placed bids<br />
                        do not acquire the NFT and retain their cryptocurrency
                    </p>
                    <div className='flex justify-center w-full'>
                        <button className="flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-widest text-xl text-black font-semibold  w-56 h-14 rounded-3xl" onClick={() => window.location.replace("/bidNft")}>Learn More <FiArrowUpRight size={28} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
