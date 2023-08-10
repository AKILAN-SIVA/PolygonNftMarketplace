import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      <div className="bg-gray-300 md:flex md:flex-row justify-between items-center w-full h-20 text-white py-4 md:px-16 z-50">
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
            {/* <li>Explore</li> */}
            <li>Profile</li>
            <li>
              <button onClick={ConnectWallet}>
                {connected ? "Connected" : "Connect Wallet"}
              </button>
            </li>
          </ul>
          {/* <h1 >Create</h1>
                    <h1 className='text-xl font-bold'>Profile</h1> */}
        </div>
      </div>
    </>
  );
}

export default Navbar;

//import React from "react";
// import { BsFillPersonLinesFill } from "react-icons/bs";
// import {TbSearch} from 'react-icons/tb'
// import Logo from '../assets/Logo.png'

// const Navbar = () => {
//   return (
//     <div className="max-w-[1640px] h-[80px]  flex p-4 mx-auto  justify-between items-center  bg-gray-300  ">
//       <div className="flex items-center space-x-8 sm:px-8">
//         <div>
//           <img className="w-[60px] rounded-full cursor-pointer" src={Logo} alt="NFT logo" />
//         </div>
//         <div>
//           <h1 className="text-2xl hidden md:flex sm:text-3xl lg:text-4xl cursor-pointer p-2">
//             NFT
//             <span className="font-bold">Cert</span>
//           </h1>
//         </div>
//         <div className="flex items-center rounded-full w-[200px] sm:w-[400px] lg:w-[700px] px-2 bg-gray-200">
//           <TbSearch className="ml-2 cursor-pointer" size={20}/>
//           <input
//             className="bg-transparent w-full focus focus:outline-none p-2"
//             placeholder="search"
//             type="text"
//           ></input>
//         </div>
//         <div>
//           <p className="text-xl p-2 hidden md:flex cursor-pointer hover:border-b-2 hover:border-stone-700 ">Create</p>
//         </div>
//         <div className="flex cursor-pointer">
//           <BsFillPersonLinesFill size={30} className="mt-2"/>
//           <p className="text-xl p-2 hidden sm:flex hover:border-b-2 hover:border-stone-700">Profile</p>
//         </div>
//         <div className="px-2">
//           <button className="bg-stone-700 text-white hidden lg:flex items-center rounded-full p-2 hover:bg-white hover:text-black">
//             connect
//           </button>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default Navbar;
