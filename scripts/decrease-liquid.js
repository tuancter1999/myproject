const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  // Replace the following addresses with your specific contract addresses
  const uniswapV3PoolAddress = '0xYourUniswapV3PoolAddress';
  const uniswapV3PositionManagerAddress = '0xYourPositionManagerAddress';

  const positionManager = await ethers.getContractAt('YourPositionManagerContract', uniswapV3PositionManagerAddress);
  const pool = await ethers.getContractAt('YourUniswapV3PoolContract', uniswapV3PoolAddress);

  // Replace these with your specific token IDs and liquidity amount
  const tokenId = 123; // Replace with your actual token ID
  const liquidityAmount = ethers.utils.parseUnits('10', '18'); // Replace with your actual amount

  // Approve the PositionManager contract to spend your tokens
  const approvalTx = await pool.approveTokenIfNeeded(tokenId, uniswapV3PositionManagerAddress, liquidityAmount);
  await approvalTx.wait();

  // Remove liquidity
  const removeLiquidityTx = await positionManager.decreaseLiquidity({
    tokenId,
    liquidity: liquidityAmount,
    amount0Min: 0,
    amount1Min: 0,
    deadline: Math.floor(Date.now() / 1000) + 300, // 5 minutes from now
  });

  await removeLiquidityTx.wait();

  console.log('Liquidity successfully removed!');
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
