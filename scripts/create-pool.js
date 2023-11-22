const { ethers } = require("hardhat");

async function createPool() {
  const [deployer] = await ethers.getSigners();

  // Get the deployed Uniswap V3 Factory contract
  const factoryAddress = "0xCf3116898252a20a60Da81d364FfEd207BAfF4d9"; // Replace with the actual address
  const UniswapV3Factory = await ethers.getContractFactory("NonfungiblePositionManager");
  const factory = await UniswapV3Factory.attach(factoryAddress);

  // Token addresses for the two tokens you want to create a pool for
  const token0 = '0x99969825C9c18BA93C9998F95c4bB7F6EB5E2c39';
  const token1 = '0xF2F00ED60982365877989BC53D123B027388E81e';

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

  const sqrtPriceX96 = '56022770974786139918731938227';

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
