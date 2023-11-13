const hre = require("hardhat")

;(async function() {
  try {

    const wtbcContract = await hre.ethers.getContractFactory('WETH')
    const wtbcContractIns = await wtbcContract.deploy()
    await wtbcContractIns.deployed()
    console.log(`Wrapped TBC Contract deployed to ${wtbcContractIns.address}`)

    // Deploy factory
    const factoryContract = await hre.ethers.getContractFactory('U2UV3Factory')
    const factoryContractIns = await factoryContract.deploy()
    console.log('Factory deployed at: ', factoryContractIns.address)

    const swapRouter = await hre.ethers.getContractFactory('SwapRouter')
    const swapRouterIns = await swapRouter.deploy(factoryContractIns.address, wtbcContractIns.address)
    console.log('Swap router deployed at: ', swapRouterIns.address)
  } catch (error) {
    console.log(error)
  }
})()
