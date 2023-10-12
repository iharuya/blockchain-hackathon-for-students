// Reactの一番元となるコンポーネント
// ここではブロックチェーンやウォレットの接続に関する設定を行う

/*
@todo
https://www.rainbowkit.com/docs/installation
のManual setupを参照して、アプリにweb3要素を足す設定をしよう
接続するチェーンは`chain.optimismGoerli`のみです

ヒント
viteで環境変数をインポートするときは`import.meta.env.[名前]`とします
*/

import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"

const { chains, provider } = configureChains(
  [chain.optimismGoerli],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_APIKEY }),
    publicProvider(),
  ]
)
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
})
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})
import { Layout } from "./Layout"

const App = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Layout />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
