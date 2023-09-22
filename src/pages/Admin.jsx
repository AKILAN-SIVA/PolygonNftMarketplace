import React, { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import Marketplace from "../Marketplace.json";
import axios from "axios";
import AdminCard from "../components/AdminCard";

const Admin = () => {
  const [allNfts, setAllNfts] = useState([]);
  const [allBidNfts, setAllBidNfts] = useState([]);

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

    let nfts = await contract.getAllNfts();
    let bidNfts = await contract.getAllBiddedNfts();

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
          UserReport: i.UserReportNft,
          AdminReport: i.AdminReportNft,
          reportMsg: i.ReportMsg,
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
          UserReport: i.UserReportNft,
          AdminReport: i.AdminReportNft,
          reportMsg: i.ReportMsg,
        };

        return item;
      })
    );

    setAllNfts(items);
    setAllBidNfts(bids);
    console.log(items);
    console.log(bids);
  }

  return (
    <div className="bg-black w-full min-h-screen h-fit">
      <div className="grid justify-start items-start">
        <div className="flex justify-center items-center text-4xl text-white font-semibold py-12 px-24">
          Welcome to Admin Page
        </div>
        <div className="flex flex-wrap justify-start items-start px-24 pt-12">
          {allNfts.length != 0 || allBidNfts.length != 0 ? (
            <>
              <div>
                {allNfts.map((value, index) => {
                  if (value.UserReport == true && value.AdminReport == false)
                    return <AdminCard data={value} key={index} />;
                })}
                {allBidNfts.map((value, index) => {
                  if (value.UserReport == true && value.AdminReport == false)
                    return <AdminCard data={value} key={index} />;
                })}
              </div>
            </>
          ) : (
            <><div className="text-4xl text-white">No NFTs reported</div></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
