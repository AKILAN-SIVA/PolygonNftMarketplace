import React, { useEffect } from "react";
import Navbar from "../pages/Navbar";
import Card from "../components/Card";
import { ethers } from "ethers";
import Marketplace from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";

export const Explore = () => {
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [filData, setFilData] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(true);

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
    let transaction = await contract.getAllNfts();

    // /*
    // * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
    // * and creates an object of information that is to be displayed
    // */

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        const price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          owner: i.owner,
          buyNFT: i.NFTbought,
          listNFT: i.NFTListed,
          bidNFT: i.NFTBidded,
          photo: meta.image,
          title: meta.title,
          description: meta.description,
          collection: meta.collection,
          format: meta.fileFormat,
          UserReport: i.UserReportNft,
          AdminReport: i.AdminReportNft,
          reportMsg: i.ReportMsg,
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

  let circleCommonClasses = "h-6 w-6 bg-current rounded-full";
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
          <div className="flex justify-center items-start w-full pt-8">
            <input
              className="bg-transparent border-2 border-gray-400 rounded-xl w-[600px] h-16 px-6 tracking-widest"
              onChange={(e) => setFilData(e.target.value)}
              type="text"
              placeholder="Filter the NFTs..."
              value={filData}
            />
          </div>
          <div className="grid justify-start pt-12 ml-24 gap-8">
            {data.length == 0 ? (
              <>
                <div className="text-4xl font-bold justify-center">
                  <h1>No NFT listed...!</h1>
                </div>
              </>
            ) : (
              <>
                {filData.length != "" ? (
                  <>
                    <h1 className="text-4xl font-bold tracking-widest">
                      Result for {filData}{" "}
                    </h1>
                    <div className="flex flex-wrap gap-8">
                      {data.map((value, index) => {
                        if (
                          value.title.toLowerCase() == filData.toLowerCase()
                        ) {
                          return <Card data={value} key={index} />;
                        } else if (
                          value.collection.toLowerCase() ==
                          filData.toLowerCase()
                        ) {
                          return <Card data={value} key={index} />;
                        } else if (
                          value.description.toLowerCase() ==
                          filData.toLowerCase()
                        ) {
                          return <Card data={value} key={index} />;
                        } else if (value.price == filData) {
                          return <Card data={value} key={index} />;
                        } else if (value.owner == filData) {
                          return <Card data={value} key={index} />;
                        }
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="text-4xl font-bold tracking-widest">
                      Top NFT's
                    </h1>
                    <div className="flex flex-wrap gap-8">
                      {data.map((value, index) => {
                        if(value.UserReport == false && value.AdminReport == false)
                        return <Card data={value} key={index} />;
                      })}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
