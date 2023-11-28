const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // Replace with the addresses of the Uniswap v3 contracts and tokens you are working with
  const routerAddress = "0x51a6A6D3F696F0650E4c683d0B2d459ae96f02A4";
  // const tokenIn = "0xYourTokenInAddress";
  // const tokenOut = "0xYourTokenOutAddress";
  const amountIn = ethers.utils.parseUnits("0.01", "18"); // Replace with the amount you want to swap

  const router = await ethers.getContractAt("ISwapRouter", routerAddress);

  // Multihop swap example with two hops
  // const path = [
  //   tokenIn,
  //   // Add additional intermediary tokens or liquidity pool addresses as needed
  //   "0xIntermediateTokenAddress",
  //   tokenOut,
  // ];
  const objectType = 'tuple(address token1, uint256 fee, address token2)';

  // Create an array of objects
  // const path = [
  //   { tokenIn: '0x22BB25D5Cc6BA10642C9afA3EEb5e4bC6052C757', fee: 3000 , tokenOut: '0xB2606029DE4AD7b30c615712726477ED466002d2'},
  //   { tokenIn: '0xB2606029DE4AD7b30c615712726477ED466002d2', fee: 3000 , tokenOut: '0x766311486a55509b49F01E67D1Ac96b349DEcaAe'},
  // ];
  const path = [
    '0x22BB25D5Cc6BA10642C9afA3EEb5e4bC6052C757', '0xB2606029DE4AD7b30c615712726477ED466002d2', '0x766311486a55509b49F01E67D1Ac96b349DEcaAe'
  ]
  const fee = [ 3000, 3000]


// Encode the array of objects to bytes
// const encodedBytes = ethers.utils.defaultAbiCoder.encode(['tuple(address token1, address token2, uint256 fee)[]'], [inputArray]);
// const encodedPath = path.map(route => ethers.utils.defaultAbiCoder.encode(
//   ['address', 'address', 'uint24'],
//   [route.tokenIn, route.tokenOut, route.fee]
// ));
  const encodePath = encodePathF(path, fee)

  const deadline = Math.floor(Date.now() / 1000) + 60; // Set a deadline (e.g., 1 minute from now)
  // Perform the multihop swap
  const tx = await router.exactInput({
    amountOutMinimum: 0,
    amountIn: amountIn,
    path: encodePath,
    recipient: deployer.address,
    deadline: deadline,
  });

  console.log("Multihop swap transaction hash:", tx.hash);
}



async function encodePathF(path, fees) {
  const FEE_SIZE = 6
  if (path.length !== fees.length + 1) {
      throw new Error('path/fee lengths do not match')
  }

  let encoded = '0x'
  for (let i = 0; i < fees.length; i++) {
      encoded += path[i].slice(2)
      let fee = ethers.utils.hexlify(parseFloat(fees[i])).slice(2).toString();
      encoded += fee.padStart(FEE_SIZE, '0');
  }
  encoded += path[path.length - 1].slice(2)
  return encoded    
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
