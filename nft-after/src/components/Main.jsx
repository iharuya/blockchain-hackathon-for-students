import { useEffect, useState } from "react"
import { useContract, useProvider } from "wagmi"
import { ADDRESS, ABI } from "../constants/emojiContract"
import { ContractStatus } from "./ContractStatus"
import { MintEmoji } from "./MintEmoji"

export const Main = () => {
  const provider = useProvider()
  const contract = useContract({
    address: ADDRESS,
    abi: ABI,
    signerOrProvider: provider,
  })
  const [contractStatus, setContractStatus] = useState()

  useEffect(() => {
    if (!contract) return
    updateContractStatus()
  }, [contract])

  const updateContractStatus = async () => {
    const currentSupply = (await contract.nextTokenId()).toNumber()
    const maxSupply = (await contract.MAX_TOKENID()).toNumber() + 1
    const mintPrice = await contract.getMintPrice()
    setContractStatus({
      currentSupply,
      maxSupply,
      mintPrice,
    })
  }
  return (
    <div className="text-center">
      <h1 className="text-4xl mb-4">Emoji NFT</h1>
      {contractStatus === undefined ? (
        <p>コントラクトをロード中...</p>
      ) : (
        <div>
          <ContractStatus status={contractStatus} />
          <MintEmoji
            status={contractStatus}
            contract={contract}
            onMinted={updateContractStatus}
          />
        </div>
      )}
    </div>
  )
}
