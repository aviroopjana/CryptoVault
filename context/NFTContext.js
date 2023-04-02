import React, { useState, useEffect } from 'react';
import web3Modal from 'web3modal';
import ethers from 'ethers';
import axios from 'axios';
import { ThirdwebStorage } from '@thirdweb-dev/storage';
import { readFileSync } from 'fs';
// import { create as ipfsHttpClient } from 'ipfs-http-client';

import { MarketAddress, MarketAddressABI } from './constants';

// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setcurrentAccount] = useState('');
  const [fileUrl, setfileUrl] = useState('');
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

  // const Storage = new ThirdwebStorage();
  //       const upload = await Storage.upload(data);

  //       var url = Storage.resolveScheme(upload);

  const uploadToThirdwebStorage = async (filePath) => {
    const file = readFileSync(filePath);
    const storage = new ThirdwebStorage();
    const upload = await storage.upload(file);
    const url = storage.resolveScheme(upload);
    return url;
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const fileUrl = await uploadToThirdwebStorage(file.path);
    setfileUrl(fileUrl);
  };

  // const uploadToIPFS = async (file, setfileUrl) => {
  //   try {
  //     const added = await client.add({ content: file });

  //     const url = `https://ipfs.infura.io/ipfs/${added.path}`;

  //     return url;
  //   } catch (error) {
  //     console.log('Error uploading file to IPFS', error);
  //   }
  // };

  return (
    <NFTContext.Provider value={{ nftcurrency, connectWallet, currentAccount, fileUrl }}>
      {children}
    </NFTContext.Provider>
  );
};
