require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/nAhiCHKvZkhkp4A7PkkCIBON0-BXW26d`,
      //accounts: [process.env.privateKey]
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: ["0e8783f205bb9845a1711a209a532688ad6ad0faf12c7f7e483f3729956fa0be"]
    },
    goerli: {
      url: "https://goerli.infura.io/v3/30f2472011e445d29bc3689063eec747",
      accounts: ["69aa43b735fb5718095e12a5ceff419880368533a0d38f7ac15f37457a3abcef"]
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/5e04f552f57346ff970db9991b9320cc",
      accounts: ["f43a437b1d35270f6354f37b55e3346ca8fceb4eeeab8ceab3afe7eb892b5ae9"]
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};