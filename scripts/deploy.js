const hre = require('hardhat');
// const { ethers } = require('hardhat');

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory('NFTMarketplace');
  const nftmarketplace = await NFTMarketplace.deploy();

  await nftmarketplace.deployed();

  console.log('NFTMarketplace deployed to:', nftmarketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
