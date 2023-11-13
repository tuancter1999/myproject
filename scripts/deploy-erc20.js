const hre = require("hardhat")
const { ethers, waffle } = require('hardhat')

;(async function() {
  try {
    let [owner, user, lp] = await hre.ethers.getSigners()

    // Deposit tbc
    const factoryContract = await ethers.getContractFactory("ERC20Factory")
    // Start deployment, returning a promise that resolves to a contract object
    const factoryContractIns = await factoryContract.attach(CONSTANT.ERC_TOKEN_FACTORY)
    const contract = await factoryContractIns.deployNewERC20Token("0xE4B8f63C111EF118587D30401e1Db99f4CfBD900", 'USDT', 'USDT', ethers.utils.parseUnits('1000000', 18))

    console.log('Token address: ', contract)

  } catch (error) {
    console.log(error)
  }
})()
