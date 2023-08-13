import React, { useEffect, useState } from 'react'
import Navbar from "../pages/Navbar"
import AddressIcon from "../assets/addressIcon.png";
import Identicon from 'react-identicons';
import Card from "../components/Card";

export const Profile = () => {
    const [walletAddress, setWalletAddress] = useState('');
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.request({ method: "eth_requestAccounts" })
                .then((accounts) => {
                    console.log(accounts[0]);
                    setWalletAddress(accounts[0]);
                });
        } else {
            alert("Install Metamask Extension");
        }
    })
    return (
        <div className='bg-black h-full text-white'>
            <div className='pt-12'>
                <Navbar />
            </div>
            <div className='grid ml-28 gap-6'>
                <div className='flex justify-between items-center pt-12'>
                    <div className='border-2 border-white h-32 w-32 rounded-3xl'><Identicon string={walletAddress} className="h-32 w-36 rounded-2xl" size={125}/></div>
                    {/* <div className='grid justify-start items-start'>
                        <h1 className='text-white'>{walletAddress.substring(0, 6)}....{walletAddress.substring(11, 16)}</h1>
                        <h1 className='text-white'>{walletAddress.substring(0, 6)}....{walletAddress.substring(11, 16)}</h1>
                        <h1 className='text-white'>{walletAddress.substring(0, 6)}....{walletAddress.substring(11, 16)}</h1>
                    </div> */}
                    <button className='bg-white text-black text-lg h-12 w-40 rounded-xl font-bold mr-28'>Edit Profile</button>
                </div>
                <div className='flex w-fit  h-8 justify-center items-center gap-1'>
                    <img src={AddressIcon} className='h-8 w-8' /><h1 className='text-white'>{walletAddress.substring(0, 6)}....{walletAddress.substring(11, 16)}</h1>
                </div>
                <div className='border border-[#171717] h-0 w-11/12 mr-2'> </div>
                <div className='text-3xl font-bold p-2'>
                    <h1>Collections</h1>
                </div>
                <div>
                    <Card name="Akilan" collection="pubg" description="pubg lover" />
                </div>
            </div>
        </div>
    )
}
