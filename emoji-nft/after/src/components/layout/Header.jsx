import { ConnectButton } from "@rainbow-me/rainbowkit"

export const Header = () => {
  return (
    <header className="bg-amber-500 text-white flex mb-4">
      <div className="inline-flex items-center space-x-4">
        <img src="/logo.png" alt="logo" width={64} className="" />
        <span className="text-xl font-bold">Emoji NFT</span>
      </div>
      <div className="ml-auto inline-flex items-center pr-4">
        <ConnectButton label="ウォレットを接続" />
      </div>
    </header>
  )
}
