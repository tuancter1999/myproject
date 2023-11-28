const hre = require("hardhat")

;(async function() {
  try {

    const wu2uContract = await hre.ethers.getContractFactory('WU2U')
    const wu2uContractIns = await wu2uContract.deploy()
    await wu2uContractIns.deployed()
    console.log(`Wrapped U2U Contract deployed to ${wu2uContractIns.address}`)

    // // Deploy factory
    // const factoryContract = await hre.ethers.getContractFactory('U2UV3Factory')
    // const factoryContractIns = await factoryContract.deploy()
    // console.log('Factory deployed at: ', factoryContractIns.address)

    // const swapRouter = await hre.ethers.getContractFactory('SwapRouter')
    // const swapRouterIns = await swapRouter.deploy(factoryContractIns.address, wu2uContractIns.address)
    // console.log('Swap router deployed at: ', swapRouterIns.address)
  } catch (error) {
    console.log(error)
  }
})()
