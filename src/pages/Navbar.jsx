import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../assets/search.png";
import { IoIosCreate } from "react-icons/io";
import { MdOutlineTravelExplore } from "react-icons/md";
import { ImProfile } from "react-icons/im";

function Navbar() {

  const [walletAddress, setWalletAddress] = useState("");
  const [connected, setConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tokenId, setTokenId] = useState("");

  const ConnectWallet = async () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          console.log(accounts[0]);
          setWalletAddress(accounts[0]);
          setConnected(true);
        });
    } else {
      alert("Install Metamask Extension");
    }
  };

  const getNFT = async () => {
    console.log(tokenId);
    setShowModal(false);
  }

  return (
    <>
      <div className="px-24">
        <div className="bg-white border border-gray-500 rounded-xl h-16 shadow-2xl">
          <div className="flex justify-between items-center px-6 font-bold text-black">
            <div className="flex justify-start py-4 gap-8">
              <Link to="/" >
                <h1 className="text-lg">NFT Marketplace</h1>
              </Link>
            </div>
            <div className="flex justify-center gap-6">
              <Link to="/createNft" >
                <div className="flex items-center gap-2">
                  <IoIosCreate size={25} />
                  <h1 className="text-lg">Create</h1>
                </div>
              </Link>
              <Link to="/exploreNft" >
                <div className="flex items-center gap-2">
                  <MdOutlineTravelExplore size={25} />
                  <h1 className="text-lg">Explore</h1>
                </div>
              </Link>
              <Link to="/profile" >
                <div className="flex items-center gap-2">
                  <ImProfile size={23} />
                  <h1 className="text-lg">Profile</h1>
                </div>
              </Link>
            </div>
            <div className="flex justify-end py-2 gap-6">
              <button className="" onClick={() => setShowModal(true)}>
                <img src={Search} alt="SearchIcon" className="h-7 w-7" />
              </button>
              {showModal ? (
                <>
                  <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                  >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-300 outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Search any NFTs
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="bg-transparent text-black h-6 w-6 text-3xl block outline-none focus:outline-none">
                              ×
                            </span>
                          </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <input type="number" onChange={(e) => setTokenId(e.target.value)} className="bg-transparent w-[600px] h-12 text-black rounded-lg border-2 border-black p-4" placeholder="Enter Token Id" value={tokenId} />
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="bg-black text-white active:bg-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => getNFT()}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
              <button className="bg-black text-white border rounded-lg w-[170px] h-12 hover:bg-gray-700 text-lg" onClick={ConnectWallet}>
                {connected != "" ? "Connected" : "Connect Wallet"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
