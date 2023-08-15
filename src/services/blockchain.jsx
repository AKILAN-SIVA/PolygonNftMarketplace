import { ethers } from "ethers";
import axios from "axios";
import Marketplace from '../Marketplace.json';

const ContractAddress = Marketplace.address;
const Abi = Marketplace.abi;

const BuyNFT = async(tokenId) =>{

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    let contract = new ethers.Contract(ContractAddress,Abi,signer);

    let transaction = await contract.BuyNFt(tokenId);

    await transaction.wait();

}

export default BuyNFT;