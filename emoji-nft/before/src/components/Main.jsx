import { useEffect, useState } from "react"
import { OPENSEA_COLLECTION_URL } from "../constants/config"
import { ContractStatus } from "./ContractStatus"

export const Main = () => {
  // @todo: wagmiのhookを使ってEmojiコントラクトをインスタンス化しよう
  const provider = undefined
  const contract = undefined

  const [contractStatus, setContractStatus] = useState()

  useEffect(() => {
    if (!contract) return
    updateContractStatus()
  }, [contract])

  const updateContractStatus = async () => {
    // @todo: 現在のmintPriceをブロックチェーンから読み取ろう
    // スマコンの整数の戻り値はethersjsで扱うときBigNumberオブジェクトになって返ってきます
    const mintPrice = undefined
    const currentSupply = (await contract.nextTokenId()).toNumber()
    const maxSupply = (await contract.MAX_TOKENID()).toNumber() + 1
    setContractStatus({
      currentSupply, // currentSupply: currentSupply の省略記法
      maxSupply,
      mintPrice,
    })
  }
  return (
    <div className="max-w-5xl mx-auto text-center">
      <div className="mb-4">
        <h1 className="text-4xl">Emoji NFT</h1>
        <a
          href={OPENSEA_COLLECTION_URL}
          target="_blank"
          className="underline text-sky-500 text-lg"
        >
          Openseaでみる
        </a>
      </div>
      {contractStatus === undefined ? (
        <p>コントラクトをロード中...</p>
      ) : (
        <div>
          <ContractStatus status={contractStatus} />

          {/* todo 1: MintEmojiコンポーネントを使ってNFTをミントできるようにしよう */}
          {/* また、ミントされたら、updateContractStatusを実行するようにしよう */}

          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* todo 2: EmojiCardコンポーネントを使ってミントされたそれぞれのNFTを表示してみよう */}
            {/* ヒント: react map, currentSupply, [...Array(n).keys()] */}
          </div>
        </div>
      )}
    </div>
  )
}
