import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import Marketplace from "../Marketplace.json";
import AddressIcon from "../assets/addressIcon.png";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ViewnftBidding = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const { state } = useLocation();
  const [listPrice, setListPrice] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [BidPrice, setBidPrice] = useState("");
  const [durationInSeconds, setDurationInSeconds] = useState("");

  const PlaceBid = async () =>{
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        let contract = new ethers.Contract(Marketplace.address,Marketplace.abi,signer);
        let price = ethers.utils.parseUnits(BidPrice,"ether");
        let transaction = await contract.bid(state.data.biddingId,{value: price});
        await transaction.wait();

      }catch(e){
        console.log("Cannot place bid "+e);
      }
  }

  const CompleteBidding = async () =>{
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(Marketplace.address,Marketplace.abi,signer);
      let transaction = await contract.completeAuction(state.data.biddingId);
      await transaction.wait();

    }catch(e){
      console.log("Cannot complete bid "+e);
    }
}

const WithdrawMyBid = async () =>{
  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(Marketplace.address,Marketplace.abi,signer);
    let transaction = await contract.withdrawBid(state.data.biddingId);
    await transaction.wait();

  }catch(e){
    console.log("Withdraw my bid "+e);
  }
}

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          console.log(accounts[0]);
          setWalletAddress(accounts[0]);
          console.log("address ", state.data.owner);
        });
    } else {
      alert("Install Metamask Extension");
    }
  });

  const copyAddress = (e) => {
    copy(state.data.tokenId);
    toast("Token id copying...");
  };

  return (
    <div className="bg-black h-full w-full text-white">
      <div className="pt-12">
        <Navbar />
      </div>
      <div className="grid justify-start mt-12 ml-24 gap-8">
        <div className="flex justify-start gap-16">
          <div className="border-2 border-gray-600 rounded-3xl shadow-md">
            <img
              src={state.data.photo}
              className="w-[700px] h-[500px] rounded-3xl"
            />
          </div>
          <div className="grid justify-start items-start h-fit gap-8 mt-8">
            <span className="text-2xl font-bold">
              Created by
              <div className="flex gap-1 mt-4">
                <img src={AddressIcon} className="h-8 w-8" />
                <h1 className="text-white justify-start">
                  {state.data.owner.substring(0, 7)}....
                  {state.data.owner.substring(12, 19)}
                </h1>
              </div>
            </span>
            {state.data.Buyer == null ? (
              <div></div>
            ) : (
              <span className="text-2xl font-bold">
                Owned by
                <div className="flex gap-1 mt-4">
                  <img src={AddressIcon} className="h-8 w-8" />
                  <h1 className="text-white justify-start">
                    {state.data.Buyer.substring(0, 7)}....
                    {state.data.Buyer.substring(12, 19)}
                  </h1>
                </div>
              </span>
            )}
            <span className="text-3xl font-bold">Price: {state.data.price}</span>
            <span className="text-3xl font-bold">Status: {state.data.status}(Open)</span>
            <span className="text-3xl font-bold">Listingid: {state.data.biddingId}</span>
            {/* <span className="text-3xl font-bold">{state.data.startAt}</span> */}
            {/* <span className="text-3xl font-bold">{state.data.endAt}</span> */}
            <div className="flex flex-col gap-2 ">
              <div className="flex gap-2 text-lg">
                <p>Bid Price</p><p className="text-red-800">*</p>
              </div>
              <input
                className="flex flex-col rounded-xl bg-transparent border-gray-400 border-2 h-12 w-[650px] p-4"
                type="text"
                name="collection" onChange={(e)=> setBidPrice(e.target.value)}
                placeholder="Make Bid . . ." value={BidPrice}
              ></input>
              <button className="pt-2 bg-gray-600 inline-block p-2" onClick={PlaceBid}>Place Bid</button>
              <button className="pt-2 bg-gray-600 inline-block p-2" onClick={CompleteBidding}>Complete Action</button>
              <button className="pt-2 bg-gray-600 inline-block p-2" onClick={WithdrawMyBid}>Withdraw my bid</button>
            </div>
          </div>
        </div>
        <div className="pb-16">
          <div className="bg-gray-900 border-2 border-gray-500 w-[700px] h-48 rounded-lg">
            <div className="grid px-4 py-6 gap-2">
              <div className="flex justify-between">
                <a className="text-xl">Contract Address</a>
                <a className="text-xl">
                  {Marketplace.address.substring(0, 6)}....
                  {Marketplace.address.substring(11, 16)}
                </a>
              </div>
              <div className="flex justify-between">
                <a className="text-xl">Token Id</a>
                <button
                  onClick={copyAddress}
                  className="bg-gray-800 rounded-xl px-4"
                >
                  <a className="text-xl">{state.data.tokenId}</a>
                </button>
              </div>
              <div className="flex justify-between">
                <a className="text-xl">Contract</a>
                <a className="text-xl">ERC-721</a>
              </div>
              <div className="flex justify-between">
                <a className="text-xl">Network</a>
                <a className="text-xl">Polygon</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
