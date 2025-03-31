import { useState } from "react";
import { connectWallet, getChainId } from "../utils/wallet";
import { Button } from "@mui/material";

export default function WalletButton() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [chainId, setChainId] = useState(null);

  const handleConnect = async () => {
    try {
      const signer = await connectWallet();
      if (signer) {
        setWalletAddress(await signer.getAddress());
        const currentChainId = await getChainId();
        setChainId(currentChainId);
      }
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  return (
    <div>
      <Button 
        variant="contained" 
        sx={{ backgroundColor: "#10B981", "&:hover": { backgroundColor: "#388E3C" } }} style={{marginLeft: "150px" }}
        onClick={handleConnect}
      >
        {walletAddress ? walletAddress.substring(0, 6) + "..." : "Connect Wallet"}
      </Button>
      {chainId && <p>Chain ID: {chainId}</p>}
    </div>
  );
}