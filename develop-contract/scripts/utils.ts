import { network, ethers, run } from "hardhat"
import { networksConfig } from "../helper"
import type { Contract } from "@ethersproject/contracts"

const networkConfigHelper = networksConfig[network.name]

export async function setup() {
  console.log("=== Setup ===")
  const signers = await ethers.getSigners()
  const deployer = signers[0]
  console.log("Network:", network.name)
  console.log("Deployer:", deployer.address)
  if (network.name === "localhost") {
    await sendValues(
      signers.map((signer) => signer.address),
      "1"
    )
    console.log("Sent signers 1 eth respectively")
  }
  console.log("Deployer balance:", ethers.utils.formatEther(await deployer.getBalance()).toString())
  console.log("=============\n")
}

export async function deployContract(name: string, params: any[]): Promise<Contract> {
  console.log(`Deploying contract "${name}"...`)
  const factory = await ethers.getContractFactory(name)
  const contract = await factory.deploy(...params)
  await contract.deployed()
  await contract.deployTransaction.wait(networkConfigHelper?.confirmations || 1)
  console.log(`Contract "${name}" deployed to ${contract.address}`)
  if (networkConfigHelper?.verify) {
    await verify(contract.address, params)
  }
  return contract
}

// Only for the hardhat localhost network
export async function sendValues(addresses: string[], eth: string) {
  let sender = new ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
  )
  sender = sender.connect(ethers.provider)
  const sendAmount = ethers.utils.parseEther(eth)
  for (const address of addresses) {
    const tx = { to: address, value: sendAmount }
    await sender.sendTransaction(tx)
  }
}

async function verify(address: string, args: any[]) {
  try {
    console.log("Verifying contract...")
    await run("verify:verify", {
      address: address,
      constructorArguments: args,
    })
    console.log("Verified")
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified")
    } else {
      console.error(error)
    }
  }
}
