import React, { useEffect, useState } from 'react'
import Navbar from "../pages/Navbar"
import AddressIcon from "../assets/addressIcon.png";
import Identicon from 'react-identicons';
import Card from "../components/Card";
import { ethers } from 'ethers';
import Marketplace from '../Marketplace.json'
import axios from 'axios';
import { db } from '../components/FirebaseConfig';
import { onValue, ref } from "firebase/database";

export const Profile = () => {
    // const [walletAddress, setWalletAddress] = useState('');
    // useEffect(() => {
    //     if (window.ethereum) {
    //         window.ethereum.request({ method: "eth_requestAccounts" })
    //             .then((accounts) => {
    //                 console.log(accounts[0]);
    //                 setWalletAddress(accounts[0]);
    //             });
    //     } else {
    //         alert("Install Metamask Extension");
    //     }
    // })

    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [address, updateAddress] = useState("0x....");
    const [SoldData, updateSoldData] = useState([]);
    const [FetchedSoldData, updateFetchedSoldData] = useState(false);
    const [SoldAddress, updateSoldAddress] = useState("0x....");
    
    const [profileInfo, setProfileInfo] = useState([]);

    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            const details = snapshot.val();
            if (details !== null) {
                Object.values(details).map((profile) => {
                    setProfileInfo((oldArray) => [...oldArray, profile]);
                });
            }
        });
    }, []);

    async function getNFTData() {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

        let transaction = await contract.getMyNFTs();
        const items = await Promise.all(transaction.map(async i => {
            const tokenURI = await contract.tokenURI(i.tokenId);
            let meta = await axios.get(tokenURI);
            meta = meta.data;
            const price = ethers.utils.formatUnits(i.price.toString(), 'ether');

            // let price = i.price;
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

    async function getNFTSoldData() {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

        let transaction = await contract.getMySoldNFTs();
        const items = await Promise.all(transaction.map(async i => {
            const tokenURI = await contract.tokenURI(i.tokenId);
            let meta = await axios.get(tokenURI);
            meta = meta.data;
            const price = ethers.utils.formatUnits(i.price.toString(), 'ether');

            // let price = i.price;
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                owner: i.owner,
                Buyer: i.newOwner,
                photo: meta.image,
                title: meta.title,
                description: meta.description,
                collection: meta.collection,
            }

            return item;
        }))

        updateSoldData(items);
        updateFetchedSoldData(true);
        updateSoldAddress(addr);
        // console.log(items);

    }

    if (!dataFetched)
        getNFTData();
        
    if(!FetchedSoldData)
    {getNFTSoldData();}
    
    return (
        <div className='bg-black h-fit w-full text-white'>
            <div className='pt-12'>
                <Navbar />
            </div>
            <div className='grid ml-28 gap-6'>
                <div className='flex justify-start items-center pt-12'>
                    <div className='border-2 border-white h-32 w-32 rounded-3xl'><Identicon string={address} className="h-32 w-36 rounded-2xl" size={125} /></div>
                    <div className='flex justify-start items-start ml-24 gap-20'>
                        <div className='grid justify-center items-center gap-4'>
                            <h1 className='text-6xl font-bold'>7</h1>
                            <h1 className='text-lg font-bold'>NFT mined</h1>
                        </div>
                        <div className='grid justify-center items-center gap-4'>
                            <h1 className='text-6xl font-bold'>$ 7</h1>
                            <h1 className='text-lg font-bold'>Total value</h1>
                        </div>
                        <div className='grid justify-center items-center gap-4'>
                            <h1 className='text-6xl font-bold'>7</h1>
                            <h1 className='text-lg font-bold'>NFT Sold</h1>
                        </div>
                    </div>
                </div>

                <h1 className='text-3xl font-mono font-bold'>i_am_akilan</h1>
                <div className='flex justify-between w-full h-8 items-center gap-1'>
                    <div className='flex gap-1'>
                        <img src={AddressIcon} className='h-8 w-8' />
                        <h1 className='text-white justify-start'>{address.substring(0, 6)}....{address.substring(11, 16)}</h1>
                    </div>
                    <div className=''>
                        <button className='bg-white hover:bg-gray-300 text-black text-lg h-12 w-40 rounded-xl font-bold mr-28' onClick={() => window.location.replace("/editProfile")}>Edit Profile</button>
                    </div>
                </div>
                <div className='border border-[#171717] h-0 w-11/12 mr-2'> </div>
                <div className='text-3xl font-bold p-2'>
                    <h1>Collections</h1>
                </div>
                {
                    data.length == 0 ?
                        <div className='flex flex-wrap justify-center text-2xl font-bold pb-4 gap-6'>
                            <h1>Oops!, NFT not yet created</h1>
                        </div>
                        :
                        <div className='flex flex-wrap pb-4 gap-6'>
                            {data.map((value, index) => {
                                return <Card data={value} key={index} />;
                            })}
                        </div>
                }

            </div>
        </div>
    )
}
