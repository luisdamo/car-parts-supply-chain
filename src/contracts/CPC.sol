// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @author Jose Luis Dapena Montes (jdapena001@ikasle.ehu.eus)
/// @title Carpartcoin
/**
 * @notice Contract created for the Ethereum programming course
 * of the Blockchain Technology and Cryptocurrencies master's degree
 * at the University of the Basque Country.
 */
contract CPC is ERC20 {
    constructor() ERC20("Car parts coin token", "CPC") {
        _mint(msg.sender, 21000000 * 10**uint(decimals()));
    }
}
