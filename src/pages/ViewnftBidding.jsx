import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import Marketplace from "../Marketplace.json";
import AddressIcon from "../assets/addressIcon.png";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Identicon from "react-identicons";

export const ViewnftBidding = () => {
  let count;
  const [walletAddress, setWalletAddress] = useState("");
  const { state } = useLocation();
  const [BidPrice, setBidPrice] = useState("");
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [highestBidderAddress, updateHighestBidderAddress] = useState("0x");

  let interval = useRef();

  const startTimer = () => {
    const countDownDate = new Date(state.data.timeInStr).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  async function getNFTData() {
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      Marketplace.address,
      Marketplace.abi,
      signer
    );

    let highestBidder = await contract.getHighestBidder(state.data.biddingId);
    console.log(highestBidder, "is highest bidder")
    updateHighestBidderAddress(highestBidder);

    //create an NFT Token
    let transaction = await contract.getAllBiddingWithListingID();
    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        const price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          biddingId: i.biddingId.toNumber(),
          tokenId: i.tokenId.toNumber(),
          bidder: i.bidder,
          photo: meta.image,
          title: meta.title,
          description: meta.description,
          collection: meta.collection,
          date: meta.timeInStr,
        };

        return item;
      })
    );

    updateData(items);
    updateFetched(true);
    updateAddress(addr);
    setLoadingProgress(false);
  }

  if (!dataFetched) getNFTData();
  console.log(data);
  console.log("highestBidderAddress", highestBidderAddress)
  console.log(address);

  const PlaceBid = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );
      let price = ethers.utils.parseUnits(BidPrice, "ether");
      let transaction = await contract.bid(state.data.biddingId, {
        value: price,
      });
      await transaction.wait();
    } catch (e) {
      console.log("Cannot place bid " + e);
    }
  };

  const CompleteBidding = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );
      let transaction = await contract.completeAuction(state.data.biddingId);
      await transaction.wait();
    } catch (e) {
      console.log("Cannot complete bid " + e);
    }
  };

  const WithdrawMyBid = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );
      let transaction = await contract.withdrawBid(state.data.biddingId);
      await transaction.wait();
    } catch (e) {
      console.log("Withdraw my bid " + e);
    }
  };

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
  const copyBidderAddress = (addr) => {
    copy(addr);
    toast("Address copying...");
  };

  console.log(state.data.status);
  let circleCommonClasses = "h-6 w-6 bg-current  rounded-full";
  return (
    <div className="bg-black h-full w-full text-white">
      <div className="pt-12">
        <Navbar />
      </div>
      {loadingProgress ? (
        <>
          <div className="flex justify-center mt-96 gap-6">
            <div className={`${circleCommonClasses} mt-1 animate-bounce`}></div>
            <div
              className={`${circleCommonClasses} mt-1 animate-bounce200`}
            ></div>
            <div
              className={`${circleCommonClasses} mt-1 animate-bounce400`}
            ></div>
          </div>
        </>
      ) : (
        <>
          <div className="grid justify-start mt-12 ml-24 gap-8">
            <div className="flex justify-start gap-16">
              <div className="border-2 border-gray-600 rounded-3xl shadow-md">
                <img
                  src={state.data.photo}
                  className="w-[700px] h-[800px] rounded-3xl"
                />
              </div>
              <div className="grid justify-start items-start h-fit gap-8 mt-8">
                <span className=" flex justify-start gap-6 text-2xl font-bold">
                  Created by
                  <div className="flex gap-1">
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
                  <span className="flex justify-start gap-6 text-2xl font-bold">
                    Owned by
                    <div className="flex gap-1">
                      <img src={AddressIcon} className="h-8 w-8" />
                      <h1 className="text-white justify-start">
                        {state.data.Buyer.substring(0, 7)}....
                        {state.data.Buyer.substring(12, 19)}
                      </h1>
                    </div>
                  </span>
                )}
                <span className="text-3xl font-bold">
                  Price: {state.data.price}
                </span>
                {timerDays == "00" &&
                timerHours == "00" &&
                timerMinutes == "00" &&
                timerSeconds == "00" ? (
                  <span className="text-3xl font-bold">Bidding Expired</span>
                ) : (
                  <span className="text-3xl font-bold">
                    Bidding ends at {state.data.timeInStr}
                  </span>
                )}
                <div className="flex justify-center items-center gap-32">
                  <div className="grid text-6xl font-bold gap-4">
                    <span>{timerDays}</span>
                    <span className="text-lg">Days</span>
                  </div>
                  <div className="grid text-6xl font-bold gap-4">
                    <span>{timerHours}</span>
                    <span className="text-lg">Hours</span>
                  </div>
                  <div className="grid text-6xl font-bold gap-4">
                    <span>{timerMinutes}</span>
                    <span className="text-lg">Minutes</span>
                  </div>
                  <div className="grid text-6xl font-bold gap-4">
                    <span>{timerSeconds}</span>
                    <span className="text-lg">Seconds</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ">
                  <div className="flex gap-2 text-lg"></div>
                  {timerDays == "00" &&
                  timerHours == "00" &&
                  timerMinutes == "00" &&
                  timerSeconds == "00" ? (
                    <>
                      {(address == highestBidderAddress ||
                      address == state.data.owner) && state.data.status != 0 ? (
                        <button
                          className="pt-2 bg-gray-600 inline-block p-2"
                          onClick={CompleteBidding}
                        >
                          Complete Action
                        </button>
                      ) : (
                        <div>
                          {data.length != 0 ? (
                            <>
                              {data.map((value, index) => {
                                if (
                                  address == value.bidder &&
                                  value.biddingId == state.data.biddingId
                                ) {
                                  return (
                                    <div>
                                      <button
                                        className="pt-2 bg-gray-600 inline-block p-2 w-full"
                                        onClick={WithdrawMyBid}
                                      >
                                        Withdraw my bid
                                      </button>
                                    </div>
                                  );
                                }
                              })}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                      {/* {
                            (data.map((value,index)=>{
                              if(address == value.bidder){
                                count = count+1;
                              }
                            }))
                          } */}

                      {/* {data.map((value,index)=>{
                          if(count >=1){
                            return <div >
                            <button
                            className="pt-2 bg-gray-600 inline-block p-2"
                            onClick={WithdrawMyBid}
                          >
                            Withdraw my bid
                          </button>
                          </div>
                          }
                          
                        })} */}
                      {/* <button
                            className="pt-2 bg-gray-600 inline-block p-2"
                            onClick={WithdrawMyBid}
                          >
                            Withdraw my bid
                          </button> */}
                    </>
                  ) : (
                    <>
                    <div>
                      <p>
                        Bid Price <span className="text-red-800">*</span>
                      </p>

                      <input
                        className="flex flex-col rounded-xl bg-transparent border-gray-400 border-2 h-12 w-[650px] p-4zzzzzz"
                        type="text"
                        name="collection"
                        onChange={(e) => setBidPrice(e.target.value)}
                        placeholder="Make Bid . . ."
                        value={BidPrice}
                      ></input>
                      <button
                        className="pt-2 bg-gray-600 inline-block p-2 w-full mt-4"
                        onClick={PlaceBid}
                      >
                        Place Bid
                      </button>
                    </div>
                    </>
                  )}
                  <div className="pt-12">
                    <p className="text-3xl">Bid History</p>
                    <div>
                      {data.map((value, index) => {
                        if (value.tokenId == state.data.tokenId) {
                          return (
                            <div className="grid mt-8">
                              <div className="flex justify-between">
                                <div className="flex gap-4">
                                  <Identicon
                                    string={value.bidder}
                                    size={50}
                                    className="border border-gray-500 rounded-3xl"
                                  />
                                  <button
                                    onClick={copyBidderAddress}
                                    className="bg-gray-900 rounded-xl p-2"
                                  >
                                    <h1 className="text-white justify-start tracking-widest">
                                      {(value.bidder).substring(0, 7)}....
                                      {(value.bidder).substring(21, 29)}
                                    </h1>
                                  </button>
                                </div>
                                <div>
                                  <span className="text-2xl ">{value.price}</span>
                                </div>
                              </div>
                              {/* <p className="text-xl">
                                Bidder: <span>{value.bidder}</span> Price:{" "}
                                <span>{value.price}</span>
                              </p> */}
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-16">
              <div className="bg-gray-900 border-2 border-gray-500 w-[700px] h-fit rounded-lg">
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
                    <a className="text-xl">Listing Id</a>
                    <button
                      onClick={copyAddress}
                      className="bg-gray-800 rounded-xl px-4"
                    >
                      <a className="text-xl">{state.data.biddingId}</a>
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
        </>
      )}
    </div>
  );
};
