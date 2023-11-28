const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying from address:', deployer.address);

  // Replace these values with your own

  // Replace with the actual Uniswap router address
  const uniswapRouterAddress = '0x8987e0468D03EBE4428883a5608a046e0f206E25';

  // Load the Uniswap Router contract
  const uniswapRouter = await ethers.getContractAt('QuoterV2', uniswapRouterAddress);

  const tokenIn = '0x99969825c9c18ba93c9998f95c4bb7f6eb5e2c39'; // Address of the input token
  const tokenOut = '0xf2f00ed60982365877989bc53d123b027388e81e'; // Address of the output token
  const amountIn = ethers.utils.parseUnits('1', 'ether'); // Input amount in wei

// Call the quoteExactInputSingle function
  const tx = await uniswapRouter.quoteExactInputSingle([tokenIn, tokenOut,amountIn, 3000 , 0]);

  // // Swap tokens using exactInputSingle
  // const tx = await uniswapRouter.exactInputSingle({
  //   tokenIn: tokenInAddress,
  //   tokenOut: tokenOutAddress,
  //   fee: 3000, // 0.3% fee
  //   recipient: deployer.address,
  //   deadline: deadline,
  //   amountIn: amountIn,
  //   amountOutMinimum: 0,
  //   sqrtPriceLimitX96: 0,
  // }, { gasLimit: 300000 });

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
