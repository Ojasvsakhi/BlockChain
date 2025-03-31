import React, { useState } from 'react';
import { Button } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const WalletButton = ({ onConnect }) => {
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setAccount(accounts[0]);
        if (onConnect) {
          onConnect(accounts[0]);
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={connectWallet}
      startIcon={<AccountBalanceWalletIcon />}
    >
      {account ? `Connected: ${account}` : 'Connect Wallet'}
    </Button>
  );
};

export default WalletButton;