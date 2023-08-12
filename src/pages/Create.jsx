import React from "react";
import { useState } from "react";
import Navbar from "../pages/Navbar"

export const Create = () => {
  const [image, setImage] = useState(null)
  const [filename, setFilename] = useState()
  return (
    <div className="bg-black text-white">
      <div className='pt-12'>
        <Navbar />
      </div>
      <div className="flex w-full h-full justify-center items-center ml-24 mt-12">
        <div className="w-full">
          <div>
            <p className="font-bold text-3xl flex  items-center justify-start ">
              Create New NFT
            </p>
            {/* <div className="flex gap-2">
              <p className="text-red-700">*</p>
              <p>Required</p>
            </div> */}
            <div className="flex flex-col gap-2 mt-8">
              <div className="flex gap-1 text-lg">
                <p>Name</p>
                <p className="text-red-700">*</p>
              </div>
              <input
                className="flex flex-col rounded-xl bg-white border-gray-400 border-2 h-12 w-[700px] p-4"
                type="text"
                placeholder="Certificate name"
              ></input>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex gap-1">
                <p>Roll Number</p>
                <p className="text-red-700">*</p>
              </div>
              <input
                className="flex flex-col rounded-xl  bg-white border-gray-400 border-2 h-12 w-[700px] p-4"
                type="text"
                placeholder="Student roll no"
              ></input>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex gap-1">
                <p>College / University</p>
                <p className="text-red-700">*</p>
              </div>
              <input
                className="flex flex-col  rounded-xl  bg-white border-gray-400 border-2 h-12 w-[700px] p-4"
                type="text"
                placeholder="Institute name"
              ></input>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

