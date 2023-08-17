import React from 'react'
import Navbar from "../pages/Navbar"
import Card from '../components/Card'
import { ethers } from 'ethers';
import Marketplace from '../Marketplace.json'
import axios from 'axios';
import { useState } from 'react';

export const Explore = () => {

    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [address, updateAddress] = useState("0x");

    async function getNFTData() {


        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

        //create an NFT Token
        let transaction = await contract.getAllNfts();



        // /*
        // * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
        // * and creates an object of information that is to be displayed
        // */

        const items = await Promise.all(transaction.map(async i => {
            const tokenURI = await contract.tokenURI(i.tokenId);
            let meta = await axios.get(tokenURI);
            meta = meta.data;

            const price = ethers.utils.formatUnits(i.price.toString(),'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                owner: i.owner,
                photo: meta.image,
                title: meta.title,
                description: meta.description,
                collection: meta.collection,
            }

            return item;
        }))

        updateData(items);
        updateFetched(true);
        updateAddress(addr);

    }

    if (!dataFetched)
        getNFTData();
    return (
        <div className='bg-black min-h-screen h-fit w-full text-white'>
            <div className='pt-12'>
                <Navbar />
            </div>
            <div className='justify-start pt-20 ml-24'>
                <div className='flex flex-wrap gap-8'>
                    {data.map((value, index) => {
                        return <Card data={value} key={index} />
                    })}
                </div>

            </div>
        </div>
    )
}
