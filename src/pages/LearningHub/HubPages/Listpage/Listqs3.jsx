import React from "react";
import Listqs3AssetsS2 from "../../HubAssets/Listqs3AssetsS2.png";
import Listqs3AssetsS1 from "../../HubAssets/Listqs3AssetsS1.png";
export const Listqs3 = () => {
  return (
    <div className="w-full h-fit">
      <div className="grid justify-start items-center gap-6">
        <h1 className="text-4xl font-semibold tracking-wider">
          3. How to buy an NFT?
        </h1>
        <h1 className="text-xl font-thin tracking-wider px-12 font-raleway">
          Note: A step by step guide to buy your first Non-Fungible Token in NFT
          Marketplace
        </h1>
        <p className="text-xl tracking-wider text-justify px-12 font-serif">
          <span className="text-3xl font-semibold">Step 1:</span> In explore
          page , choose which nft do you want to buy and click “Buy NFT”.
        </p>
        <div className="flex justify-center items-center w-full h-full py-12">
          <img
            src={Listqs3AssetsS1}
            alt="Listqs3AssetsS1"
            className="w-[800px] h-[500px] border-2 border-gray-700"
          />
        </div>
        <p className="text-xl tracking-wider text-justify px-12 font-serif">
          <span className="text-3xl font-semibold">Step 2:</span> After
          successful transaction, the ownership gets transferred to buyer.
        </p>
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={Listqs3AssetsS2}
            alt="Listqs3AssetsS2"
            className="w-[600px] h-[600px]"
          />
        </div>
      </div>
    </div>
  );
};
