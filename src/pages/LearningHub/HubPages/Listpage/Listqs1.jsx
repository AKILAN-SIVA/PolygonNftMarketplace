import React from "react";
import Listqs1Asset from "../../HubAssets/Listqs1Asset.png";

export const Listqs1 = () => {
  return (
    <div className="w-full h-fit">
      <div className="grid justify-start items-center gap-6">
        <h1 className="text-4xl font-semibold tracking-wider">
          1. What is listing an NFT?
        </h1>
        <p className="text-2xl tracking-wider text-justify px-12 font-serif">
          Listing an NFT refers to the process of making a non-fungible token
          available for sale on an online marketplace or platform. Sellers
          specify details such as pricing, duration, and terms for potential
          buyers to engage with and purchase the NFT, facilitating the transfer
          of ownership of digital
        </p>
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={Listqs1Asset}
            alt="listqs1asset"
            className="w-[600px] h-[500px]"
          />
        </div>
      </div>
    </div>
  );
};
