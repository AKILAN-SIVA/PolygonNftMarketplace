import React from "react";
import { useState } from "react";
import { MdCloudUpload } from "react-icons/md"

export const Create = () => {
  const [image, setImage] = useState(null)
  const [filename, setFilename] = useState()
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-300">
      <div className="flex flex-col w-full h-full justify-center items-center ">
        <div className="max-w-[600px] w-full">
          <div>
            <p className="font-bold text-3xl flex  items-center justify-center ">
              Create New NFT
            </p>
            <div className="flex gap-2 p-4">
              <p className="text-red-700">*</p>
              <p>Required</p>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex gap-1">
                <p>Name</p>
                <p className="text-red-700">*</p>
              </div>
              <input
                className="flex flex-col p-2 rounded-xl bg-transparent border-gray-400 border-2"
                type="text"
                placeholder="Certificate name"
              ></input>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex gap-1">
                <p>Roll Number</p>
                <p className="text-red-700">*</p>
              </div>
              <input
                className="flex flex-col p-2 rounded-xl bg-transparent border-gray-400 border-2"
                type="text"
                placeholder="Student roll no"
              ></input>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex gap-1">
                <p>College / University</p>
                <p className="text-red-700">*</p>
              </div>
              <input
                className="flex flex-col p-2 rounded-xl bg-transparent border-gray-400 border-2"
                type="text"
                placeholder="Institute name"
              ></input>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex gap-1">
                <p>Description</p>
                <p className="text-red-700">*</p>
              </div>
              <textarea
                className="flex flex-col p-2 bg-transparent border-gray-400 border-2 rounded-xl"
                placeholder="Student Details" rows={6}
              ></textarea>
            </div>
            {/* <div className="w-[350px] h-[250px] border-2 border-dashed border-gray-400 flex justify-center items-center p-4 m-4 ml-28 cursor-pointer" onClick={() => document.querySelector(".input-field").click()}>
              <input className="input-field hidden" type="file" value={image} onChange={''}></input>
              {image ? <img src={image} alt={filename} /> : <MdCloudUpload size={30} />}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

