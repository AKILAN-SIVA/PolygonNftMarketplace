import React from 'react'
import Wallet from "../../HubAssets/Wallet.png"
export const Metamaskqs1 = () => {
    return (
        <div className='w-full h-fit'>
            <div className='grid justify-start items-center gap-6'>
                <h1 className='text-4xl font-semibold tracking-wider'>1. What is Metamask?</h1>
                <p className='text-lg tracking-wider text-justify px-12'>
                    MetaMask is a popular cryptocurrency wallet and browser extension that allows
                    users to manage their Ethereum-based assets and interact with decentralized
                    applications (DApps) on the Ethereum blockchain. It provides a secure and user-
                    friendly interface for storing, sending, and receiving Ethereum and ERC-20
                    tokens. MetaMask also enables users to connect their wallets to various DApps,
                    facilitating activities like decentralized trading, gaming, and DeFi participation. It&#39;s
                    available as a browser extension for Chrome, Firefox, and other browsers,
                    making it convenient for Ethereum enthusiasts to access the blockchain
                    ecosystem. Overall, MetaMask is a crucial tool for engaging with the
                    decentralized web.
                </p>
                <div className='flex justify-center items-center w-full h-full'>
                <img src={Wallet} alt='3DWallet' className='w-[500px] h-[500px]' />
                </div>
            </div>
        </div>
    )
}
