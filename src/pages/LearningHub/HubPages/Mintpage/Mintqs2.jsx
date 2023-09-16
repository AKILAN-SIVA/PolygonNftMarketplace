import React from 'react'
import Mintqs2AssetsS1 from "../../HubAssets/Mintqs2AssetsS1.png"
import Mintqs2AssetsS2 from "../../HubAssets/Mintqs2AssetsS2.png"
import Mintqs2AssetsS3_1 from "../../HubAssets/Mintqs2AssetsS3_1.png"
import Mintqs2AssetsS3_2 from "../../HubAssets/Mintqs2AssetsS3_2.png"
import Mintqs2AssetsS4 from "../../HubAssets/Mintqs2AssetsS4.png"
import Mintqs2AssetsS5 from "../../HubAssets/Mintqs2AssetsS5.png"
import Mintqs2AssetsS6 from "../../HubAssets/Mintqs2AssetsS6.png"


export const Mintqs2 = () => {
    return (
        <div className='w-full h-fit'>
            <div className='grid justify-start items-center gap-6'>
                <h1 className='text-4xl font-semibold tracking-wider'>2. How to mint an NFT?</h1>
                <h1 className='text-xl font-semibold tracking-wider px-12'>Note: A step by step guide to mint your first Non-Fungible Token in NFT Marketplace</h1>
                <p className='text-lg tracking-wider text-justify px-12'>
                    <span className='text-2xl font-semibold'>Step 1:</span> To Mint an NFT, navigate to create page.
                </p>
                <div className='flex justify-center items-center w-full h-full py-12'>
                    <img src={Mintqs2AssetsS1} alt='metamaskqs3a' className='w-[800px] h-[500px]' />
                </div>
                <p className='text-lg tracking-wider text-justify px-12'>
                    <span className='text-2xl font-semibold'>Step 2:</span> Then, enter the required details.
                </p>
                <div className='flex justify-center items-center w-full h-full py-12'>
                    <img src={Mintqs2AssetsS2} alt='metamaskqs3a' className='w-[800px] h-[500px]' />
                </div>
                <p className='text-lg tracking-wider text-justify px-12'>
                    <span className='text-2xl font-semibold'>Step 3:</span> Then choose, method of minting nft either by uploading files or by generating ai image.
                </p>
                <p className='text-lg tracking-wider text-justify px-12'>
                    <span className='text-2xl font-semibold'>Step 3.1:</span> In upload file , it accepts image, video and audio files.
                </p>
                <div className='flex justify-center items-center w-full h-full py-12'>
                    <img src={Mintqs2AssetsS3_1} alt='metamaskqs3a' className='w-[800px] h-[500px]' />
                </div>
                <p className='text-lg tracking-wider text-justify px-12'>
                    <span className='text-2xl font-semibold'>Step 3.2:</span> Then in Ai image , generate image by adding essential description and if it satisfies then click ‘download’ and upload the image to mint NFT.
                </p>
                <div className='flex justify-center items-center w-full h-full py-12'>
                    <img src={Mintqs2AssetsS3_2} alt='metamaskqs3a' className='w-[800px] h-[500px]' />
                </div>
                <p className='text-lg tracking-wider text-justify px-12'>
                    <span className='text-2xl font-semibold'>Step 4:</span> Then click “Create” to mint NFT.
                </p>
                <div className='flex justify-center items-center w-full h-full py-12'>
                    <img src={Mintqs2AssetsS4} alt='metamaskqs3a' className='w-[800px] h-[500px]' />
                </div>
                <p className='text-lg tracking-wider text-justify px-12'>
                    <span className='text-2xl font-semibold'>Step 5:</span> Then metamask popup will be shown , confirm the transaction to mint the NFT. The transaction process takes 2-3 minutes.
                </p>
                <div className='flex justify-center items-center w-full h-full py-12'>
                    <img src={Mintqs2AssetsS5} alt='metamaskqs3a' className='w-[800px] h-[500px]' />
                </div>
                <p className='text-lg tracking-wider text-justify px-12'>
                    <span className='text-2xl font-semibold'>Step 6:</span> Then minted nft will be shown in profile page
                </p>
                <div className='flex justify-center items-center w-full h-full py-12'>
                    <img src={Mintqs2AssetsS6} alt='metamaskqs3a' className='w-[800px] h-[500px]' />
                </div>
            </div>
        </div>
    )
}
