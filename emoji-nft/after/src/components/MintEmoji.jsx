import { useConnectModal } from "@rainbow-me/rainbowkit"
import { formatEther } from "ethers/lib/utils"
import { useState } from "react"
import { useSigner } from "wagmi"
import { CHAIN_SYMBOL } from "../constants/config"

export const MintEmoji = ({ status, contract, onMinted }) => {
  const { data: signer } = useSigner()
  const { openConnectModal } = useConnectModal()
  const [isMinting, setIsMinting] = useState(false)

  const mint = async () => {
    if (!signer) return
    const writableContract = contract.connect(signer)
    setIsMinting(true)
    try {
      const tx = await writableContract.mint({ value: status.mintPrice })
      await tx.wait()
      onMinted()
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
    <button
      className="bg-amber-500 text-white hover:bg-amber-600 font-bold py-2 px-4 my-4 rounded-lg disabled:opacity-50"
      onClick={mint}
      disabled={isMinting}
    >
      Emojiをミント（{formatEther(status.mintPrice)} {CHAIN_SYMBOL}）
    </button>
  )
}
