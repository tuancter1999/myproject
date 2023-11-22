const ethers = require('ethers');

async function calculatePoolInitCodeHash() {
  // Replace with the actual Uniswap v3 pool contract address
  const poolContractAddress = '0x1321e67C8f10244726e089F33BEA4828eA54eBEb';

  // Replace with your Ethereum provider (e.g., Infura)
  const provider = new ethers.providers.JsonRpcProvider('https://rpc-nebulas-testnet.uniultra.xyz/');

  // Fetch the bytecode of the Uniswap v3 pool contract
  const bytecode = await provider.getCode(poolContractAddress);

  // Calculate the keccak256 hash of the bytecode
  const poolInitCodeHash = ethers.utils.keccak256(bytecode);

  console.log('POOL_INIT_CODE_HASH:', poolInitCodeHash);
}

// Run the function
calculatePoolInitCodeHash();