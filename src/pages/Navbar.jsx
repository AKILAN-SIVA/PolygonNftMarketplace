import React from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import {TbSearch} from 'react-icons/tb'
import Logo from '../assets/Logo.png'

const Navbar = () => {
  return (
    <div className="max-w-[1640px] h-[80px]  flex p-4 mx-auto  justify-between items-center  bg-gray-300  ">
      <div className="flex items-center space-x-8 sm:px-8">
        <div>
          <img className="w-[60px] rounded-full cursor-pointer" src={Logo} alt="NFT logo" />
        </div>
        <div>
          <h1 className="text-2xl hidden md:flex sm:text-3xl lg:text-4xl cursor-pointer p-2">
            
            <span className="font-bold">NFT</span>Marketplace
          </h1>
        </div>
        <div className="flex items-center rounded-full w-[200px] sm:w-[400px] lg:w-[700px] px-2 bg-gray-200">
          <TbSearch className="ml-2 cursor-pointer" size={20}/>
          <input
            className="bg-transparent w-full focus focus:outline-none p-2"
            placeholder="search"
            type="text"
          ></input>
        </div>
        <div>
          <p className="text-xl p-2 hidden md:flex cursor-pointer hover:border-b-2 hover:border-stone-700 ">Create</p>
        </div>
        <div className="flex cursor-pointer">
          <BsFillPersonLinesFill size={30} className="mt-2"/>
          <p className="text-xl p-2 hidden sm:flex hover:border-b-2 hover:border-stone-700">Profile</p>
        </div>
        <div className="px-2">
          <button className="bg-stone-700 text-white hidden lg:flex items-center rounded-full p-2 hover:bg-white hover:text-black">
            connect
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default Navbar;
