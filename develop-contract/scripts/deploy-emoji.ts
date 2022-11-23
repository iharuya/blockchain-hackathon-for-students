import { deploy, setup } from "./utils"
import { parseEther } from "ethers/lib/utils"
import { ethers } from "hardhat"
import { Emoji } from "../typechain-types"

async function main() {
  await setup()
  const name = "Emoji"
  const factory = await ethers.getContractFactory(name)
  await deploy<typeof factory, Emoji>({
    name,
    factory,
    constructorArgs: [
      parseEther("0.002"),
      parseEther("0.01"),
      9,
      "https://iharuya.github.io/emoji-nft-metadata",
    ],
  })
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
