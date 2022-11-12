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
    verify: process.env.EXPLORER_KEY_GOERLI ? true : false,
  },
  mumbai: {
    confirmations: 6,
    verify: process.env.EXPLORER_KEY_MUMBAI ? true : false,
  },
  og: {
    confirmations: 6,
    verify: process.env.EXPLORER_KEY_OG ? true : false,
  },
}
