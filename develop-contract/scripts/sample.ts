import { setup, deployContract } from "./utils"
import type { Sample } from "../typechain-types"

// Sample.solコントラクトをデプロイし、初期値の変更を確認するスクリプト
async function main() {
  await setup()
  const contract = (await deployContract("Sample", ["Hello"])) as Sample
  let message = await contract.message()
  console.log(`Initial message: ${message}`)
  await contract.setMessage("Hello Solidity!")
  message = await contract.message()
  console.log(`Updated message: ${message}`)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
