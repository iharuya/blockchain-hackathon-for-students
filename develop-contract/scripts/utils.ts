import { network, ethers, run } from "hardhat"
import { networksConfig } from "../helper"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Contract, ContractFactory } from "ethers"

const networkConfigHelper = networksConfig[network.name]

export async function setup(isTesting = false): Promise<SignerWithAddress[]> {
  !isTesting && console.log("=== Setup ===")
  const signers = await ethers.getSigners()
  const deployer = signers[0]
  !isTesting && console.log("Network:", network.name)
  !isTesting && console.log("Deployer:", deployer.address)
  if (network.name === "localhost") {
    await sendValues(
      signers.map((signer) => signer.address),
      "1"
    )
    !isTesting && console.log("Sent signers 1 eth respectively")
  }
  !isTesting &&
    console.log(
      `Deployer balance:${ethers.utils.formatEther(await deployer.getBalance()).toString()}`,
      `\n=============\n`
    )
  return signers
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

// factoryを指定するとconstructorの型チェックをする
type DeployType<F extends ContractFactory> = {
  name: string
  factory?: F
  constructorArgs?: Parameters<F["deploy"]> | any[]
  isTesting?: boolean
}
export async function deploy<F extends ContractFactory, C extends Contract>(
  args: DeployType<F>
): Promise<C> {
  !args.isTesting && console.log(`Deploying contract ${args.name}...`)
  const factory = args.factory || (await ethers.getContractFactory(args.name))
  const contract = (await factory.deploy(...(args.constructorArgs || []))) as C
  await contract.deployed()
  await contract.deployTransaction.wait(networkConfigHelper?.confirmations || 1)
  !args.isTesting && console.log(`Contract "${args.name}" deployed to ${contract.address}`)
  if (networkConfigHelper?.verify && !args.isTesting) {
    await verify(contract.address, args.constructorArgs || [])
  }
  return contract
}

export async function verify<Args>(address: string, args: Args | any[]) {
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
