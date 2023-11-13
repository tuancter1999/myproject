// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/IU2UV3PoolImmutables.sol';
import './pool/IU2UV3PoolState.sol';
import './pool/IU2UV3PoolDerivedState.sol';
import './pool/IU2UV3PoolActions.sol';
import './pool/IU2UV3PoolOwnerActions.sol';
import './pool/IU2UV3PoolEvents.sol';

interface IU2UV3Pool is
    IU2UV3PoolImmutables,
    IU2UV3PoolState,
    IU2UV3PoolDerivedState,
    IU2UV3PoolActions,
    IU2UV3PoolOwnerActions,
    IU2UV3PoolEvents
{

}
