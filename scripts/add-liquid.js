const { ethers } = require('ethers');
require('dotenv').config();

// Replace these placeholders with your values
const privateKey = process.env.PRIVATE_KEY;
const positionManagerAddress = '0x798b115d5fb4cBbD1708af6A16a77239C1005CAe';
const token1Address = '0xC5f15624b4256C1206e4BB93f2CCc9163A75b703';
const token0Address = '0xdFAe88F8610a038AFcDF47A5BC77C0963C65087c';

// Ethereum provider
const provider = new ethers.providers.JsonRpcProvider('https://rpc-nebulas-testnet.uniultra.xyz/');

// Wallet using your private key
const wallet = new ethers.Wallet(privateKey, provider);

// U2U V3 PositionManager contract ABI (you should use the correct ABI)
const positionManagerABI = require("../artifacts/contracts/v3-periphery/NonfungiblePositionManager.sol/NonfungiblePositionManager.json");

// U2U V3 PositionManager contract instance
const positionManagerContract = new ethers.Contract(positionManagerAddress, positionManagerABI.abi, wallet);

// Example: Create a liquidity position
async function createPosition() {
  const tokenId = await positionManagerContract.mint({
    token0: token0Address,
    token1: token1Address,
    fee: 500, // 0.3% fee
    tickLower: -887220,
    tickUpper: -887200,
    amount0Desired: ethers.utils.parseUnits('10', 18), // Replace with the desired additional amount of token0
    amount1Desired: ethers.utils.parseUnits('0.1', 18), // Replace with the desired amount of token1
    amount0Min: 0,
    amount1Min: 0,
    recipient: wallet.address,
    // deadline: Math.floor(Date.now() / 1000)
    deadline: Math.floor(Date.now() / 1000) + 60 * 10, // Deadline 10 minutes from now
  }, {gasLimit: 2100000});
  await tokenId.wait();
  console.log('Liquidity Position Created - Token ID:', tokenId.toString());
}

// Example: Increase liquidity in an existing position
async function increaseLiquidity(tokenId) {
  await positionManagerContract.increaseLiquidity({
    tokenId,
    amount0Desired: ethers.utils.parseUnits('10', 18), // Replace with the desired additional amount of token0
    amount1Desired: ethers.utils.parseUnits('0.1', 18), // Replace with the desired additional amount of token1
    amount0Min: 0,
    amount1Min: 0,
    deadline: Math.floor(Date.now() / 1000) + 60 * 10, // Deadline 10 minutes from now
  }, {value: ethers.utils.parseUnits('5', 18), gasLimit: 2100000});

  console.log('Increased Liquidity for Token ID:', tokenId.toString());
}

// Example: Collect fees from a position
async function collectFees(tokenId) {
  await positionManagerContract.collect({
    tokenId,
    recipient: wallet.address,
    amount0Max: ethers.constants.MaxUint256,
    amount1Max: ethers.constants.MaxUint256,
  });

  console.log('Collected Fees for Token ID:', tokenId.toString());
}

// Call the example functions
createPosition();
// Assuming you have the tokenId from the createPosition step
// increaseLiquidity('YOUR_TOKEN_ID');
// collectFees('YOUR_TOKEN_ID');