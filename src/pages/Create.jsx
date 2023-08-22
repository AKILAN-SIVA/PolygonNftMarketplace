import React from "react";
import { useState } from "react";
import Navbar from "../pages/Navbar";
import PreviewImage from "../assets/previewImage.png";
import { uploadFileToIPFS, uploadJSONToIPFS } from "./Pinata";
import { ethers } from "ethers";
import Marketplace from "../Marketplace.json"
import { Configuration, OpenAIApi } from "openai";

export const Create = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    collection: "",
    price: "",
    photo: "",
  });

  const [fileURL, setFileURL] = useState(null);
  const [Msg, setMsg] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [showUploadBtn, setUploadBtn] = useState(false);
  const [showGenerateBtn, setShowGenerateBtn] = useState(false);

  const handleUpload = () => {
    setShowGenerateBtn(false);
    setUploadBtn(true);
  }
  const handleAI = () => {
    setUploadBtn(false);
    setShowGenerateBtn(true);
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);


  const generateImage = async () => {
    if (form.description == "") {
      alert("enter description to generate your AI image")
      return;
    }
    const res = await openai.createImage({
      prompt: form.description,
      n: 1,
      size: "256x256",
    });

    setImgUrl(res.data.data[0].url);

  };

  async function OnChangeFile(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    var file = e.target.files[0];
    //check for file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL)
        setFileURL(response.pinataURL);
      }
    }
    catch (e) {
      console.log("Error during file upload", e);
    }
  }

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const { title, collection, description } = form;
    //Make sure that none of the fields are empty
    if (!title || !collection || !description || !fileURL)
      return;
    setMsg("Uploading NFT(takes 2-3 mins)...")
    const nftJSON = {
      title, collection, description, image: fileURL
    }

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response)
        return response.pinataURL;
      }
    }
    catch (e) {
      console.log("error uploading JSON metadata:", e)
    }
  }

  async function listNFT(e) {
    e.preventDefault();

    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();


      //Pull the deployed contract instance
      let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)

      //massage the params to be sent to the create NFT request
      // const price = ethers.utils.parseUnits(form.price,'ether');

      //actually create the NFT
      let transaction = await contract.CreateToken(metadataURL)
      await transaction.wait()

      alert("Successfully listed your NFT!");
      setMsg("");
      setForm({ title: '', collection: '', description: '', photo: '' });
      window.location.replace("/profile")
    }
    catch (e) {
      console.log("Upload error" + e)
    }
  }

  // console.log("Working", process.env);

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

            {/* <div className="flex flex-col gap-2 ">
              <div className="flex gap-2 text-lg">
                <p>Price</p><p className="text-red-800">*</p>
              </div>
              <input
                className="flex flex-col rounded-xl bg-transparent border-gray-400 border-2 h-12 w-[650px] p-4"
                type="number"
                name="price"
                value={form.price}
                placeholder="Enter price for Listing. . ."
                onChange={handleChange}
              ></input>
            </div> */}



            <div className="flex flex-col gap-2 ">
              <div className="flex gap-2 text-lg">
                <p>Image</p><p className="text-red-800" >*</p>
              </div>
              <div className="flex justify-between gap-2 text-xl tracking-widest">
                <button className="bg-gray-800 w-full h-24 rounded-xl" onClick={handleUpload}>
                  Upload image
                </button>
                <button className="bg-gray-800 w-full h-24 rounded-xl" onClick={handleAI}>
                  Generate AI image
                </button>
              </div>
              {
                showUploadBtn ?
                  <div className="pt-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 text-lg">
                        <p>Description</p><p className="text-red-800" >*</p>
                      </div>
                      <input
                        className="flex justify-start items-start rounded-xl  bg-transparent border-gray-400 border-2 h-16 w-[650px] p-4"
                        type="text"
                        name="description"
                        value={form.description}
                        placeholder="Description about your Image . . . "
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div className="pt-8">
                      <input
                        type="file"
                        name="photo"
                        className="border border-white w-full rounded-xl"
                        onChange={OnChangeFile}
                        value={form.photo}
                      />
                    </div>
                  </div>
                  : <></>
              }
              {
                showGenerateBtn ?
                  <div className="pt-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 text-lg">
                        <p>Description </p><p className="text-red-800" >*</p>
                        <button className="bg-gray-400 text-black h-8 w-32 font-bold text-xl rounded-lg" onClick={generateImage}>
                          Generate
                        </button>
                      </div>
                      <input
                        className="flex justify-start items-start rounded-xl  bg-transparent border-gray-400 border-2 h-16 w-[650px] p-4"
                        type="text"
                        name="description"
                        value={form.description}
                        placeholder="Enter description to generate AI image . . . "
                        onChange={handleChange}
                      ></input>
                    </div>
                    <div>
                      {
                        imgUrl != "" ?
                          <img src={imgUrl} alt="generated" className="pt-4 w-[300px] h-[300px]" />
                          :
                          <></>
                      }
                    </div>
                  </div>
                  : <></>

              }

            </div>
            <div className="text-red-500 text-center text-lg">{Msg}</div>
            <div className="pb-8">
              <button className="bg-white text-black h-12 w-full font-bold text-xl rounded-lg" onClick={listNFT}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
