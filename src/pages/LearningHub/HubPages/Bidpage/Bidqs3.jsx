import React from "react";
import Bidqs3AssetsS1 from "../../HubAssets/Bidqs3AssetsS1.png";
import Bidqs3AssetsS2 from "../../HubAssets/Bidqs3AssetsS2.png";
import Bidqs3AssetsS3 from "../../HubAssets/Bidqs3AssetsS3.png";
import Bidqs3AssetsS4 from "../../HubAssets/Bidqs3AssetsS4.png";

const Bidqs3 = () => {
  return (
    <div className="w-full h-fit">
      <div className="grid justify-start items-center gap-6">
        <h1 className="text-4xl font-semibold tracking-wider">
          3. How to bid an NFT?
        </h1>
        <h1 className="text-xl font-thin tracking-wider px-12 font-raleway">
          Note: A step by step guide to bid your first Non-Fungible Token in NFT
          Marketplace
        </h1>
        <p className="text-xl tracking-wider text-justify px-12 font-serif">
          <span className="text-3xl font-semibold">Step 1:</span> In bidding
          page it shows the details of price, status, owned by, time limit,
          “Placed Bid” and Bid history. Here, you can't bid your own nft. So,
          “place bid” button will be disabled for sellers/owner.
        </p>
        <div className="flex justify-center items-center w-full h-full py-12">
          <img
            src={Bidqs3AssetsS1}
            alt="Bidqs3AssetsS1"
            className="w-[800px] h-[500px] border-2 border-gray-700"
          />
        </div>
        <p className="text-xl tracking-wider text-justify px-12 font-serif">
          <span className="text-3xl font-semibold">Step 2:</span> Others can
          place the bid and the bid should be greater than starting bid. Then,
          in bid history it shows all the bids placed for that nft. Finally, the
          highest bidder will be the new owner of that nft.
        </p>
        <div className="flex justify-center items-center w-full h-full py-12">
          <img
            src={Bidqs3AssetsS2}
            alt="Bidqs3AssetsS2"
            className="w-[800px] h-[500px] border-2 border-gray-700"
          />
        </div>
        <p className="text-xl tracking-wider text-justify px-12 font-serif">
          <span className="text-3xl font-semibold">Step 3:</span> When the time
          limit exceeds, the highest bidder or the seller should make “Complete
          Auction” to end bidding. Then, the other bidders can withdraw their
          bids.
        </p>
        <div className="flex justify-center items-center w-full h-full py-12">
          <img
            src={Bidqs3AssetsS3}
            alt="Bidqs3AssetsS3"
            className="w-[800px] h-[500px] border-2 border-gray-700"
          />
        </div>
        <p className="text-xl tracking-wider text-justify px-12 font-serif">
          <span className="text-3xl font-semibold">Step 4:</span> By “Complete
          Action” the ownership gets transferred to highest bidder.
        </p>
        <div className="flex justify-center items-center w-full h-full py-12">
          <img
            src={Bidqs3AssetsS4}
            alt="Bidqs3AssetsS4"
            className="w-[800px] h-[500px] border-2 border-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default Bidqs3;
