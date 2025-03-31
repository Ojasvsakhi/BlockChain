/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle")
const ALCHEMY_API_KEY = "ZlZOXcxLHEhcXL1xP3gMgISSiOlQ0cN2";

const SEPOLIA_PRIVATE_KEY="45d3a6a7ac61050c8e9a0b706b0d71fedf8569f159cc1506973983854e5bdb0a";
module.exports = {
  solidity: "0.8.28",
  networks:{
    sepolia:{
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts:[`${SEPOLIA_PRIVATE_KEY}`]
    }
  }
};