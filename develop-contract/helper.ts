import "dotenv/config"
interface NetworkConfig {
  confirmations?: number
  verify?: boolean
}
interface NetworksConfig {
  [networkName: string]: NetworkConfig | undefined
}
export const networksConfig: NetworksConfig = {
  goerli: {
    confirmations: 6,
    verify: process.env.ETHERSCAN_APIKEY ? true : false,
  },
  mumbai: {
    confirmations: 6,
    verify: process.env.POLYGONSCAN_APIKEY ? true : false,
  },
}
