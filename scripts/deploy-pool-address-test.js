const hre = require("hardhat")

;(async function() {
  try {
    // Deploy factory
    const factoryContract = await hre.ethers.getContractFactory('PoolAddressTest')
    const factoryContractIns = await factoryContract.deploy()
    console.log('NonfungiblePositioPoolAddressTest  deployed at: ', factoryContractIns.address)

    
  } catch (error) {
    console.log(error)
  }
})()
