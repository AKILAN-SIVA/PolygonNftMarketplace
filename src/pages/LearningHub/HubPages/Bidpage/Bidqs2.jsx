import React from "react";
import Listqs2AssetsS2 from "../../HubAssets/Listqs2AssetsS2.png";
import Bidqs2AssetsS3 from "../../HubAssets/Bidqs2AssetsS3.png";
import Bidqs2AssetsS4 from "../../HubAssets/Bidqs2AssetsS4.png";
import Bidqs2AssetsS5 from "../../HubAssets/Bidqs2AssetsS5.png";

const Bidqs2 = () => {
  return (
    <div className="w-full h-fit">
      <div className="grid justify-start items-center gap-6">
        <h1 className="text-4xl font-semibold tracking-wider">
          2. How to create an NFT bidding?
        </h1>
        <h1 className="text-xl font-thin tracking-wider px-12 font-raleway">
          Note: A step by step guide to create your first NFT bidding in NFT
          Marketplace
        </h1>
        <p className="text-xl tracking-wider text-justify px-12 font-serif">
          <span className="text-3xl font-semibold">Step 1:</span> Mint an NFT.
          To know how to mint an NFT,{" "}
          <a
            href="/learningHub/MintInfo"
            target="_blank"
            className="text-blue-700 hover:underline hover:underline-offest-2"
          >
            Click here
          </a>
        </p>
        <p className="text-xl tracking-wider text-justify px-12 font-serif">
          <span className="text-3xl font-semibold">Step 2:</span> Click the NFT
          in your profile. In nft page, you have two options - list your nft and
          bid your nft.
        </p>
        <div className="flex justify-center items-center w-full h-full py-12">
          <img
            src={Listqs2AssetsS2}
            alt="Bidqs2"
            className="w-[800px] h-[500px] border-2 border-gray-700"
          />
        </div>
        <p className="text-xl tracking-wider text-justify px-12 font-serif">
          <span className="text-3xl font-semibold">Step 3:</span> To bid nft you
          have to choose - bid your nft , then set starting price and time
          limit.
        </p>
        <div className="flex justify-center items-center w-full h-full py-12">
          <img
            src={Bidqs2AssetsS3}
            alt="Bidqs2AssetsS3"
            className="w-[800px] h-[500px] border-2 border-gray-700"
          />
        </div>
        <p className="text-xl tracking-wider text-justify px-12 font-serif">
          <span className="text-3xl font-semibold">Step 4:</span> Then click
          “Make bid” and confirm transaction to place a bid.
        </p>
        <div className="flex justify-center items-center w-full h-full py-12">
          <img
            src={Bidqs2AssetsS4}
            alt="Bidqs2AssetsS4"
            className="w-[800px] h-[500px] border-2 border-gray-700"
          />
        </div>
        <p className="text-xl tracking-wider text-justify px-12 font-serif">
          <span className="text-3xl font-semibold">Step 5:</span> Then bid is
          placed in bidding page. If the time limit exceeds it will display as
          “Expired” else it display as “Active”
        </p>
        <div className="flex justify-center items-center w-full h-full py-12">
          <img
            src={Bidqs2AssetsS5}
            alt="Bidqs2AssetsS5"
            className="w-[800px] h-[500px] border-2 border-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default Bidqs2;
