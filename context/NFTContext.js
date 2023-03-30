import React, { useState, useEffect } from 'react';
import web3Modal from 'web3modal';
import ethers from 'ethers';
import axios from 'axios';

import { MarketAddress, MarketAddressABI } from './constants';

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const nftcurrency = 'ETH';

  return (
    <NFTContext.Provider value={{ nftcurrency }}>
      {children}
    </NFTContext.Provider>
  );
};
