import React from "react";
import Lottie from 'react-lottie';
import qs1Asset from "../../HubAssets/Bidqs1Asset.json"

const Bidqs1 = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: qs1Asset,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full h-fit">
      <div className="grid justify-start items-center gap-6">
        <h1 className="text-4xl font-semibold tracking-wider">
          1. What is bidding an NFT?
        </h1>
        <p className="text-2xl tracking-wider text-justify px-12 font-serif">
          Bidding on an NFT involves participating in an auction-style sale of a
          non-fungible token. Interested buyers submit bids for the NFT, often
          specifying the amount they are willing to pay. The highest bidder at
          the end of the auction wins the NFT and is obligated to complete the
          purchase, while others who placed bids do not acquire the NFT and
          retain their cryptocurrency
        </p>
        <div className="pt-8">
          <Lottie options={defaultOptions} height={450} width={600} />
        </div>
      </div>
    </div>
  );
};

export default Bidqs1;
