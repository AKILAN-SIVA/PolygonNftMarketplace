import Navbar from "../pages/Navbar";
import Marketplace from "../Marketplace.json";
import { ethers } from "ethers";
import Carousel from "react-grid-carousel";
import React, { useRef, useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./pages.css";
import axios from "axios";
import AddressIcon from "../assets/addressIcon.png";
import { useNavigate } from "react-router-dom";
import CarouselCard from "../components/CarouselCard";
import CountUp from "react-countup";
import { FiArrowUpRight } from "react-icons/fi";
import { RiSeparator } from "react-icons/ri";
import { LearningHub } from "./LearningHub/HubPages/LearningHub";
import Logo from "../assets/Logo.png";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Home = () => {
  const [totTokenId, setTokenId] = useState("");
  const [totSoldNft, setTotSoldNft] = useState("");
  const [totBidNft, setTotBidNft] = useState("");
  const [totUser, setTotUser] = useState("");
  const slideRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [allNfts, setAllNfts] = useState([]);
  const [allBidNfts, setAllBidNfts] = useState([]);
  const [onlyImgNfts, setOnlyImgNfts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getContractFunc();
  }, []);

  async function getContractFunc() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      Marketplace.address,
      Marketplace.abi,
      signer
    );

    let totalTokenId = await contract.getTotalMintedTokens();
    let totalSoldNft = await contract.getTotalSoldTokens();
    let totalBidNft = await contract.getTotalBiddedTokens();
    let totalCreators = await contract.getTotalUser();
    let nfts = await contract.getAllNfts();
    let bidNfts = await contract.getAllBiddedNfts();
    let imgNfts = await contract.getAllImageNfts();

    const items = await Promise.all(
      nfts.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        const price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          owner: i.owner,
          photo: meta.image,
          title: meta.title,
          description: meta.description,
          collection: meta.collection,
          format: meta.fileFormat,
        };

        return item;
      })
    );

    const bids = await Promise.all(
      bidNfts.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        const price = ethers.utils.formatUnits(i.price.toString(), "ether");
        // const deadline = daysLeft(i.deadline);

        let item = {
          biddingId: i.biddingId.toNumber(),
          owner: i.seller,
          netPrice: price,
          timeInStr: i.date,
          status: i.status.toNumber(),
          endAt: i.deadline.toNumber(),
          price,
          tokenId: i.tokenId.toNumber(),
          photo: meta.image,
          title: meta.title,
          description: meta.description,
          collection: meta.collection,
          format: meta.fileFormat,
        };

        return item;
      })
    );

    const imgNFTs = await Promise.all(
      imgNfts.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        const price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          owner: i.owner,
          photo: meta.image,
          title: meta.title,
          description: meta.description,
          collection: meta.collection,
          format: meta.fileFormat,
        };

        return item;
      })
    );

    setTokenId(totalTokenId.toNumber());
    setTotSoldNft(totalSoldNft.toNumber());
    setTotBidNft(bids.length);
    setTotUser(totalCreators.toNumber());
    setAllNfts(items);
    setOnlyImgNfts(imgNFTs);
    setAllBidNfts(bids);
    console.log(bids);
    console.log("Img nfts are: ", onlyImgNfts);
    console.log(totalBidNft.toNumber());

    setLoadingProgress(false);
  }

  // const handleClickNext = () => {
  //   let items = slideRef.current.querySelectorAll(".item");
  //   slideRef.current.appendChild(items[0]);
  // };

  // const handleClickPrev = () => {
  //   let items = slideRef.current.querySelectorAll(".item");
  //   slideRef.current.prepend(items[items.length - 1]);
  // };

  let circleCommonClasses = "h-6 w-6 bg-current  rounded-full";

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? onlyImgNfts.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === onlyImgNfts.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const [defaultImage, setDefaultImage] = useState({});
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-[#070017] min-h-screen h-fit w-full text-white">
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

          {/* <div className="max-w-100% h-[700px] w-full m-auto py-16 px-24 relative group">
            <div
              style={{
                backgroundImage: `url(${onlyImgNfts[currentIndex].photo})`,
              }}
              className="w-full h-full rounded-2xl bg-center bg-fill duration-500 hover:cursor-pointer"
              onClick={() =>
                navigate("/searchNft", { state: onlyImgNfts[currentIndex] })
              }
            >
              <div className="p-6 absolute top-[65%] left-[7%] w-72 h-40 bg-gray-700 rounded-3xl">
                <div className="flex gap-1 text-6xl font-semibold text-gray-100">
                  {onlyImgNfts[currentIndex].title}
                </div>
                <div className="flex gap-1 text-3xl font-semibold text-gray-100 pt-2">
                  <img src={AddressIcon} className="h-8 w-8" />{" "}
                  {onlyImgNfts[currentIndex].price}
                </div>
              </div>
            </div>
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-white text-black cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-white text-black cursor-pointer">
              <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
          </div> */}

          <div className="flex justify-center ">
            <RiSeparator size={80} />
          </div>
          <div className="flex justify-center pt-24">
            <h1 className="text-5xl text-white font-semibold">
              All{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Bids
              </span>
            </h1>
          </div>
          <div className="w-[55%] m-auto mt-[50px]">
            <Slider {...settings}>
              {allBidNfts.map((item, index) => (
                <CarouselCard data={item} key={index} />
              ))}
            </Slider>
          </div>
          <div className="flex justify-center items-center pt-16 gap-4">
            <button
              className="flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 tracking-widest text-xl text-black font-semibold  w-56 h-14 rounded-3xl"
              onClick={() => window.location.replace("/bidNft")}
            >
              View More <FiArrowUpRight size={28} />
            </button>
          </div>
          <div className="flex justify-center pt-24">
            <RiSeparator size={80} />
          </div>
          <div className="pt-24">
            <div className="flex justify-center items-center gap-32">
              <div className="grid justify-center gap-6">
                <h1 className="text-8xl font-bold">
                  <CountUp start={0} end={totTokenId} />+
                </h1>
                <h1 className="text-xl font-bold">Total Mined</h1>
              </div>
              <div className="bg-gray-800 border-2 border-gray-800 w-1 h-40"></div>
              <div className="grid justify-center gap-6">
                <h1 className="text-8xl font-bold">
                  <CountUp start={0} end={totSoldNft} />+
                </h1>
                <h1 className="text-xl font-bold">Total Sold</h1>
              </div>
              <div className="bg-gray-800 border-2 border-gray-800 w-1 h-40"></div>
              <div className="grid justify-center gap-6">
                <h1 className="text-8xl font-bold">
                  <CountUp start={0} end={totBidNft} />+
                </h1>
                <h1 className="text-xl font-bold">Total Bids</h1>
              </div>
              <div className="bg-gray-800 border-2 border-gray-800 w-1 h-40"></div>
              <div className="grid justify-center gap-6">
                <h1 className="text-8xl font-bold">
                  <CountUp start={0} end={totUser} />+
                </h1>
                <h1 className="text-xl font-bold">Creators</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-center pt-24">
            <RiSeparator size={80} />
          </div>
          <div className="grid justify-center pt-24 gap-12 w-full">
            <h1 className="text-5xl text-white font-semibold w-full">
              Learning{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Hub
              </span>
            </h1>
          </div>
          <div className="w-full h-full">
            <LearningHub />
          </div>
          {/* Footer */}
          <div className="pt-24">
            <div className="flex justify-center items-center bg-[#13082b] w-full h-[450px]">
              <div className="flex justify-between items-start w-3/4 h-3/4 p-12">
                <div className="grid justify-center items-center gap-8">
                  <div className="flex justify-center gap-2 items-center">
                    <img
                      src={Logo}
                      alt="logo"
                      className="w-12 h-12 rounded-full"
                    />
                    <h1 className="text-3xl font-bold">NFT Marketplace</h1>
                  </div>
                  <div className="flex justify-start items-center pl-16">
                    <p className="text-sm leading-loose">
                      Worlds largest user-friendly marketplace
                      <br />
                      &#169; 2023 Chosen Ones - All rights reserved
                    </p>
                  </div>
                </div>
                <div className="grid justify-center items-center gap-4">
                  <h1 className="text-3xl font-bold">Pages</h1>
                  <div className="grid justify-start items-center text-lg gap-2">
                    <span
                      className="hover:cursor-pointer hover:underline underline-offset-2"
                      onClick={() => window.location.replace("/")}
                    >
                      Home
                    </span>
                    <span
                      className="hover:cursor-pointer hover:underline underline-offset-2"
                      onClick={() => window.location.replace("/createNft")}
                    >
                      Create
                    </span>
                    <span
                      className="hover:cursor-pointer hover:underline underline-offset-2"
                      onClick={() => window.location.replace("/profile")}
                    >
                      Profile
                    </span>
                    <span
                      className="hover:cursor-pointer hover:underline underline-offset-2"
                      onClick={() => window.location.replace("/bidNft")}
                    >
                      Bid
                    </span>
                    <span
                      className="hover:cursor-pointer hover:underline underline-offset-2"
                      onClick={() => window.location.replace("/exploreNft")}
                    >
                      Explore
                    </span>
                  </div>
                </div>
                <div className="grid justify-center items-center gap-4">
                  <h1 className="text-3xl font-bold">Standards</h1>
                  <div className="grid justify-start items-center text-lg gap-2">
                    <a
                      className="hover:cursor-pointer hover:underline underline-offset-2"
                      href="https://ethereum.org/en/"
                      target="_blank"
                    >
                      Ethereum
                    </a>
                    <a
                      className="hover:cursor-pointer hover:underline underline-offset-2"
                      href="https://polygon.technology/"
                      target="_blank"
                    >
                      Polygon
                    </a>
                    <a
                      className="hover:cursor-pointer hover:underline underline-offset-2"
                      href="https://docs.openzeppelin.com/contracts/3.x/erc721"
                      target="_blank"
                    >
                      ERC721
                    </a>
                    <a
                      className="hover:cursor-pointer hover:underline underline-offset-2"
                      href="https://metamask.io/"
                      target="_blank"
                    >
                      Metamask
                    </a>
                    <a
                      className="hover:cursor-pointer hover:underline underline-offset-2"
                      href="https://ipfs.tech/"
                      target="_blank"
                    >
                      IPFS
                    </a>
                  </div>
                </div>
                <div className="grid justify-center items-center gap-4">
                  <h1 className="text-3xl font-bold">Learn</h1>
                  <div className="grid justify-start items-center text-lg gap-2">
                    <a
                      className="hover:cursor-pointer hover:underline underline-offset-2"
                      href="/learningHub/NftInfo"
                      target="_blank"
                    >
                      What is NFT
                    </a>
                    <a
                      className="hover:cursor-pointer hover:underline underline-offset-2"
                      href="/learningHub/MetaMaskInfo"
                      target="_blank"
                    >
                      Metamask
                    </a>
                    <a
                      className="hover:cursor-pointer hover:underline underline-offset-2"
                      href="/learningHub/MintInfo"
                      target="_blank"
                    >
                      Mint an NFT
                    </a>
                    <a
                      className="hover:cursor-pointer hover:underline underline-offset-2"
                      href="/learningHub/ListingInfo"
                      target="_blank"
                    >
                      List an NFT
                    </a>
                    <a
                      className="hover:cursor-pointer hover:underline underline-offset-2"
                      href="/learningHub/BiddingInfo"
                      target="_blank"
                    >
                      Bid an NFT
                    </a>
                  </div>
                </div>
                <div className="grid justify-center items-center gap-4">
                  <h1 className="text-3xl font-bold">Legal</h1>
                  <div className="grid justify-start items-center text-lg gap-2">
                    <a className="hover:cursor-pointer hover:underline underline-offset-2">
                      Privacy Policy
                    </a>
                    <a className="hover:cursor-pointer hover:underline underline-offset-2">
                      Terms & Conditions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
        </>
      )}
    </div>
  );
};
