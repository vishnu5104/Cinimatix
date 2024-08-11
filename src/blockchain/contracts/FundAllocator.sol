// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FundAllocator {
    event Funded(address indexed investor, address indexed creator, uint256 amount);

    function fundCreator(address payable _creator) public payable {
        require(msg.value > 0, "Funding amount must be greater than zero");
        require(_creator != address(0), "Invalid creator address");

        _creator.transfer(msg.value);

        emit Funded(msg.sender, _creator, msg.value);
    }
}
