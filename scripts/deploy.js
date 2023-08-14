import { error } from "console";
import hre from "hardhat";
import pkg from 'hardhat';
const {ethers} = pkg;
import fs from 'fs';

async function main(){
  const [deployer] = await ethers.getSigners();
  const Marketplace = await hre.ethers.getContractFactory("PolygonNFTMarketplace");
  const PolygonMarketplace = await Marketplace.deploy();
  await PolygonMarketplace.deployed();

  const data = {
    address : PolygonMarketplace.address,
    abi : JSON.parse(PolygonMarketplace.interface.format('json'))
  }

  fs.writeFileSync('./src/Marketplace.json',JSON.stringify(data)); 
}
  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });