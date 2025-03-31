import { ethers } from "ethers";
import Web3Modal from "web3modal";

export const connectWallet = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
  } catch (error) {
    console.error("Wallet connection failed", error);
  }
};