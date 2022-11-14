import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useState } from "react"
import { useSigner } from "wagmi"

export const MintEmoji = ({ status, contract, handleMint }) => {
  const { data: signer } = useSigner()
  const [isMinting, setIsMinting] = useState(false)
  const { openConnectModal } = useConnectModal()

  const mint = async () => {
    if (!signer) return
    // Todo: contractオブジェクトをwritableなものにしよう
    // propsのcontractはproviderに接続しています
    // ブロックチェーンにデータを書き込む(=Txを送る)には
    // 接続しているsignerに接続する必要があります
    const writableContract = undefined

    setIsMinting(true)
    try {
      // Todo: 適切な価格を支払ってmintしよう
      const tx = undefined
      await tx.wait() // TXの入ったブロックが過去のものとなるまで待つ
      handleMint() // 親コンポーネントにmintされたことを伝える
    } catch (err) {
      if (err.code !== "ACTION_REJECTED") {
        console.error(err)
      }
    }
    setIsMinting(false)
  }

  const isSoldout = status.currentSupply === status.maxSupply
  if (isSoldout) {
    return <p className="py-4 text-lg text-gray-700">売り切れました</p>
  }
  if (!signer) {
    return (
      <button
        className="bg-sky-500 text-white hover:bg-sky-600 font-bold py-2 px-4 my-4 rounded-lg"
        onClick={openConnectModal}
      >
        ウォレットを接続
      </button>
    )
  }

  return (
    // @todo: ボタンのカッコ内に次のNFTのミント価格を表示しよう
    // ヒント: formatEther, CHAIN_SYMBOL
    <button
      className="bg-amber-500 text-white hover:bg-amber-600 font-bold py-2 px-4 my-4 rounded-lg disabled:opacity-50"
      onClick={mint}
      disabled={isMinting}
    >
      Emojiをミント（）
    </button>
  )
}
