const hre = require("hardhat")
const { ethers, waffle } = require('hardhat')
const provider = waffle.provider

;(async function() {
  try {
    let [owner, user, lp] = await hre.ethers.getSigners()
    console.log(owner.address)
    console.log(await provider.getBalance(owner.address))
    const factoryContract = await ethers.getContractFactory("WU2U")
    const factoryContractIns = await factoryContract.deploy()
    console.log('Factory address: ', factoryContractIns.address)

  } catch (error) {
    console.log(error)
  }
})()
