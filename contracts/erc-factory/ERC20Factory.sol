// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;

import "./ERC20Token.sol";

contract ERC20Factory {
    event ERC20TokenCreated(address tokenAddress);

    function deployNewERC20Token(
        address to,
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) public returns (address) {
        ERC20Token t = new ERC20Token(
            to,
            name,
            symbol,
            initialSupply
        );
        emit ERC20TokenCreated(address(t));

        return address(t);
    }

}
