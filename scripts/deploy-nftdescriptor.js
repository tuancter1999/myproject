const hre = require("hardhat")

;(async function() {
  try {

    const descriptionContract = await hre.ethers.getContractFactory('NFTDescriptor')
    const descriptionContractIns = await descriptionContract.deploy()
    await descriptionContractIns.deployed()
    console.log(`Wrapped TBC Contract deployed to ${descriptionContractIns.address}`)

    
  } catch (error) {
    console.log(error)
  }
})()
