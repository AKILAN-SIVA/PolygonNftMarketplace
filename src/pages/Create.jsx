import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../pages/Navbar";
import PreviewImage from "../assets/previewImage.png";
import { uploadFileToIPFS, uploadJSONToIPFS } from "./Pinata";
import { ethers } from "ethers";
import Marketplace from "../Marketplace.json"
import key from './HuggingFace'
import crypto from "crypto-js";


export const Create = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    collection: "",
    price: "",
    file: "",
    fileFormat: "",
  });


  useEffect(() => {
    console.log("fileformat is ", form.fileFormat)
  })

  const [fileURL, setFileURL] = useState(null);
  const [image, setImage] = useState(null);
  const [Msg, setMsg] = useState("");
  const [showUploadBtn, setUploadBtn] = useState(false);
  const [showGenerateBtn, setShowGenerateBtn] = useState(false);
  const [hashValue, setHashValue] = useState('');
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


  const generateImage = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${key}`
        },
        body: JSON.stringify({ inputs: form.description }), 
      }
    );

    const blob = await response.blob();
    setImage(URL.createObjectURL(blob));
    console.log(image)
  }
  const download = () => {
    try {
      if (!image) {
        console.log("no image")
        return
      };
      const link = document.createElement('a');
      link.href = image;
      link.download = `${form.description}.png`;
      link.click()

    }
    catch (e) {
      console.log("Error ", e);
    }
  }

  // const handleHashImage = async () => {
  //   if (!image) {
  //     return;
  //   }
  //   const base64String = await convertToBase64(image);
  //   console.log(base64String);
  //   const hashedValue = hashWithSHA256(base64String);
  //   setHashValue(hashedValue);
  //   console.log(hashedValue)
  // };

  const convertToBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.readAsDataURL(file);
    });
  };

  const hashWithSHA256 = (input) => {
    return crypto.SHA256(input).toString();
  };

  async function OnChangeFile(e) {

    setForm({ ...form, [e.target.name]: e.target.value });
    var file = e.target.files[0];
    setImage(file)
    //check for file extension
    try {
      //upload the file to IPFS
      console.log("Hashvalue: ",hashValue);
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        console.log("Uploaded file to Pinata: ", response.pinataURL)
        setFileURL(response.pinataURL);
      }
    }
    catch (e) {
      console.log("Error during file upload", e);
    }
  }

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const { title, collection, description, fileFormat } = form;
    //Make sure that none of the fields are empty
    if (!title || !collection || !description || !fileURL || !fileFormat)
      return;
    setMsg("Uploading NFT(takes 2-3 mins)...")
    const nftJSON = {
      title, collection, description, fileFormat, image: fileURL
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
    if (showGenerateBtn == true) {
      alert("download and upload your ai image and create it to nft");
      download();
    }

    //Upload data to IPFS
    try {
      if (!image) {
        return;
      }
      const base64String = await convertToBase64(image);
      console.log(base64String);
      const hashedValue = hashWithSHA256(base64String);
      const metadataURL = await uploadMetadataToIPFS();
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();


      //Pull the deployed contract instance
      let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer);
      let transaction = await contract.CreateToken(metadataURL, hashedValue, form.fileFormat);
      await transaction.wait()
      alert("Successfully created your NFT!");
      setMsg("");
      setForm({ title: '', collection: '', description: '', file: '', fileFormat: '' });
      window.location.replace("/profile")
    }
    catch (e) {
      console.log("Upload error" + e)
      alert("Error in crreating NFT" + e);
    }
  }

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
                <p>Image</p><p className="text-red-800" >*</p>
              </div>
              <div className="flex justify-between gap-2 text-xl tracking-widest">
                <button className="bg-gray-800 w-full h-24 rounded-xl" onClick={handleUpload}>
                  Upload File
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
                    <div className="flex justify-between items-center px-24 pt-12 text-xl">
                      <div>
                        <label >
                          <input
                            type="radio"
                            name="fileFormat"
                            value="1"
                            checked={form.fileFormat === "1"}
                            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
                          <span className="pl-2">Image</span>
                        </label>
                      </div>
                      <div>
                        <label >
                          <input
                            type="radio"
                            name="fileFormat"
                            value="2"
                            checked={form.fileFormat === "2"}
                            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
                          <span className="pl-2">Audio</span>
                        </label>
                      </div>
                      <div>
                        <label >
                          <input
                            type="radio"
                            name="fileFormat"
                            value="3"
                            checked={form.fileFormat === "3"}
                            onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
                          <span className="pl-2">Video</span>
                        </label>
                      </div>
                    </div>

                    {
                      form.fileFormat == "1" ?
                        <>
                          <div className="pt-8">
                            <input
                              type="file"
                              name="file"
                              className="border border-white w-full rounded-xl"
                              onChange={OnChangeFile}
                              value={form.file}
                              accept=".jpg, .jpeg, .png"
                            />
                            <div className="p-2"><span className="tracking-widest text-red-400">.jpg, .jpeg, .png only</span></div>
                          </div>
                        </>
                        :
                        <></>
                    }
                    {
                      form.fileFormat == "2" ?
                        <>
                          <div className="pt-8">
                            <input
                              type="file"
                              name="file"
                              className="border border-white w-full rounded-xl"
                              onChange={OnChangeFile}
                              value={form.file}
                              accept=".mp3"
                            />
                            <div className="p-2"><span className="tracking-widest text-red-400">.mp3 only</span></div>
                          </div>
                        </>
                        :
                        <></>
                    }
                    {
                      form.fileFormat == "3" ?
                        <>
                          <div className="pt-8">
                            <input
                              type="file"
                              name="file"
                              className="border border-white w-full rounded-xl"
                              onChange={OnChangeFile}
                              value={form.file}
                              accept=".mp4"
                            />
                            <div className="p-2"><span className="tracking-widest text-red-400">.mp4 only</span></div>
                          </div>
                        </>
                        :
                        <></>
                    }

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
                        image != null ?
                          <>
                            <div className="grid justify-center w-full ">
                              <img src={image} alt="generated" className="pt-4 w-[400px] h-[300px] rounded-t-3xl" />
                              <button className="bg-gray-700 text-white h-12 w-full font-bold text-xl rounded-b-3xl" onClick={download}>
                                Download
                              </button>
                            </div>

                          </>

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
