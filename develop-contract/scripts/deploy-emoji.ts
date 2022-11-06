import { deploy, setup } from "./utils"
import { parseEther } from "ethers/lib/utils"
import { ethers } from "hardhat"
import { Emoji } from "../typechain-types"

async function main() {
  const signers = await setup()
  const name = "Emoji"
  const factory = await ethers.getContractFactory(name, signers[0])
  await deploy<typeof factory, Emoji>({
    name,
    factory,
    constructorArgs: [
      parseEther("0.01"),
      parseEther("0.002"),
      9,
      "https://example.com/metadata/json",
    ],
  })
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
