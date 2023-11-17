const hre = require("hardhat")

;(async function() {
  try {

    const descriptionContract = await hre.ethers.getContractFactory('NonfungibleTokenPositionDescriptor', {
      libraries: {
        NFTDescriptor: "0x20283caF6762BCc511E7114878B5a4c7732e025a",
      },})
    const descriptionContractIns = await descriptionContract.deploy('0x003B2a50C925343280e43A8C48D13EDDe2598a9E')
    await descriptionContractIns.deployed()
    console.log(`Wrapped TBC Contract deployed to ${descriptionContractIns.address}`)

    // Deploy factory
    const factoryContract = await hre.ethers.getContractFactory('NonfungiblePositionManager')
    const factoryContractIns = await factoryContract.deploy('0xedc2aCaC005DDaA5e7A4d644c31db6761C80e8D2', '0x003B2a50C925343280e43A8C48D13EDDe2598a9E', descriptionContractIns.address)
    console.log('NonfungiblePositionManager deployed at: ', factoryContractIns.address)

    
  } catch (error) {
    console.log(error)
  }
})()
