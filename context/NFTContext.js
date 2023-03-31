import React, { useState, useEffect } from 'react';
import web3Modal from 'web3modal';
import ethers from 'ethers';
import axios from 'axios';

import { MarketAddress, MarketAddressABI } from './constants';

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setcurrentAccount] = useState('');
  const nftcurrency = 'ETH';

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert('Please install MetaMask!');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setcurrentAccount(accounts[0]);
    } else {
      console.log('No Accounts Found!');
    }

    console.log(accounts);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please! install MetaMask');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    setcurrentAccount(accounts[0]);

    window.location.reload();
  };

  return (
    <NFTContext.Provider value={{ nftcurrency, connectWallet, currentAccount }}>
      {children}
    </NFTContext.Provider>
  );
};
