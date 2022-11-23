import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-ethers"
import "@openzeppelin/hardhat-upgrades"
import "dotenv/config"

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: {
        mnemonic: process.env.DEV_MNEMONIC || "",
      },
    },
    goerli: {
      url: process.env.RPC_URL_GOERLI || "",
      accounts: {
        mnemonic: process.env.DEV_MNEMONIC || "",
      },
    },
    mumbai: {
      url: process.env.RPC_URL_MUMBAI || "",
      accounts: {
        mnemonic: process.env.DEV_MNEMONIC || "",
      },
    },
    og: {
      url: process.env.RPC_URL_OG || "",
      accounts: {
        mnemonic: process.env.DEV_MNEMONIC || "",
      },
    },
    ag: {
      url: process.env.RPC_URL_AG || "",
      accounts: {
        mnemonic: process.env.DEV_MNEMONIC || "",
      },
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.EXPLORER_KEY_GOERLI || "",
      polygonMumbai: process.env.EXPLORER_KEY_MUMBAI || "",
      og: process.env.EXPLORER_KEY_OG || "",
      ag: process.env.EXPLORER_KEY_AG || "",
    },
    customChains: [
      {
        network: "og",
        chainId: 420,
        urls: {
          apiURL: "https://api-goerli-optimism.etherscan.io/api",
          browserURL: "https://goerli-optimism.etherscan.io",
        },
      },
      {
        network: "ag",
        chainId: 421613,
        urls: {
          apiURL: "https://api-goerli.arbiscan.io/api",
          browserURL: "https://testnet.arbiscan.io",
        },
      },
    ],
  },
}

export default config
