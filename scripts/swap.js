const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying from address:', deployer.address);

  // Replace these values with your own
  const tokenInAddress = '0x22BB25D5Cc6BA10642C9afA3EEb5e4bC6052C757'; // Address of the token you want to swap
  const tokenOutAddress = '0xB2606029DE4AD7b30c615712726477ED466002d2'; // Address of the token you want to receive
  const amountIn = ethers.utils.parseUnits('1.1', 18); // Amount in Wei (1 ETH in Wei, for example)
  const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // Deadline 10 minutes from now

  // Replace with the actual Uniswap router address
  const uniswapRouterAddress = '0x51a6A6D3F696F0650E4c683d0B2d459ae96f02A4';

  // Load the Uniswap Router contract
  const uniswapRouter = await ethers.getContractAt('ISwapRouter', uniswapRouterAddress);

  // Swap tokens using exactInputSingle
  const tx = await uniswapRouter.exactInputSingle({
    tokenIn: tokenInAddress,
    tokenOut: tokenOutAddress,
    fee: 3000, // 0.3% fee
    recipient: deployer.address,
    deadline: deadline,
    amountIn: amountIn,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  }, { gasLimit: 300000 });

  console.log('Transaction hash:', tx.hash);

  // Wait for the transaction to be mined
  await tx.wait();

  console.log('Swap completed!');
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
