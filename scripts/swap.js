const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying from address:', deployer.address);

  // Replace these values with your own
  const tokenInAddress = '0x99969825C9c18BA93C9998F95c4bB7F6EB5E2c39'; // Address of the token you want to swap
  const tokenOutAddress = '0xF2F00ED60982365877989BC53D123B027388E81e'; // Address of the token you want to receive
  const amountIn = ethers.utils.parseUnits('1', 18); // Amount in Wei (1 ETH in Wei, for example)
  const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // Deadline 10 minutes from now

  // Replace with the actual Uniswap router address
  const uniswapRouterAddress = '0x8748AC693A143E60Cf7f51b122fECCCD281ed1c6';

  // Load the Uniswap Router contract
  const uniswapRouter = await ethers.getContractAt('ISwapRouter', uniswapRouterAddress);

  // Swap tokens using exactInputSingle
  const tx = await uniswapRouter.exactInputSingle({
    tokenIn: tokenOutAddress,
    tokenOut: tokenInAddress,
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
