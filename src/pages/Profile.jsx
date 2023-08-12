import React, { useEffect, useState } from 'react'
import Navbar from "../pages/Navbar"

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
        <div className='bg-black h-screen text-white'>
            <div className='pt-12'>
                <Navbar />
            </div>
            <div className='grid gap-6'>
                <div className='flex justify-between items-center pl-24 pt-24'>
                    <div className='border-2 border-white h-32 w-32 rounded-xl'></div>
                    <button className='bg-white text-black text-lg h-12 w-40 rounded-xl font-bold mr-24'>Edit Profile</button>
                </div>
                <div className='flex ml-24 border-2 border-white w-fit p-3 rounded-2xl h-8 justify-center items-center'>
                    <h1 className='text-white'>{walletAddress}</h1>
                </div>
            </div>
        </div>
    )
}
