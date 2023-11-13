// SPDX-License-Identifier: UNLICENSED
pragma solidity =0.7.6;

import '../interfaces/IU2UV3PoolDeployer.sol';

import './MockTimeU2UV3Pool.sol';

contract MockTimeU2UV3PoolDeployer is IU2UV3PoolDeployer {
    struct Parameters {
        address factory;
        address token0;
        address token1;
        uint24 fee;
        int24 tickSpacing;
    }

    Parameters public override parameters;

    event PoolDeployed(address pool);

    function deploy(
        address factory,
        address token0,
        address token1,
        uint24 fee,
        int24 tickSpacing
    ) external returns (address pool) {
        parameters = Parameters({factory: factory, token0: token0, token1: token1, fee: fee, tickSpacing: tickSpacing});
        pool = address(
            new MockTimeU2UV3Pool{salt: keccak256(abi.encodePacked(token0, token1, fee, tickSpacing))}()
        );
        emit PoolDeployed(pool);
        delete parameters;
    }
}
