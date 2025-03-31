import { ethers } from "ethers";
import Web3Modal from "web3modal";

export const connectWallet = async () => {
  try {
    // const web3Modal = new Web3Modal();
    // const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
  } catch (error) {
    console.error("Wallet connection failed", error);
  }
};
export const getChainId = async () => {
  try {
    const web3Modal = new Web3Modal();
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const chainId = await provider.getNetwork().then(data => data.chainId);
    return chainId;
  } catch (error) {
    console.error("Failed to get chainId", error);
  }
};
