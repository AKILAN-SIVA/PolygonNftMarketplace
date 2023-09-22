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
import Music from "../assets/music.png";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";

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
  const [timesec, setTime] = useState();
  const [play, setPlay] = useState(false);
  const [reportMsg, setReportMsg] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);

  let audio = new Audio(state.data.photo);
  const myRef = useRef(audio);
  const startAudio = () => {
    myRef.current.play();
    console.log("playing...");
    setPlay(true);
  };

  const pauseAudio = () => {
    console.log("paused...");
    myRef.current.pause();
    setPlay(false);
  };

  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const handleLoadedMetadata = () => {
    setIsVideoReady(true);
  };

  // Use useEffect to automatically play the video when it's ready
  useEffect(() => {
    if (isVideoReady && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVideoReady]);

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
      const totsec =
        days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
      setTime(totsec);
      // console.log(totsec);
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
    console.log(highestBidder, "is highest bidder");
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
          format: meta.fileFormat,
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
  console.log("highestBidderAddress", highestBidderAddress);
  console.log(address);
  // console.log(timesec);

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
      window.location.reload();
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
      window.location.replace("/bidNft");
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
      window.location.replace("/bidNft");
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

  const copyTokenId = (e) => {
    copy(state.data.tokenId);
    toast("Token id copying...");
  };
  const copyBiddingId = (e) => {
    copy(state.data.biddingId);
    toast("Token id copying...");
  };
  const copyBidderAddress = (addr) => {
    copy(addr);
    toast("Address copying...");
  };

  console.log(state.data.status);
  let circleCommonClasses = "h-6 w-6 bg-current  rounded-full";

  const report = async () => {
    if (reportMsg == "") {
      alert("Enter reason");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      Marketplace.address,
      Marketplace.abi,
      signer
    );
    let transaction = await contract.UserReportNFT(
      state.data.tokenId,
      reportMsg
    );
    await transaction.wait();
    alert("reported");
    window.location.replace("/");
  };

  return (
    <div className="bg-black min-h-screen h-fit w-full text-white">
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
              {state.data.format == "1" ? (
                <>
                  <div className="border-2 border-gray-600 w-[700px] h-[700px] rounded-3xl shadow-md overflow-hidden">
                    <img src={state.data.photo} className="w-full h-full" />
                  </div>
                </>
              ) : (
                <></>
              )}
              {state.data.format == "2" ? (
                <>
                  <div className="relative border-2 border-gray-600 w-[700px] h-[700px] rounded-3xl shadow-md ">
                    <img src={Music} className="w-full h-full rounded-3xl" />
                    {play ? (
                      <button
                        className="absolute bottom-4 right-4 rounded-full  flex justify-center items-center p-2"
                        onClick={pauseAudio}
                      >
                        <FaCirclePause size={40} />
                      </button>
                    ) : (
                      <button
                        className="absolute bottom-4 right-4 rounded-full  flex justify-center items-center p-2"
                        onClick={startAudio}
                      >
                        <FaCirclePlay size={40} />
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
              {state.data.format == "3" ? (
                <>
                  <div className="border-2 border-gray-600 w-[700px] h-[700px] rounded-3xl shadow-md overflow-hidden">
                    <video
                      src={state.data.photo}
                      className="w-full h-full"
                      controls
                      loop
                      autoPlay
                      onLoadedMetadata={handleLoadedMetadata}
                      controlsList="nodownload"
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
              <div className="grid justify-start items-start h-fit gap-8 mt-8">
                <div className="flex justify-between items-center">
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-2xl font-bold">Owned by</span>
                    <div className="bg-purple-500  w-fit flex justify-between h-12 items-center rounded-2xl px-2">
                      <div className="flex items-center gap-1">
                        <img src={AddressIcon} className="h-6 w-6" />
                        <h1 className="text-white justify-start text-lg">
                          {state.data.owner.substring(0, 6)}....
                          {state.data.owner.substring(36, 42)}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div>
                    {timerDays == "00" &&
                    timerHours == "00" &&
                    timerMinutes == "00" &&
                    timerSeconds == "00" ? (
                      <>
                        <h1 className="flex justify-center items-center bg-red-600 p-4 text-white text-lg h-10 rounded-xl">
                          Expired
                        </h1>
                      </>
                    ) : (
                      <>
                        <div className="flex gap-4">
                          <h1 className="flex justify-center items-center bg-green-600 p-4 text-white text-lg h-12 rounded-xl">
                            Active
                          </h1>
                          <div>
                            <button
                              className="flex justify-center items-center bg-white h-12 w-32 text-black text-xl rounded-2xl"
                              onClick={() => setShowReportModal(true)}
                            >
                              Report
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {showReportModal ? (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-300 outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold text-black">
                              Report this NFT
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowReportModal(false)}
                            >
                              <span className="bg-transparent text-black h-6 w-6 text-3xl block outline-none focus:outline-none">
                                ×
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <div className="relative p-6 flex-auto">
                            <input
                              type="text"
                              onChange={(e) => setReportMsg(e.target.value)}
                              className="bg-transparent w-[600px] h-12 text-black rounded-lg border-2 border-black p-4"
                              placeholder="Enter valid reason"
                              value={reportMsg}
                            />
                          </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                              className="bg-black text-white active:bg-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => report()}
                            >
                              Report
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
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
                  <></>
                ) : (
                  <span className="text-xl ">
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
                        address == state.data.owner) &&
                      state.data.status != 0 ? (
                        <button
                          className="text-black bg-white rounded-xl w-full h-12 font-bold cursor-pointer mt-4 tracking-widest"
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
                                  value.biddingId == state.data.biddingId &&
                                  address != highestBidderAddress
                                ) {
                                  return (
                                    <div>
                                      <button
                                        className="text-black bg-white rounded-xl w-full h-12 font-bold cursor-pointer mt-4 tracking-widest"
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
                    </>
                  ) : (
                    <>
                      {address == state.data.owner ? (
                        <></>
                      ) : (
                        <div>
                          <p className="pb-4 text-xl">
                            Bid Price <span className="text-red-800">*</span>
                          </p>

                          <input
                            className="flex flex-col rounded-xl bg-transparent border-gray-400 border-2 h-12 w-full p-4"
                            type="number"
                            name="collection"
                            onChange={(e) => setBidPrice(e.target.value)}
                            placeholder="Make Bid . . ."
                            value={BidPrice}
                          ></input>
                          <button
                            className="text-black bg-white rounded-xl w-full h-12 font-bold cursor-pointer mt-4 tracking-widest"
                            onClick={PlaceBid}
                          >
                            Place Bid
                          </button>
                        </div>
                      )}
                    </>
                  )}
                  <div className="pt-12">
                    <p className="text-3xl">Bid History</p>
                    <div>
                      {data.map((value, index) => {
                        if (value.biddingId == state.data.biddingId) {
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
                                      {value.bidder.substring(0, 7)}....
                                      {value.bidder.substring(21, 29)}
                                    </h1>
                                  </button>
                                </div>
                                <div className="flex gap-1 items-center text-xl">
                                  <img src={AddressIcon} className="h-6 w-6" />
                                  <h1>{value.price}</h1>
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
                      onClick={copyTokenId}
                      className="bg-gray-800 rounded-xl px-4"
                    >
                      <a className="text-xl">{state.data.tokenId}</a>
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <a className="text-xl">Listing Id</a>
                    <button
                      onClick={copyBiddingId}
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
