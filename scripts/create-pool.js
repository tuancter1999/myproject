const { ethers } = require("hardhat");
const encodePriceSqrt = require("./util")
async function createPool() {
  const [deployer] = await ethers.getSigners();

  // Get the deployed Uniswap V3 Factory contract
  const factoryAddress = "0xa5d1a07031c15c928c6c425f9de447ebf54ccede"; // Replace with the actual address
  const UniswapV3Factory = await ethers.getContractFactory("NonfungiblePositionManager");
  const factory = await UniswapV3Factory.attach(factoryAddress);

  // Token addresses for the two tokens you want to create a pool for
  const token0 = '0xC5f15624b4256C1206e4BB93f2CCc9163A75b703';
  const token1 = '0xdFAe88F8610a038AFcDF47A5BC77C0963C65087c';

  // Desired fee for the pool (e.g., 0.3%)
  const fee = 10000;

  const sqrtPriceX96 = encodePriceSqrt.encodePriceSqrt(1, 100);
  console.log(sqrtPriceX96)
  // return

  // Create the pool
  const tx = await factory.createAndInitializePoolIfNecessary(
    token0,
    token1,
    fee,
    sqrtPriceX96
  );

  // Wait for the transaction to be mined
  await tx.wait();

  console.log("Pool created successfully!");
}

createPool().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});
