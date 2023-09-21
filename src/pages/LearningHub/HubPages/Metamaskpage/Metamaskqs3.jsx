import React from 'react'
import Metamaskqs3a from "../../HubAssets/Metamaskqs3a.png"
export const Metamaskqs3 = () => {
    return (
        <div className='w-full h-fit'>
            <div className='grid justify-start items-center gap-6'>
                <h1 className='text-4xl font-semibold tracking-wider'>3. How to create a account?</h1>
                <p className='text-xl tracking-wider text-justify px-12 font-serif'>
                    <span className='text-3xl font-semibold'>Install MetaMask:</span> Visit the official MetaMask website <a href='https://metamask.io/' className='text-blue-500 underline underline-offset-2' target='_blank'>metamask.io</a> and click on
                    the &quot;Download&quot; or &quot;Install MetaMask&quot; button. It&#39;s available as a browser
                    extension for Chrome, Firefox, and other popular browsers. Follow the
                    installation instructions for your chosen browser.
                </p>
                <div className='flex justify-center items-center w-full h-full py-12'>
                    <img src={Metamaskqs3a} alt='metamaskqs3a' className='w-[800px] h-[500px] border-2 border-gray-700' />
                </div>
                <p className='text-xl tracking-wider text-justify px-12 font-serif'>
                    <span className='text-3xl font-semibold'>Set Up Your Wallet:</span> After installation, click on the MetaMask extension icon in your browser&#39;s
                    toolbar. Click &quot;Get Started&quot; to create a new wallet. Create a strong password for your wallet. Make sure to remember it as it&#39;s
                    crucial for wallet access. Read and accept the terms of use and privacy policy.
                </p>
                <p className='text-xl tracking-wider text-justify px-12 font-serif'>
                    <span className='text-3xl font-semibold'>Backup Your Seed Phrase:</span> MetaMask will generate a 12-word seed phrase.
                    This is your wallet&#39;s backup key. Write it down on paper and store it securely.
                    Never share it with anyone or store it digitally.
                </p>
                <p className='text-xl tracking-wider text-justify px-12 font-serif'>
                    <span className='text-3xl font-semibold'>Confirm Your Seed Phrase:</span> To ensure you&#39;ve correctly written down your seed
                    phrase, MetaMask will ask you to confirm it by selecting the words in the correct
                    order.
                </p>
                <p className='text-xl tracking-wider text-justify px-12 font-serif'>
                    <span className='text-3xl font-semibold'>Wallet Ready:</span> Congratulations! Your MetaMask wallet is now set up and secure.
                    You can now use it to store, send, and receive Ethereum and other compatible
                    tokens.
                </p>
                <p className='text-xl tracking-wider text-justify px-12 font-serif'>
                    <span className='text-3xl font-semibold'>Add Funds:</span> To add funds to your wallet, you can purchase Ethereum from a
                    cryptocurrency exchange or receive it from another wallet. Click &quot;Buy&quot; within
                    MetaMask or use the wallet address to receive ETH.
                </p>
                <p className='text-xl tracking-wider text-justify px-12 font-serif'>
                    <span className='text-3xl font-semibold'>Explore DApps:</span> MetaMask allows you to interact with decentralized applications
                    (DApps). Visit a DApp you&#39;re interested in, and MetaMask will automatically
                    connect your wallet.
                </p>
                <p className='text-xl tracking-wider text-justify px-12 font-serif'>
                    <span className='text-3xl font-semibold'>Security Tips:</span> Remember to keep your password and seed phrases safe and
                    never share them. Use hardware wallets for extra security if you plan to store a
                    significant amount of cryptocurrency.
                </p>
                <p className='text-xl tracking-wider text-justify px-12 font-serif'>
                    By following these steps, users should be able to easily create a MetaMask
                    account and start exploring the world of blockchain and decentralized
                    applications.
                </p>
            </div>
        </div>
    )
}
