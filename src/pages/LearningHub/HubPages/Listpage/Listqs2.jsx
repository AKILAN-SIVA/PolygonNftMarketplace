import React from "react";
import Listqs2AssetsS2 from "../../HubAssets/Listqs2AssetsS2.png";
import Listqs2AssetsS3 from "../../HubAssets/Listqs2AssetsS3.png";
import Listqs2AssetsS4 from "../../HubAssets/Listqs2AssetsS4.png";

export const Listqs2 = () => {
  return (
    <div className="w-full h-fit">
      <div className="grid justify-start items-center gap-6">
        <h1 className="text-4xl font-semibold tracking-wider">
          2. How to list an NFT?
        </h1>
        <h1 className="text-xl font-semibold tracking-wider px-12">
          Note: A step by step guide to list your first Non-Fungible Token in
          NFT Marketplace
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
            alt="listqs2"
            className="w-[800px] h-[500px] border-2 border-gray-700"
          />
        </div>
        <p className="text-xl tracking-wider text-justify px-12 font-serif">
          <span className="text-3xl font-semibold">Step 3:</span> To list nft
          you have to choose - List your nft, then set listing price. Then,
          click “List” to list the nft.
        </p>
        <div className="flex justify-center items-center w-full h-full py-12">
          <img
            src={Listqs2AssetsS3}
            alt="listqs3"
            className="w-[800px] h-[500px] border-2 border-gray-700"
          />
        </div>
        <p className="text-xl tracking-wider text-justify px-12 font-serif">
          <span className="text-3xl font-semibold">Step 4:</span> After
          successful listing, listed nft is listed for sale in explore page.
        </p>
        <div className="flex justify-center items-center w-full h-full py-12">
          <img
            src={Listqs2AssetsS4}
            alt="listqs4"
            className="w-[800px] h-[500px] border-2 border-gray-700"
          />
        </div>
      </div>
    </div>
  );
};
