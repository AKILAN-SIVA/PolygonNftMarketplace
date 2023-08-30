import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import Marketplace from "../Marketplace.json";
import AddressIcon from "../assets/addressIcon.png";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRef } from "react";

// const formatTime = (time) => {
//   // let hours = Math.floor(time / 60*60);
//   let minutes = Math.floor(time / 60);
//   let seconds = Math.floor(time - minutes  * 60)
//   // if(hours <= 10) hours = "0"+hours;
//   if(minutes <= 10) minutes = "0"+minutes;
//   if(seconds <= 10) seconds = "0"+seconds;
//   return minutes + ":" + seconds
//   // return hours + ":" + minutes + ':' + seconds
// }
export const ViewnftBidding = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const { state } = useLocation();
  const [BidPrice, setBidPrice] = useState("");
  const [countDown, setCountDown] = useState(600);
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [filData, setFilData] = useState("");

  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');
  // const [inputDate, setInputDate] = useState(state.data.timeInStr);
  // const [currentDate, setCurrentDate] = useState(inputDate);

  let interval = useRef();

  const startTimer = () => {
    const countDownDate = new Date(state.data.timeInStr).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if(distance < 0) {
        clearInterval(interval.current);
      }
      else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000)
  }

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    }
  });

  // useEffect(() => {
  //   const changingDate = new Date(inputDate);
  //   const currentDate = new Date();
  //   const totalSeconds = (changingDate - currentDate) / 1000;

  //   setDays(formatTime(Math.floor(totalSeconds / 3600 / 24)));
  //   setHours(Math.floor(totalSeconds / 3600) % 24);
  //   setMinutes(Math.floor(totalSeconds / 60) % 60);
  //   setSeconds(Math.floor(totalSeconds % 60));
  // },[currentDate])

  // function formatTime(time) {
  //   return time < 10 ? `0${time}` : time ;
  // }
  // useEffect(() => {
  //   timerId.current = setInterval(() => {
  //     setCountDown(prev => prev -1)
  //   }, 1000)
  //   return () => clearInterval(timerId.current)
  // },[])

  // useEffect(() => {
  //   if(countDown <=0 ){
  //     clearInterval(timerId.current);
  //   }
  // },[countDown])

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
  }

if (!dataFetched) getNFTData();
  console.log(data);

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

  // useEffect(() => {
  //   if (window.ethereum) {
  //     window.ethereum
  //       .request({ method: "eth_requestAccounts" })
  //       .then((accounts) => {
  //         console.log(accounts[0]);
  //         setWalletAddress(accounts[0]);
  //         console.log("address ", state.data.owner);
  //       });
  //   } else {
  //     alert("Install Metamask Extension");
  //   }
  // });

  // const [userUTCTime,setUserUTCTime] = useState(null);
  // const [Hours,setHours] = useState(null);
  // const [Min,setMin] = useState(null);
  // const [seconds,setSeconds] = useState(null);


  // const fixDate = (date) => {
    
  //   const timezoneOffsetMinutes = new Date().getTimezoneOffset();
  //   const localTimestamp = date * 1000 + timezoneOffsetMinutes * 60 * 1000;
  //   const localTime = new Date(localTimestamp);
  //   const hr = localTime.getHours();
  //   const min = localTime.getMinutes();
  //   const sec = localTime.getSeconds();
  //   console.log(hr+5);
  //   console.log(min+30);
  //   console.log(sec);
  //   setHours(hr+5);
  //   setMin(min+30);
  //   setSeconds(sec);
  //   setUserUTCTime(localTime);
  //   return localTime;
  // };

  // useEffect(()=>{
  //   fixDate(state.data.endAt);
  // })

  // const ending = fixDate(state.data.endAt);
  // console.log(ending);

  // const time = fixDate(state.data.endAt);
  const copyAddress = (e) => {
    copy(state.data.tokenId);
    toast("Token id copying...");
  };
  console.log(state.data.status);

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
              className="w-[700px] h-full rounded-3xl"
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
            {/* <span className="text-3xl font-bold">
              Status: {(timerDays=="00" && timerHours=="00" && timerMinutes=="00" && timerSeconds=="00") ? "Bidding Closed" : "Bidding is Open" }
            </span> */}
            {(timerDays=="00" && timerHours=="00" && timerMinutes=="00" && timerSeconds=="00") ? (
              <span className="text-3xl font-bold">
                Bidding Expired
              </span>
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
              <div className="flex gap-2 text-lg">
               
              </div>
              {
                (timerDays=="00" && timerHours=="00" && timerMinutes=="00" && timerSeconds=="00") ?
                <>
                <button
                className="pt-2 bg-gray-600 inline-block p-2"
                onClick={CompleteBidding}
              >
                Complete Action
              </button>
              <button
                className="pt-2 bg-gray-600 inline-block p-2"
                onClick={WithdrawMyBid}
              >
                Withdraw my bid
              </button>
                </>
                :
                <>
                 <p>Bid Price</p>
                <p className="text-red-800">*</p>
                <input
                className="flex flex-col rounded-xl bg-transparent border-gray-400 border-2 h-12 w-[650px] p-4"
                type="text"
                name="collection"
                onChange={(e) => setBidPrice(e.target.value)}
                placeholder="Make Bid . . ."
                value={BidPrice}
              ></input>
              <button
                className="pt-2 bg-gray-600 inline-block p-2"
                onClick={PlaceBid}
              >
                Place Bid
              </button>
                </>
              }
              
              
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
    </div>
  );
};
