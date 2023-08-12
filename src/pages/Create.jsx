import React from "react";
import { useState } from "react";
import Navbar from "../pages/Navbar";
import PreviewImage from "../assets/previewImage.png";

export const Create = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    collection: "",
    photo: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="bg-black text-white min-h-screen justify-center">
      <div className="pt-12">
        <Navbar />
      </div>
      <div className="flex w-full h-full justify-center items-center mt-12">
        <div>
          <p className="font-bold text-3xl flex  items-center justify-start ">
            Create NFT
          </p>
          <div className="flex gap-1 mt-4"><p className="text-red-800">*</p><p>Required fields</p></div>
          
          <div className="grid gap-6 mt-8 font-bold">
            <div className="flex flex-col gap-2 ">
              <div className="flex gap-2 text-lg">
                <p>Name</p><p className="text-red-800">*</p>
              </div>
              <input
                className="flex flex-col rounded-xl bg-transparent border-gray-400 border-2 h-12 w-[650px] p-4"
                type="text"
                name="title"
                value={form.title}
                placeholder="Name your NFT . . ."
                onChange={handleChange}
              ></input>
            </div>

            <div className="flex flex-col gap-2 ">
              <div className="text-lg">
                <p>Collection</p>
              </div>
              <input
                className="flex flex-col rounded-xl bg-transparent border-gray-400 border-2 h-12 w-[650px] p-4"
                type="text"
                name="collection"
                value={form.collection}
                placeholder="Make Collectables . . ."
                onChange={handleChange}
              ></input>
            </div>

            <div className="flex flex-col gap-2 ">
              <div className="flex gap-2 text-lg">
                <p>Description</p><p className="text-red-800" >*</p>
              </div>
              <input
                className="flex justify-start items-start rounded-xl  bg-transparent border-gray-400 border-2 h-16 w-[650px] p-4"
                type="text"
                name="description"
                value={form.description}
                placeholder="Description about your NFT . . . "
                onChange={handleChange}
              ></input>
            </div>

            <div className="flex flex-col gap-2 ">
              <div className="flex gap-2 text-lg">
                <p>Image</p><p className="text-red-800" >*</p>
              </div>
              {/* {
              form.photo ?
                (<div>
                  <img src={form.photo} alt="Image" className="h-full w-full rounded-2xl object-contain" />
                </div>)
                :
                (<div>
                  <img src={PreviewImage} alt="previewImage" className="h-56 w-full rounded-2xl shadow-md" />
                </div>)
            } */}
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                value={form.photo}
              />
            </div>
            <div className="mt-8">
              <button className="bg-white text-black h-12 w-full font-bold text-xl rounded-lg">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
