import { expect, assert } from "chai"
import { ethers } from "hardhat"
import { deploy, setup } from "../scripts/utils"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Sample } from "../typechain-types/contracts/Sample"

// Sample.solのテスト
describe("Sample contract", function () {
  let contract: Sample
  let signers: SignerWithAddress[]

  async function reset() {
    console.log("Reset")
    signers = await setup(true)
    const name = "Sample"
    const factory = await ethers.getContractFactory(name)
    contract = await deploy<typeof factory, Sample>({
      name,
      factory,
      constructorArgs: ["Hello"],
      isTesting: true,
    })
  }

  describe("constructor", function () {
    beforeEach(reset)
    it("deployed correctly", async function () {
      const message = await contract.message()
      assert.strictEqual(message, "Hello")
    })
  })

  describe("setMessage", function () {
    beforeEach(reset)
    it("runs correctly", async function () {
      await contract.setMessage("Hello, world")
      const newMessage = await contract.message()
      assert.strictEqual(newMessage, "Hello, world")
    })
  })
})
