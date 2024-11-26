import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    hardhat: {}, // Default local network
    base: {
      url: "https://mainnet.base.org", // Base Mainnet RPC URL
      chainId: 8453, // Base Mainnet Chain ID
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [], // Load private key from .env
    },
    ethereum: {
      url: process.env.ETHEREUM_RPC_URL || "", // Ethereum RPC URL
      chainId: 1, // Ethereum Mainnet Chain ID
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [], // Load private key from .env
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL || "", // Polygon RPC URL
      chainId: 137, // Polygon Mainnet Chain ID
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [], // Load private key from .env
    },
  },
  etherscan: {
    apiKey: {
      base: process.env.BASESCAN_API_KEY || "", // BaseScan API Key
      ethereum: process.env.ETHERSCAN_API_KEY || "", // Etherscan API Key
      polygon: process.env.POLYGONSCAN_API_KEY || "", // Polygonscan API Key
    },
  },
};

export default config;
