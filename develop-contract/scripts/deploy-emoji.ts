import { setup, deployContract } from "./utils"

async function main() {
  await setup()
  await deployContract("Emoji", [])
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
