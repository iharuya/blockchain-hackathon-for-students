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

import { Layout } from "./Layout"

const App = () => {
  return (
    // WagmiConfigとRainbowKitProviderをセットします
    <Layout />
    // こうすることで内側にあるコンポーネント(<Layout />)で
    // wagmiとrainbowkitのhook（拡張機能）を使うことができます
  )
}

export default App
