import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../assets/search.png";

function Navbar() {
  const [walletAddress, setWalletAddress] = useState("");
  let [connected, setConnected] = useState(false);
  const ConnectWallet = async () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        console.log(res);
        setConnected(true);
        setWalletAddress(res);
      });
    } else {
      alert("Install Metamask Extension");
    }
  };

  return (
    <>
      <div className="px-24">
        <div className="bg-white border border-gray-500 rounded-xl h-16 shadow-2xl">
          <div className="flex justify-between items-center px-6 font-bold text-black">
            <div className="flex justify-start py-4 gap-6">
              <Link to="/" >
                <h1 className="text-lg">NFT Marketplace</h1>
              </Link>
            </div>
            <div className="flex justify-center gap-6">
              <Link to="/createNft" >
                <h1 className="text-lg">Create</h1>
              </Link>
              <Link to="/exploreNft" >
                <h1 className="text-lg">Explore</h1>
              </Link>
              <Link to="/profile" >
                <h1 className="text-lg">Profile</h1>
              </Link>
            </div>
            <div className="flex justify-end py-2 gap-6">
              <button className="">
                <img src={Search} alt="SearchIcon" className="h-7 w-7" />
              </button>
              <button className="bg-black text-white border rounded-lg w-[170px] h-12 hover:bg-gray-700 text-lg" onClick={ConnectWallet}>
                {connected ? "Connected" : "Connect Wallet"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
