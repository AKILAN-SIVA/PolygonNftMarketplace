import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../assets/search.png";

function Navbar() {
  let [open, setOpen] = useState(true);
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
      {/* <div className="bg-gray-300 md:flex md:flex-row justify-between items-center w-full h-20 text-white py-4 md:px-16 z-50">
        <div className="flex justify-between md:justify-start px-8 items-center md:gap-12">
          <h1 className="text-lg md:text-xl font-bold">
            <Link to="/">Nft Marketplace</Link>
          </h1>
          <input
            type="text"
            placeholder="search"
            className="rounded-full w-40 md:w-[500px] h-10 text-black px-6 border-2 border-black focus focus:outline-none bg-transaprent"
          ></input>
          <div
            onClick={() => setOpen(!open)}
            className="ml-4 md:hidden cursor-pointer"
          >
            <FaBars />
          </div>
        </div>
        <div
          className={`absolute md:static md:z-auto z-[-1] transition-all duration-500 ease-in md:flex flex-col md:flex-row w-full h-96 md:h-20 md:w-[350px] bg-gray-300 ${open ? "top-20" : "mt-[-490px]"
            }`}
        >
          <ul
            className={`mt-2 md:mt-0 md:px-0 md:py-0 md:text-white px-6 py-12 grid justify-center md:items-center gap-10 md:text-xl text-2xl font-bold text-black md:flex `}
          >
            <Link to="/createNft">
              <li>Create</li>
            </Link>
            <Link to="/exploreNft">
              <li>Explore</li>
            </Link>
            <Link to="/profile">
              <li>Profile</li>
            </Link>
            <li>
              <button onClick={ConnectWallet}>
                {connected ? "Connected" : "Connect Wallet"}
              </button>
            </li>
          </ul>
        </div>
      </div> */}

      <div className="px-24">
        <div className="bg-white border border-gray-500 rounded-xl h-20 shadow-2xl">
          <div className="flex justify-between items-center px-6 font-bold text-black">
            <div className="flex justify-start py-6 gap-6">
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
            <div className="flex justify-end gap-6">
              <button className="py-3">
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
