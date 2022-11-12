import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { Layout } from "./Layout"
const { chains, provider } = configureChains(
  [chain.optimismGoerli],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_APIKEY }),
    publicProvider(),
  ]
)
const { connectors } = getDefaultWallets({
  appName: "Emoji NFT Project",
  chains,
})
const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
})

const App = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        <Layout />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
