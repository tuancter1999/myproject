const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  // Replace the following addresses with your specific contract addresses
  const uniswapV3PoolAddress = '0x287E2C35947EAf0B3d7538a6dBfa26b37ABC5b62';
  const uniswapV3PositionManagerAddress = '0xBB47156e2A1fAFf33d2F1cb53900e07cEc5F59a9';

  const positionManager = await ethers.getContractAt('NonfungiblePositionManager', uniswapV3PositionManagerAddress);
  const pool = await ethers.getContractAt('U2UV3Pool', uniswapV3PoolAddress);

  // Replace these with your specific token IDs and liquidity amount
  const tokenId = 1; // Replace with your actual token ID
  const liquidityAmount = ethers.utils.parseUnits('5', '18'); // Replace with your actual amount

  // Approve the PositionManager contract to spend your tokens
  // const approvalTx = await pool.approveTokenIfNeeded(tokenId, uniswapV3PositionManagerAddress, liquidityAmount);
  // await approvalTx.wait();`
  // Remove liquidity
  const removeLiquidityTx = await positionManager.decreaseLiquidity({
    tokenId,
    liquidity: '105707991999999999999999999',
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
