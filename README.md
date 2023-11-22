
## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`../v3-periphery`
and import bytecode imported from artifacts located at
`../v3-periphery/artifacts/contracts/*/*.json`.
For example:

```typescript
import {
  abi as SWAP_ROUTER_ABI,
  bytecode as SWAP_ROUTER_BYTECODE,
} from '../v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json'

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnet and public testnets, and all U2U code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The U2U v3 periphery interfaces are available for import into solidity smart contracts
via the npm artifact `../v3-periphery`, e.g.:

```solidity
import '../v3-periphery/contracts/interfaces/ISwapRouter.sol';

contract MyContract {
  ISwapRouter router;

  function doSomethingWithSwapRouter() {
    // router.exactInput(...);
  }
}

```
