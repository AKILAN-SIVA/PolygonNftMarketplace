import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'

export const Editprofile = () => {

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
    });

    return (
        <div className='bg-black h-screen text-white'>
            <div className='pt-12'>
                <Navbar />
            </div>
            <div className='grid justify-center mt-12  gap-6'>
                <div><h1 className='text-3xl font-bold tracking-widest'>Hi! Edit your Profile here . . .</h1></div>
                <div className='grid justify-center items-start gap-8'>
                    <div className="flex flex-col gap-2 ">
                        <div className="flex gap-2 text-lg">
                            <p>UserName</p><p className="text-red-800">*</p>
                        </div>
                        <input
                            className="flex flex-col rounded-xl bg-transparent border-gray-400 border-2 h-12 w-[650px] p-4"
                            type="text"
                            name="username"
                            placeholder="Enter your UserName . . ."
                        ></input>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <div className="flex gap-2 text-lg">
                            <p>Instagram</p><p className="text-red-800">*</p>
                        </div>
                        <input
                            className="flex flex-col rounded-xl bg-transparent border-gray-400 border-2 h-12 w-[650px] p-4"
                            type="text"
                            name="username"
                            placeholder="Link to your Instagram . . ."
                        ></input>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <div className="flex gap-2 text-lg">
                            <p>Twitter</p><p className="text-red-800">*</p>
                        </div>
                        <input
                            className="flex flex-col rounded-xl bg-transparent border-gray-400 border-2 h-12 w-[650px] p-4"
                            type="text"
                            name="username"
                            placeholder="Link to your Twitter . . ."
                        ></input>
                    </div>
                    <div className="pb-8">
                        <button className="bg-white text-black h-12 w-full font-bold text-xl rounded-lg">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
