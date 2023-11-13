import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import 'hardhat-typechain'
import 'hardhat-watcher'

const LOW_OPTIMIZER_COMPILER_SETTINGS = {
  version: '0.7.6',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
}

const LOWEST_OPTIMIZER_COMPILER_SETTINGS = {
  version: '0.7.6',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
}

const DEFAULT_COMPILER_SETTINGS = {
  version: '0.7.6',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
}

export default {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    nebula: {
      url: "https://rpc-nebulas-testnet.uniultra.xyz/",
      chainId: 2484,
      gasPrice: 10000000000,
      accounts: [`0x85fc659e3f7232c6310b34d99955e836dc11935df3a00951ccba66814133bb0e`],
    },
    tbc: {
      url: "https://rpc-testnet.tbcscan.com/",
      chainId: 1337,
      accounts: [`0x85fc659e3f7232c6310b34d99955e836dc11935df3a00951ccba66814133bb0e`],
      gasPrice: 8000000000

    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
    overrides: {
      'contracts/NonfungiblePositionManager.sol': LOW_OPTIMIZER_COMPILER_SETTINGS,
      'contracts/test/MockTimeNonfungiblePositionManager.sol': LOW_OPTIMIZER_COMPILER_SETTINGS,
      'contracts/test/NFTDescriptorTest.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
      'contracts/NonfungibleTokenPositionDescriptor.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
      'contracts/libraries/NFTDescriptor.sol': LOWEST_OPTIMIZER_COMPILER_SETTINGS,
    },
  },
  watcher: {
    test: {
      tasks: [{ command: 'test', params: { testFiles: ['{path}'] } }],
      files: ['./test/**/*'],
      verbose: true,
    },
  },
}
