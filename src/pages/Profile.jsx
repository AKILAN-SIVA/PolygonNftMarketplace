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
    const [sum, updateSum] = useState("0");
    const [CountNFt, updateNftCount] = useState("0");
    const [NftSold, updateNftSoldCount] = useState();
    const [profileInfo, setProfileInfo] = useState([]);
    const [showSold, setShowSold] = useState(false);


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
        let sum1 = 0;
        let NFTcount = 0;
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
            sum1 += Number(price);
            NFTcount += 1;
            return item;
        }))
        updateSum(sum1);
        updateData(items);
        updateFetched(true);
        updateAddress(addr);
        updateNftCount(NFTcount);

    }

    async function getNFTSoldData() {
        let itemsSoldCount = 0;
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
            itemsSoldCount += 1;
            return item;
        }))

        updateSoldData(items);
        updateFetchedSoldData(true);
        updateSoldAddress(addr);
        updateNftSoldCount(itemsSoldCount);
        // console.log(items);

    }

    if (!dataFetched)
        getNFTData();

    if (!FetchedSoldData) { getNFTSoldData(); }

    return (
        <div className='bg-black min-h-screen h-fit w-full text-white'>
            <div className='pt-12'>
                <Navbar />
            </div>
            <div className='grid ml-28 gap-6'>
                <div className='flex justify-start items-center pt-12'>
                    <div className='border-2 border-white h-32 w-32 rounded-3xl'><Identicon string={address} className="h-32 w-36 rounded-2xl" size={125} /></div>
                    <div className='flex justify-start items-start ml-32 gap-20'>
                        <div className='grid justify-center items-center gap-4'>
                            <h1 className='text-5xl font-bold'>{CountNFt}</h1>
                            <h1 className='text-lg font-bold'>NFT mined</h1>
                        </div>
                        <div className='grid justify-center items-center gap-4'>
                            <h1 className='text-5xl font-bold'>{sum}</h1>
                            <h1 className='text-lg font-bold'>Total value</h1>
                        </div>
                        <div className='grid justify-center items-center gap-4'>
                            <h1 className='text-5xl font-bold'>{NftSold}</h1>
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
                <div className='text-4xl font-bold p-2'>
                    <h1>Collections</h1>
                </div>
                <div className='grid border-2 border-gray-800  mr-28 rounded-xl p-4'>
                    {
                        data.length == 0 ?
                            <div className='flex flex-wrap justify-center text-2xl font-bold '>
                                <h1>Oops!, NFT not yet created</h1>
                            </div>
                            :
                            <div>
                                <div className='flex justify-start '>
                                    <button className='bg-gray-900 w-56 p-2' onClick={() => setShowSold(false)}><a className='text-3xl font-bold '>Created</a></button>
                                    <button className='bg-gray-800 w-56 p-2' onClick={() => setShowSold(true)}><a className='text-3xl font-bold'>Sold</a></button>
                                </div>
                                <div className='flex '>
                                    {
                                        showSold == false ?
                                            <div className='flex flex-wrap gap-6 bg-gray-900 w-full h-full p-8'>
                                                {data.map((value, index) => {
                                                    return <Card data={value} key={index} />;
                                                })}
                                            </div> :
                                            <div className='flex flex-wrap gap-6 bg-gray-800 w-full h-full p-8'>
                                                {SoldData.map((value, index) => {
                                                    return <Card data={value} key={index} />;
                                                })}
                                            </div>
                                    }
                                </div>
                            </div>

                    }
                </div>
                <br />
            </div>
        </div>
    )
}
