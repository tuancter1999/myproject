const { ethers } = require("hardhat");
const encodePriceSqrt = require("./util")
async function createPool() {
  const [deployer] = await ethers.getSigners();

  // Get the deployed Uniswap V3 Factory contract
  const factoryAddress = "0xae3Cdf25FD5C3443dea93Cc7aF3226395B48C53A"; // Replace with the actual address
  const UniswapV3Factory = await ethers.getContractFactory("WU2U");
  const factory = await UniswapV3Factory.attach(factoryAddress);

  // Token addresses for the two tokens you want to create a pool for
  const token1 = '0xae3Cdf25FD5C3443dea93Cc7aF3226395B48C53A';
  const token0 = '0x9a0359e8432c856e1eefc6f2e242b5dfed41b3ec';

  // Desired fee for the pool (e.g., 0.3%)
  const fee = 3000;

  // Tick range for the pool
  const tickLower = -887220;
  const tickUpper = -887200;

  // Amounts of the two tokens to provide as initial liquidity
  const amount0Desired = ethers.utils.parseUnits("100", 18);
  const amount1Desired = ethers.utils.parseUnits("200", 18);

  // Other parameters for creating the pool
  const recipient = deployer.address;
  const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // Deadline 10 minutes from now

  const sqrtPriceX96 = encodePriceSqrt.encodePriceSqrt(1000, 10);

  // Create the pool
  const tx = await factory.deposit({value: "100000000000000000000"});

  // Wait for the transaction to be mined
  await tx.wait();

  console.log("Pool created successfully!");
}

createPool().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});
