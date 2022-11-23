import { setup, deploy } from "./utils"
import { Sample } from "../typechain-types"
import { ethers } from "hardhat"

// Sample.solコントラクトをデプロイし、初期値の変更を確認するスクリプト
async function main() {
  await setup()
  const name = "Sample"
  const factory = await ethers.getContractFactory(name)
  const contract = await deploy<typeof factory, Sample>({
    name,
    factory,
    constructorArgs: ["Hello"],
  })

  let message = await contract.message()
  // messageの型がstringと分かるのはcontractをdeployするときに型Sampleを指定したからです
  console.log(`Initial message: ${message}`)
  await contract.setMessage("Hello Solidity!")
  message = await contract.message()
  console.log(`Updated message: ${message}`)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
